/**
 * azure-speech.js
 * Pronunciation assessment via the Azure Cognitive Services Speech REST API.
 * Audio is resampled to 16 kHz 16-bit mono PCM WAV before submission.
 */

import { getConfig, trackAzureUsage, getAzureRemainingSeconds } from './config.js';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Assess pronunciation of an audio recording against a reference text.
 *
 * @param {Blob}   audioBlob     - Raw audio captured by MediaRecorder
 * @param {string} referenceText - The phrase the user was meant to say
 * @returns {Promise<PronunciationResult>}
 */
export async function assessPronunciation(audioBlob, referenceText) {
  const { apiKey, region } = getConfig();
  if (!apiKey || !region) {
    throw new Error('Azure Speech API key or region is not configured.');
  }
  if (getAzureRemainingSeconds() <= 0) {
    throw new Error('Monthly Azure Speech quota has been exhausted.');
  }

  const wavBlob = await blobToWav(audioBlob);

  // Base64-encode the Pronunciation Assessment config header
  const assessmentConfig = {
    ReferenceText:   referenceText,
    GradingSystem:   'HundredMark',
    Granularity:     'Phoneme',
    Dimension:       'Comprehensive'
  };
  const assessmentHeader = btoa(JSON.stringify(assessmentConfig));

  const url =
    `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1` +
    `?language=en-US&format=detailed`;

  const startTime = Date.now();
  let response;
  try {
    response = await fetch(url, {
      method:  'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type':              'audio/wav',
        'Pronunciation-Assessment':  assessmentHeader
      },
      body: wavBlob
    });
  } catch (err) {
    throw new Error(`Network error contacting Azure Speech API: ${err.message}`);
  }

  const elapsedSeconds = (Date.now() - startTime) / 1000;
  trackAzureUsage(elapsedSeconds);

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Azure Speech API returned HTTP ${response.status}: ${body || response.statusText}`
    );
  }

  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error('Azure Speech API returned an unparseable response.');
  }

  return parseAssessmentResponse(json);
}

/**
 * Returns true if an API key and region have been saved in config.
 * @returns {boolean}
 */
export function isAzureConfigured() {
  const { apiKey, region } = getConfig();
  return Boolean(apiKey && apiKey.length > 0 && region && region.length > 0);
}

/**
 * Returns true if Azure is configured AND monthly quota remains.
 * @returns {boolean}
 */
export function isAzureAvailable() {
  return isAzureConfigured() && getAzureRemainingSeconds() > 0;
}

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

/**
 * @typedef {{
 *   overallScore:       number,
 *   accuracyScore:      number,
 *   fluencyScore:       number,
 *   completenessScore:  number,
 *   words: Array<{
 *     word:          string,
 *     accuracyScore: number,
 *     errorType:     'None' | 'Omission' | 'Insertion' | 'Mispronunciation',
 *     phonemes: Array<{ phoneme: string, accuracyScore: number }>
 *   }>
 * }} PronunciationResult
 */

/**
 * Extract scores and per-word detail from the Azure REST response body.
 * The Detailed format places pronunciation data inside
 * NBest[0].PronunciationAssessment and NBest[0].Words[].
 *
 * @param {object} json
 * @returns {PronunciationResult}
 */
function parseAssessmentResponse(json) {
  const nBest = json?.NBest?.[0];
  if (!nBest) {
    throw new Error('Unexpected Azure response structure: missing NBest array.');
  }

  const pa = nBest.PronunciationAssessment ?? {};

  const words = (nBest.Words ?? []).map(w => {
    const wpa = w.PronunciationAssessment ?? {};
    const phonemes = (w.Phonemes ?? []).map(ph => ({
      phoneme:       ph.Phoneme ?? '',
      accuracyScore: ph.PronunciationAssessment?.AccuracyScore ?? 0
    }));
    return {
      word:          w.Word ?? '',
      accuracyScore: wpa.AccuracyScore      ?? 0,
      errorType:     wpa.ErrorType          ?? 'None',
      phonemes
    };
  });

  return {
    overallScore:      pa.PronScore          ?? 0,
    accuracyScore:     pa.AccuracyScore      ?? 0,
    fluencyScore:      pa.FluencyScore       ?? 0,
    completenessScore: pa.CompletenessScore  ?? 0,
    words
  };
}

// ---------------------------------------------------------------------------
// Audio conversion: arbitrary Blob → 16 kHz 16-bit mono PCM WAV
// ---------------------------------------------------------------------------

/**
 * Decode and resample an audio Blob, then encode it as a WAV Blob.
 * @param {Blob} blob
 * @returns {Promise<Blob>}
 */
async function blobToWav(blob) {
  const TARGET_SAMPLE_RATE = 16000;

  // Decode with the browser's AudioContext
  const arrayBuffer = await blob.arrayBuffer();

  // OfflineAudioContext is not available in all environments; fall back to
  // AudioContext with sample-rate hint where supported.
  let audioBuffer;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: TARGET_SAMPLE_RATE
    });
    audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
    await ctx.close();
  } catch {
    // If the hint was ignored and decoding failed, retry without the hint
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
    await ctx.close();
  }

  // Mix down to mono by averaging all channels
  const numChannels = audioBuffer.numberOfChannels;
  const inputLength = audioBuffer.length;
  const mono = new Float32Array(inputLength);
  for (let ch = 0; ch < numChannels; ch++) {
    const channelData = audioBuffer.getChannelData(ch);
    for (let i = 0; i < inputLength; i++) {
      mono[i] += channelData[i] / numChannels;
    }
  }

  // Resample to 16 kHz using OfflineAudioContext
  const sourceSampleRate = audioBuffer.sampleRate;
  let samples;
  if (sourceSampleRate === TARGET_SAMPLE_RATE) {
    samples = mono;
  } else {
    const outputLength = Math.ceil(inputLength * TARGET_SAMPLE_RATE / sourceSampleRate);
    const offline = new OfflineAudioContext(1, outputLength, TARGET_SAMPLE_RATE);

    // Create a mono AudioBuffer at the source rate and schedule it
    const monoBuffer = offline.createBuffer(1, inputLength, sourceSampleRate);
    monoBuffer.copyToChannel(mono, 0);

    const source = offline.createBufferSource();
    source.buffer = monoBuffer;
    source.connect(offline.destination);
    source.start(0);

    const rendered = await offline.startRendering();
    samples = rendered.getChannelData(0);
  }

  return new Blob([createWavFile(samples, TARGET_SAMPLE_RATE)], { type: 'audio/wav' });
}

/**
 * Pack Float32 PCM samples into a 16-bit mono WAV ArrayBuffer.
 * @param {Float32Array} samples  - Float PCM in [-1, 1]
 * @param {number}       sampleRate
 * @returns {ArrayBuffer}
 */
function createWavFile(samples, sampleRate) {
  const NUM_CHANNELS  = 1;
  const BITS_PER_SAMPLE = 16;
  const BYTE_RATE     = sampleRate * NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
  const BLOCK_ALIGN   = NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
  const DATA_SIZE     = samples.length * (BITS_PER_SAMPLE / 8);
  const HEADER_SIZE   = 44;

  const buffer = new ArrayBuffer(HEADER_SIZE + DATA_SIZE);
  const view   = new DataView(buffer);

  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  // RIFF chunk descriptor
  writeStr(0,  'RIFF');
  view.setUint32(4,  36 + DATA_SIZE, true);  // ChunkSize
  writeStr(8,  'WAVE');

  // fmt sub-chunk
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);               // Subchunk1Size (PCM)
  view.setUint16(20, 1,  true);               // AudioFormat   (PCM = 1)
  view.setUint16(22, NUM_CHANNELS,    true);
  view.setUint32(24, sampleRate,      true);
  view.setUint32(28, BYTE_RATE,       true);
  view.setUint16(32, BLOCK_ALIGN,     true);
  view.setUint16(34, BITS_PER_SAMPLE, true);

  // data sub-chunk
  writeStr(36, 'data');
  view.setUint32(40, DATA_SIZE, true);

  // Convert Float32 [-1, 1] → Int16
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF, true);
  }

  return buffer;
}

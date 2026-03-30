/**
 * speech.js
 * TTS and audio recording wrapper using Web Speech API and MediaRecorder.
 */

/**
 * Speak text aloud using the Web Speech API.
 * Prefers "Google US English" or any en-US voice.
 * @param {string} text
 * @param {number} rate - Speech rate multiplier (default 1.0)
 * @returns {Promise<void>} Resolves when speech ends, rejects on error.
 */
export function speak(text, rate = 1.0) {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('SpeechSynthesis is not supported in this browser.'));
      return;
    }

    // Cancel any in-progress speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = 'en-US';

    const assignVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return false;

      const preferred = voices.find(v => v.name === 'Google US English');
      const enUS = preferred || voices.find(v => v.lang === 'en-US');
      const enFallback = !enUS && voices.find(v => v.lang.startsWith('en'));

      utterance.voice = preferred || enUS || enFallback || null;
      return true;
    };

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      // 'interrupted' fires when cancel() is called intentionally; treat as non-fatal
      if (e.error === 'interrupted') {
        resolve();
      } else {
        reject(new Error(`SpeechSynthesis error: ${e.error}`));
      }
    };

    if (assignVoice()) {
      window.speechSynthesis.speak(utterance);
    } else {
      // Voices may not be loaded yet — wait for the event
      const onVoicesChanged = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        assignVoice();
        window.speechSynthesis.speak(utterance);
      };
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    }
  });
}

/**
 * Start recording audio from the microphone.
 * @returns {Promise<{ stop(): Promise<Blob> }>}
 *   Resolves with a recorder handle. Call stop() to end recording and receive the audio Blob.
 */
export async function startRecording() {
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch (err) {
    const message = err.name === 'NotAllowedError'
      ? 'Microphone access was denied. Please allow microphone access and try again.'
      : `Could not access microphone: ${err.message}`;
    throw new Error(message);
  }

  // Prefer webm/opus for broad support; fall back to whatever is available
  const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg', '']
    .find(t => t === '' || MediaRecorder.isTypeSupported(t));

  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const chunks = [];

  recorder.addEventListener('dataavailable', (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  });

  recorder.start();

  return {
    /**
     * Stop recording and return the collected audio as a Blob.
     * Also stops all microphone tracks to release the hardware.
     * @returns {Promise<Blob>}
     */
    stop() {
      return new Promise((resolve, reject) => {
        recorder.addEventListener('stop', () => {
          stream.getTracks().forEach(t => t.stop());
          const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
          resolve(blob);
        }, { once: true });

        recorder.addEventListener('error', (e) => {
          stream.getTracks().forEach(t => t.stop());
          reject(new Error(`MediaRecorder error: ${e.error?.message ?? 'unknown'}`));
        }, { once: true });

        recorder.stop();
      });
    }
  };
}

/**
 * Listen for a single speech utterance using the Web Speech API (STT).
 * Intended as a fallback when Azure is unavailable.
 * @returns {Promise<{ transcript: string, confidence: number }>}
 */
export async function listenForSpeech() {
  // Request microphone permission first (required for PWA on Android)
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Release immediately — SpeechRecognition will open its own stream
    stream.getTracks().forEach(t => t.stop());
  } catch (err) {
    if (err.name === 'NotAllowedError') {
      throw new Error('マイクの使用が許可されていません。ブラウザの設定でマイクを許可してください。');
    }
    throw new Error(`マイクにアクセスできません: ${err.message}`);
  }

  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(new Error('このブラウザは音声認識に対応していません。Chrome または Edge をお使いください。'));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    let settled = false;

    recognition.onresult = (e) => {
      if (settled) return;
      settled = true;
      const result = e.results[0]?.[0];
      if (result) {
        resolve({
          transcript: result.transcript,
          confidence: result.confidence ?? 0.8
        });
      } else {
        reject(new Error('音声を認識できませんでした。'));
      }
    };

    recognition.onerror = (e) => {
      if (settled) return;
      settled = true;
      const messages = {
        'no-speech': '音声が検出されませんでした。もう一度お試しください。',
        'audio-capture': 'マイクが見つかりません。マイクを接続してください。',
        'not-allowed': 'マイクの使用が許可されていません。',
        'network': 'ネットワークエラーです。インターネット接続を確認してください。',
        'aborted': '音声認識が中断されました。',
        'service-not-available': '音声認識サービスが利用できません。'
      };
      reject(new Error(messages[e.error] || `音声認識エラー: ${e.error}`));
    };

    recognition.onend = () => {
      if (!settled) {
        settled = true;
        reject(new Error('音声が検出されませんでした。もう一度お試しください。'));
      }
    };

    try {
      recognition.start();
    } catch (err) {
      if (!settled) {
        settled = true;
        reject(new Error(`音声認識を開始できません: ${err.message}`));
      }
    }
  });
}

/**
 * Detect which speech-related browser APIs are available.
 * @returns {{ tts: boolean, stt: boolean, mediaRecorder: boolean }}
 */
export function checkSpeechSupport() {
  return {
    tts: typeof window !== 'undefined' && 'speechSynthesis' in window,
    stt: typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),
    mediaRecorder: typeof window !== 'undefined' && 'MediaRecorder' in window
  };
}

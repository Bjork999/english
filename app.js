/**
 * app.js
 * Main controller for the English Pronunciation Training App.
 * Ties together all modules: phrases, speech, azure-speech, scoring, config, progress.
 */

import { PHRASES } from './phrases.js';
import { speak, startRecording, listenForSpeech, checkSpeechSupport } from './speech.js';
import { assessPronunciation, isAzureAvailable, isAzureConfigured } from './azure-speech.js';
import { fallbackAssess, getScoreLevel, generateDiff, tokenize } from './scoring.js';
import {
  getConfig, saveConfig, formatRemainingTime, formatTotalTime, getAzureRemainingSeconds
} from './config.js';
import { updateProgress, sortByPriority, getStats } from './progress.js';

// ---------------------------------------------------------------------------
// Application State
// ---------------------------------------------------------------------------

const state = {
  currentCategory: 'tech',
  currentSubcategory: null,
  currentPhraseIndex: 0,
  currentMode: 'simple',   // 'simple' | 'azure'
  currentSpeed: 1.0,       // 0.75 | 1.0
  sortedPhrases: [],        // sorted phrase list for current subcategory
  recorder: null,           // active recorder handle from startRecording()
  isRecording: false
};

// ---------------------------------------------------------------------------
// DOM References (cached on init)
// ---------------------------------------------------------------------------

const el = {};

function cacheElements() {
  // Header
  el.modeToggle         = document.getElementById('modeToggle');
  el.modeLabelSimple    = document.getElementById('modeLabelSimple');
  el.modeLabelAzure     = document.getElementById('modeLabelAzure');
  el.azureTimeDisplay   = document.getElementById('azureTimeDisplay');
  el.azureTimeText      = document.getElementById('azureTimeText');
  el.settingsBtn        = document.getElementById('settingsBtn');

  // Category tabs
  el.tabTech            = document.getElementById('tabTech');
  el.tabTourism         = document.getElementById('tabTourism');

  // Subcategory chips container
  el.subcategoryChips   = document.getElementById('subcategoryChips');

  // Phrase card
  el.phraseBadge        = document.getElementById('phraseBadge');
  el.phraseDifficulty   = document.getElementById('phraseDifficulty');
  el.phraseEnglish      = document.getElementById('phraseEnglish');
  el.phraseJapanese     = document.getElementById('phraseJapanese');
  el.wordBreakdownBody  = document.getElementById('wordBreakdownBody');
  el.phraseContextText  = document.getElementById('phraseContextText');

  // Action buttons
  el.playBtn            = document.getElementById('playBtn');
  el.recordBtn          = document.getElementById('recordBtn');
  el.recordLabel        = document.getElementById('recordLabel');
  el.speedBtn           = document.getElementById('speedBtn');
  el.speedValue         = document.getElementById('speedValue');
  el.recordingIndicator = document.getElementById('recordingIndicator');

  // Result area
  el.resultArea         = document.getElementById('resultArea');
  el.recognizedText     = document.getElementById('recognizedText');
  el.scoreCircle        = document.getElementById('scoreCircle');
  el.scoreNumber        = document.getElementById('scoreNumber');
  el.scoreLabelText     = document.getElementById('scoreLabelText');
  el.diffWords          = document.getElementById('diffWords');

  // Azure feedback
  el.azureFeedback      = document.getElementById('azureFeedback');
  el.phonemeTags        = document.getElementById('phonemeTags');
  el.fluencyBar         = document.getElementById('fluencyBar');
  el.fluencyValue       = document.getElementById('fluencyValue');
  el.completenessBar    = document.getElementById('completenessBar');
  el.completenessValue  = document.getElementById('completenessValue');
  el.accuracyBar        = document.getElementById('accuracyBar');
  el.accuracyValue      = document.getElementById('accuracyValue');

  // Result actions
  el.tryAgainBtn        = document.getElementById('tryAgainBtn');
  el.nextPhraseBtn      = document.getElementById('nextPhraseBtn');

  // Progress section
  el.progressText       = document.getElementById('progressText');
  el.progressPct        = document.getElementById('progressPct');
  el.progressFill       = document.getElementById('progressFill');
  el.progressStreak     = document.getElementById('progressStreak');

  // Settings modal
  el.settingsModal      = document.getElementById('settingsModal');
  el.settingsCloseBtn   = document.getElementById('settingsCloseBtn');
  el.azureStatus        = document.getElementById('azureStatus');
  el.azureStatusDot     = document.getElementById('azureStatusDot');
  el.azureStatusText    = document.getElementById('azureStatusText');
  el.azureKeyInput      = document.getElementById('azureKeyInput');
  el.toggleKeyVisibility = document.getElementById('toggleKeyVisibility');
  el.azureRegionInput   = document.getElementById('azureRegionInput');
  el.timeBudgetInput    = document.getElementById('timeBudgetInput');
  el.saveSettingsBtn    = document.getElementById('saveSettingsBtn');
  el.saveConfirm        = document.getElementById('saveConfirm');
  el.resetProgressBtn   = document.getElementById('resetProgressBtn');

  // Toast
  el.toast              = document.getElementById('toast');
}

// ---------------------------------------------------------------------------
// Toast Notification
// ---------------------------------------------------------------------------

let toastTimer = null;

function showToast(message) {
  if (!el.toast) return;
  el.toast.textContent = message;
  el.toast.setAttribute('aria-hidden', 'false');
  el.toast.classList.add('toast--visible');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.toast.classList.remove('toast--visible');
    el.toast.setAttribute('aria-hidden', 'true');
  }, 3000);
}

// ---------------------------------------------------------------------------
// Category & Subcategory Population
// ---------------------------------------------------------------------------

function populateCategoryTabs() {
  // The HTML already has the two tabs; we just wire up their data-category values.
  // If PHRASES has additional categories in the future, they would be created here.
  // For now sync the active state with current category.
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const cat = btn.dataset.category;
    btn.classList.toggle('tab-btn--active', cat === state.currentCategory);
    btn.setAttribute('aria-selected', cat === state.currentCategory ? 'true' : 'false');
  });
}

function populateSubcategoryChips() {
  const categoryData = PHRASES[state.currentCategory];
  if (!categoryData) return;

  const subcats = Object.keys(categoryData.subcategories);
  if (!state.currentSubcategory || !subcats.includes(state.currentSubcategory)) {
    state.currentSubcategory = subcats[0] ?? null;
  }

  el.subcategoryChips.innerHTML = '';
  subcats.forEach(key => {
    const sub = categoryData.subcategories[key];
    const btn = document.createElement('button');
    btn.className = 'chip' + (key === state.currentSubcategory ? ' chip--active' : '');
    btn.dataset.sub = key;
    btn.textContent = sub.label || key;
    btn.addEventListener('click', () => {
      if (state.currentSubcategory === key) return;
      state.currentSubcategory = key;
      state.currentPhraseIndex = 0;
      updateSubcategoryChipsUI();
      loadCurrentPhrase();
    });
    el.subcategoryChips.appendChild(btn);
  });
}

function updateSubcategoryChipsUI() {
  el.subcategoryChips.querySelectorAll('.chip').forEach(chip => {
    const active = chip.dataset.sub === state.currentSubcategory;
    chip.classList.toggle('chip--active', active);
  });
}

// ---------------------------------------------------------------------------
// Phrase Loading & Display
// ---------------------------------------------------------------------------

function buildSortedPhrases() {
  const categoryData = PHRASES[state.currentCategory];
  if (!categoryData || !state.currentSubcategory) {
    state.sortedPhrases = [];
    return;
  }
  const subcatData = categoryData.subcategories[state.currentSubcategory];
  if (!subcatData) {
    state.sortedPhrases = [];
    return;
  }
  state.sortedPhrases = sortByPriority(subcatData.phrases);
}

function loadCurrentPhrase() {
  buildSortedPhrases();
  if (state.sortedPhrases.length === 0) return;

  // Clamp index
  if (state.currentPhraseIndex >= state.sortedPhrases.length) {
    state.currentPhraseIndex = 0;
  }

  const phrase = state.sortedPhrases[state.currentPhraseIndex];
  displayPhrase(phrase);
}

function displayPhrase(phrase) {
  if (!phrase) return;

  // Badge: "Tech > GitHub"
  const categoryData = PHRASES[state.currentCategory];
  const subcatData = categoryData?.subcategories[state.currentSubcategory];
  const catLabel = categoryData?.label || state.currentCategory;
  const subcatLabel = subcatData?.label || state.currentSubcategory;
  el.phraseBadge.textContent = `${catLabel} > ${subcatLabel}`;

  // Difficulty stars (1-3)
  const diff = phrase.difficulty ?? 1;
  el.phraseDifficulty.textContent = '★'.repeat(diff) + '☆'.repeat(Math.max(0, 3 - diff));
  el.phraseDifficulty.setAttribute('aria-label', `難易度${diff}`);

  // English text
  el.phraseEnglish.textContent = phrase.en;

  // Japanese translation
  el.phraseJapanese.textContent = phrase.ja;

  // Word breakdown
  el.wordBreakdownBody.innerHTML = '';
  if (Array.isArray(phrase.words)) {
    phrase.words.forEach(w => {
      const row = document.createElement('div');
      row.className = 'word-row';

      const term = document.createElement('span');
      term.className = 'word-term';
      term.textContent = w.word;

      const meaning = document.createElement('span');
      meaning.className = 'word-meaning';
      meaning.textContent = w.meaning || '';

      row.appendChild(term);
      row.appendChild(meaning);

      if (w.note) {
        const note = document.createElement('span');
        note.className = 'word-note';
        note.textContent = w.note;
        row.appendChild(note);
      }

      el.wordBreakdownBody.appendChild(row);
    });
  }

  // Context
  el.phraseContextText.textContent = phrase.context || '';

  // Hide result area
  el.resultArea.hidden = true;

  // Update progress indicator
  updateProgressIndicator();
}

// ---------------------------------------------------------------------------
// Progress Bar Display
// ---------------------------------------------------------------------------

function updateProgressIndicator() {
  const categoryData = PHRASES[state.currentCategory];
  if (!categoryData) return;

  // Collect all phrases in the current category for stats
  const allPhrasesInCategory = Object.values(categoryData.subcategories)
    .flatMap(s => s.phrases);

  const stats = getStats(allPhrasesInCategory);
  const completed = stats.mastered + stats.learning;
  const total = stats.total;
  const pct = total > 0 ? Math.round((stats.mastered / total) * 100) : 0;

  el.progressText.textContent = `${stats.mastered} / ${total} フレーズ完了`;
  el.progressPct.textContent = `${pct}%`;
  el.progressFill.style.width = `${pct}%`;

  const track = el.progressFill.closest('[role="progressbar"]');
  if (track) track.setAttribute('aria-valuenow', pct);

  // Subcategory counter shown in phrase area
  const subTotal = state.sortedPhrases.length;
  const subIndex = state.currentPhraseIndex + 1;
  if (el.phraseBadge) {
    // We keep the badge for cat/subcat label; add a small indicator separately
    // (the spec says "3/15 in this category" — we surface it via progressText)
    el.progressText.textContent =
      `${subIndex}/${subTotal} (${state.currentSubcategory}) ・ ${stats.mastered}/${total} 完了`;
  }

  // Streak
  const streakDays = getStreakDays();
  if (streakDays > 0) {
    el.progressStreak.textContent = `🔥 ${streakDays}日連続練習中！`;
    el.progressStreak.hidden = false;
  } else {
    el.progressStreak.hidden = true;
  }
}

function getStreakDays() {
  // Simple streak: count consecutive days with any attempts
  try {
    const stored = localStorage.getItem('english-trainer-progress');
    if (!stored) return 0;
    const progress = JSON.parse(stored);
    const lastAttempts = Object.values(progress)
      .map(p => p.lastAttempt)
      .filter(Boolean)
      .map(d => new Date(d).toDateString());

    const uniqueDays = [...new Set(lastAttempts)];
    if (uniqueDays.length === 0) return 0;

    // Sort descending
    const today = new Date().toDateString();
    const sorted = uniqueDays
      .map(d => new Date(d))
      .sort((a, b) => b - a);

    // Check if today or yesterday is the most recent
    const mostRecent = sorted[0];
    const diffFromToday = (new Date(today) - mostRecent) / (1000 * 60 * 60 * 24);
    if (diffFromToday > 1) return 0;

    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff = (sorted[i - 1] - sorted[i]) / (1000 * 60 * 60 * 24);
      if (Math.round(diff) === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  } catch {
    return 0;
  }
}

// ---------------------------------------------------------------------------
// Azure Time Display
// ---------------------------------------------------------------------------

function updateAzureTimeDisplay() {
  const remaining = getAzureRemainingSeconds();
  const remainingText = formatRemainingTime();
  const totalText = formatTotalTime();

  el.azureTimeText.textContent = `${remainingText} / ${totalText}`;

  // Color code
  el.azureTimeDisplay.classList.remove(
    'azure-time--green', 'azure-time--yellow', 'azure-time--red'
  );
  if (remaining > 3600) {
    el.azureTimeDisplay.classList.add('azure-time--green');
  } else if (remaining > 900) {
    el.azureTimeDisplay.classList.add('azure-time--yellow');
  } else {
    el.azureTimeDisplay.classList.add('azure-time--red');
  }
}

// ---------------------------------------------------------------------------
// Mode Toggle
// ---------------------------------------------------------------------------

function applyModeUI() {
  const isAzure = state.currentMode === 'azure';
  el.modeToggle.checked = isAzure;
  el.modeToggle.setAttribute('aria-checked', isAzure ? 'true' : 'false');
  el.modeLabelSimple.classList.toggle('mode-label--active', !isAzure);
  el.modeLabelAzure.classList.toggle('mode-label--active', isAzure);
}

function switchMode(newMode) {
  state.currentMode = newMode;
  localStorage.setItem('english-trainer-mode', newMode);
  applyModeUI();
}

// ---------------------------------------------------------------------------
// Speed Toggle
// ---------------------------------------------------------------------------

function applySpeedUI() {
  const is075 = state.currentSpeed === 0.75;
  el.speedValue.textContent = is075 ? '0.75x' : '1x';
  el.speedBtn.setAttribute('aria-pressed', is075 ? 'true' : 'false');
}

// ---------------------------------------------------------------------------
// Recording State
// ---------------------------------------------------------------------------

function setRecordingState(recording) {
  state.isRecording = recording;
  el.recordBtn.classList.toggle('recording', recording);
  el.recordingIndicator.hidden = !recording;
  el.recordingIndicator.setAttribute('aria-hidden', recording ? 'false' : 'true');
  el.recordLabel.textContent = recording ? '停止' : '録音';
  el.recordBtn.setAttribute('aria-label', recording ? '録音停止' : '録音開始');
}

// ---------------------------------------------------------------------------
// Recording Flow
// ---------------------------------------------------------------------------

async function handleRecord() {
  if (state.isRecording) {
    // Stop recording (Azure mode)
    await stopAzureRecording();
    return;
  }

  const phrase = state.sortedPhrases[state.currentPhraseIndex];
  if (!phrase) return;

  if (state.currentMode === 'simple') {
    await handleSimpleRecord(phrase);
  } else {
    await handleAzureRecord(phrase);
  }
}

async function handleSimpleRecord(phrase) {
  setRecordingState(true);
  try {
    const { transcript, confidence } = await listenForSpeech();
    setRecordingState(false);

    const result = fallbackAssess(phrase.en, transcript, confidence);
    displayResults(result, transcript);
  } catch (err) {
    setRecordingState(false);
    showToast(`エラー: ${err.message}`);
  }
}

async function handleAzureRecord(phrase) {
  if (!isAzureAvailable()) {
    showToast('Azure未設定または残量不足です。簡易モードに切り替えます。');
    switchMode('simple');
    await handleSimpleRecord(phrase);
    return;
  }

  try {
    state.recorder = await startRecording();
    setRecordingState(true);
  } catch (err) {
    setRecordingState(false);
    showToast(`マイクエラー: ${err.message}`);
  }
}

async function stopAzureRecording() {
  if (!state.recorder) {
    setRecordingState(false);
    return;
  }

  const phrase = state.sortedPhrases[state.currentPhraseIndex];
  setRecordingState(false);

  // Show loading state
  el.recordBtn.disabled = true;
  el.playBtn.disabled = true;

  try {
    const audioBlob = await state.recorder.stop();
    state.recorder = null;

    const result = await assessPronunciation(audioBlob, phrase.en);
    updateAzureTimeDisplay();
    displayResults(result, null);
  } catch (err) {
    showToast(`Azure評価エラー: ${err.message}`);
  } finally {
    el.recordBtn.disabled = false;
    el.playBtn.disabled = false;
  }
}

// ---------------------------------------------------------------------------
// Display Results
// ---------------------------------------------------------------------------

function displayResults(result, transcript) {
  // Recognized text
  if (transcript !== null && transcript !== undefined) {
    // Simple mode: use transcript directly
    el.recognizedText.textContent = transcript;
  } else {
    // Azure mode: reconstruct from word results
    el.recognizedText.textContent = result.words
      .filter(w => w.errorType !== 'Omission')
      .map(w => w.word)
      .join(' ');
  }

  // Score
  const score = result.overallScore;
  const { label, color } = getScoreLevel(score);
  el.scoreNumber.textContent = score;
  el.scoreLabelText.textContent = label;
  el.scoreCircle.style.setProperty('--score-color', color);
  el.scoreCircle.style.borderColor = color;
  el.scoreNumber.style.color = color;

  // Diff display
  if (result.isFallback || transcript !== null) {
    // Simple mode: use word-level diff from result.words
    renderSimpleDiff(result.words);
  } else {
    // Azure mode: color each word by accuracyScore
    renderAzureDiff(result.words);
  }

  // Azure-specific feedback
  if (!result.isFallback && transcript === null) {
    renderAzureFeedback(result);
  } else {
    el.azureFeedback.hidden = true;
  }

  // Update progress
  const phrase = state.sortedPhrases[state.currentPhraseIndex];
  if (phrase) {
    updateProgress(phrase.id, score);
    updateProgressIndicator();
  }

  // Show result area
  el.resultArea.hidden = false;
  el.resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderSimpleDiff(words) {
  el.diffWords.innerHTML = '';

  // Row 1: Target phrase (show matched words green, omitted words red)
  const targetRow = document.createElement('div');
  targetRow.className = 'diff-row';
  const targetLabel = document.createElement('span');
  targetLabel.className = 'diff-label';
  targetLabel.textContent = 'Target: ';
  targetRow.appendChild(targetLabel);

  words.filter(w => w.errorType !== 'Insertion').forEach(w => {
    const span = document.createElement('span');
    span.className = 'diff-word';
    span.textContent = w.word;
    span.classList.add(w.errorType === 'None' ? 'diff-word--match' : 'diff-word--miss');
    targetRow.appendChild(span);
  });
  el.diffWords.appendChild(targetRow);

  // Row 2: User speech (show matched words green, extra words orange)
  const userRow = document.createElement('div');
  userRow.className = 'diff-row';
  const userLabel = document.createElement('span');
  userLabel.className = 'diff-label';
  userLabel.textContent = 'You:      ';
  userRow.appendChild(userLabel);

  words.filter(w => w.errorType !== 'Omission').forEach(w => {
    const span = document.createElement('span');
    span.className = 'diff-word';
    span.textContent = w.word;
    span.classList.add(w.errorType === 'None' ? 'diff-word--match' : 'diff-word--extra');
    userRow.appendChild(span);
  });
  el.diffWords.appendChild(userRow);
}

function renderAzureDiff(words) {
  el.diffWords.innerHTML = '';
  words.forEach(w => {
    const span = document.createElement('span');
    span.className = 'diff-word';
    span.textContent = w.word;

    if (w.errorType === 'Omission') {
      span.classList.add('diff-word--miss');
    } else if (w.accuracyScore >= 80) {
      span.classList.add('diff-word--match');
    } else if (w.accuracyScore >= 50) {
      span.classList.add('diff-word--warn');
    } else {
      span.classList.add('diff-word--miss');
    }

    el.diffWords.appendChild(span);
  });
}

function renderAzureFeedback(result) {
  el.azureFeedback.hidden = false;

  // Phoneme tags
  el.phonemeTags.innerHTML = '';
  result.words.forEach(w => {
    if (!Array.isArray(w.phonemes) || w.phonemes.length === 0) return;
    w.phonemes.forEach(ph => {
      const tag = document.createElement('span');
      tag.className = 'phoneme-tag';
      tag.textContent = ph.phoneme;

      if (ph.accuracyScore >= 80) {
        tag.classList.add('phoneme-tag--good');
      } else if (ph.accuracyScore >= 50) {
        tag.classList.add('phoneme-tag--warn');
      } else {
        tag.classList.add('phoneme-tag--bad');
      }

      tag.title = `${ph.phoneme}: ${ph.accuracyScore}%`;
      el.phonemeTags.appendChild(tag);
    });
  });

  // Score bars
  const fluency = result.fluencyScore ?? 0;
  const completeness = result.completenessScore ?? 0;
  const accuracy = result.accuracyScore ?? 0;

  el.fluencyBar.style.width = `${fluency}%`;
  el.fluencyValue.textContent = `${fluency}%`;

  el.completenessBar.style.width = `${completeness}%`;
  el.completenessValue.textContent = `${completeness}%`;

  el.accuracyBar.style.width = `${accuracy}%`;
  el.accuracyValue.textContent = `${accuracy}%`;
}

// ---------------------------------------------------------------------------
// Settings Modal
// ---------------------------------------------------------------------------

function openSettingsModal() {
  const { apiKey, region } = getConfig();
  el.azureKeyInput.value = apiKey || '';
  el.azureRegionInput.value = region || 'japaneast';
  el.saveConfirm.hidden = true;

  // Status indicator
  const configured = isAzureConfigured();
  el.azureStatusDot.className = 'azure-status-dot' +
    (configured ? ' azure-status-dot--ok' : ' azure-status-dot--off');
  el.azureStatusText.textContent = configured ? 'Azure設定済み' : 'Azure未設定';

  el.settingsModal.hidden = false;
  el.settingsModal.setAttribute('aria-hidden', 'false');
  el.azureKeyInput.focus();
}

function closeSettingsModal() {
  el.settingsModal.hidden = true;
  el.settingsModal.setAttribute('aria-hidden', 'true');
}

function saveSettings() {
  const apiKey = el.azureKeyInput.value.trim();
  const region = el.azureRegionInput.value.trim();

  if (!apiKey || !region) {
    showToast('APIキーとリージョンを入力してください。');
    return;
  }

  saveConfig(apiKey, region);

  // Update status dot
  el.azureStatusDot.className = 'azure-status-dot azure-status-dot--ok';
  el.azureStatusText.textContent = 'Azure設定済み';

  el.saveConfirm.hidden = false;
  updateAzureTimeDisplay();

  setTimeout(() => {
    closeSettingsModal();
    showToast('設定を保存しました。');
  }, 800);
}

// ---------------------------------------------------------------------------
// Event Listeners Setup
// ---------------------------------------------------------------------------

function setupEventListeners() {
  // Category tabs
  document.querySelectorAll('.tab-btn[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      if (state.currentCategory === cat) return;
      state.currentCategory = cat;
      state.currentSubcategory = null;
      state.currentPhraseIndex = 0;

      populateCategoryTabs();
      populateSubcategoryChips();
      loadCurrentPhrase();
    });
  });

  // Play button
  el.playBtn.addEventListener('click', async () => {
    const phrase = state.sortedPhrases[state.currentPhraseIndex];
    if (!phrase) return;
    el.playBtn.disabled = true;
    try {
      await speak(phrase.en, state.currentSpeed);
    } catch (err) {
      showToast(`再生エラー: ${err.message}`);
    } finally {
      el.playBtn.disabled = false;
    }
  });

  // Record button
  el.recordBtn.addEventListener('click', async () => {
    try {
      await handleRecord();
    } catch (err) {
      setRecordingState(false);
      showToast(`録音エラー: ${err.message}`);
    }
  });

  // Speed toggle
  el.speedBtn.addEventListener('click', () => {
    state.currentSpeed = state.currentSpeed === 1.0 ? 0.75 : 1.0;
    applySpeedUI();
  });

  // Mode toggle
  el.modeToggle.addEventListener('change', () => {
    const newMode = el.modeToggle.checked ? 'azure' : 'simple';

    if (newMode === 'azure' && !isAzureConfigured()) {
      showToast('Azure未設定です。設定を開いてAPIキーを入力してください。');
      openSettingsModal();
      // Revert toggle if not configured
      el.modeToggle.checked = false;
      return;
    }

    switchMode(newMode);
  });

  // Try Again button
  el.tryAgainBtn.addEventListener('click', () => {
    el.resultArea.hidden = true;
    setRecordingState(false);
  });

  // Next phrase button
  el.nextPhraseBtn.addEventListener('click', () => {
    if (state.sortedPhrases.length === 0) return;
    state.currentPhraseIndex = (state.currentPhraseIndex + 1) % state.sortedPhrases.length;
    // Re-sort to reflect any newly updated priorities
    buildSortedPhrases();
    loadCurrentPhrase();
  });

  // Settings gear button
  el.settingsBtn.addEventListener('click', () => {
    openSettingsModal();
  });

  // Settings close button
  el.settingsCloseBtn.addEventListener('click', () => {
    closeSettingsModal();
  });

  // Click outside modal to close
  el.settingsModal.addEventListener('click', (e) => {
    if (e.target === el.settingsModal) closeSettingsModal();
  });

  // Settings save button
  el.saveSettingsBtn.addEventListener('click', () => {
    saveSettings();
  });

  // Toggle API key visibility
  el.toggleKeyVisibility.addEventListener('click', () => {
    const isPassword = el.azureKeyInput.type === 'password';
    el.azureKeyInput.type = isPassword ? 'text' : 'password';
  });

  // Reset progress
  el.resetProgressBtn.addEventListener('click', () => {
    if (!confirm('進捗データをリセットしますか？この操作は元に戻せません。')) return;
    localStorage.removeItem('english-trainer-progress');
    updateProgressIndicator();
    showToast('進捗データをリセットしました。');
  });

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !el.settingsModal.hidden) {
      closeSettingsModal();
    }
  });
}

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

function init() {
  cacheElements();

  // 1. Check browser support
  const support = checkSpeechSupport();
  if (!support.stt) {
    const warning = document.createElement('div');
    warning.className = 'support-warning';
    warning.style.cssText =
      'background:#fef3c7;border:1px solid #f59e0b;padding:12px 16px;border-radius:8px;margin:8px 16px;font-size:14px;color:#92400e;';
    warning.textContent =
      'このブラウザは音声認識に対応していません。Chrome または Edge をお使いください。';
    document.getElementById('appMain').prepend(warning);
  }
  if (!support.mediaRecorder) {
    // Azure mode requires MediaRecorder; disable it silently
    // by preventing the toggle from being checked
    el.modeToggle.disabled = true;
  }

  // 2. Restore mode from localStorage
  const savedMode = localStorage.getItem('english-trainer-mode');
  if (savedMode === 'azure' || savedMode === 'simple') {
    state.currentMode = savedMode;
  }

  // 3. Populate category tabs
  populateCategoryTabs();

  // 4. Set default category + subcategory, populate chips
  state.currentCategory = 'tech';
  state.currentSubcategory = null;
  populateSubcategoryChips();

  // 5. Load first phrase
  state.currentPhraseIndex = 0;
  loadCurrentPhrase();

  // 6. Set up all event listeners
  setupEventListeners();

  // 7. Apply mode & speed UI
  applyModeUI();
  applySpeedUI();

  // 8. Update Azure remaining time display
  updateAzureTimeDisplay();

  // 9. If mode is Azure but not configured, show settings modal
  if (state.currentMode === 'azure' && !isAzureConfigured()) {
    openSettingsModal();
  }
}

document.addEventListener('DOMContentLoaded', init);

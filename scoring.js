/**
 * scoring.js
 * LCS-based fallback scoring and word-diff utilities.
 * Used when Azure Speech is unavailable or as supplementary analysis.
 */

// ---------------------------------------------------------------------------
// Text normalisation
// ---------------------------------------------------------------------------

/**
 * Normalise text for comparison: lowercase, strip punctuation, collapse whitespace.
 * @param {string} text
 * @returns {string}
 */
export function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s']|_/g, ' ') // keep apostrophes (contractions), drop other punct
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Split normalised text into a word array, filtering empty tokens.
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
  return normalizeText(text).split(/\s+/).filter(w => w.length > 0);
}

// ---------------------------------------------------------------------------
// Longest Common Subsequence (word-level)
// ---------------------------------------------------------------------------

/**
 * Compute the LCS of two word arrays using standard bottom-up DP.
 * @param {string[]} target
 * @param {string[]} user
 * @returns {{ length: number, matrix: number[][] }}
 */
export function computeLCS(target, user) {
  const m = target.length;
  const n = user.length;

  // Allocate (m+1) × (n+1) matrix initialised to 0
  const matrix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (target[i - 1] === user[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  return { length: matrix[m][n], matrix };
}

// ---------------------------------------------------------------------------
// Word-level diff
// ---------------------------------------------------------------------------

/**
 * @typedef {{ word: string, type: 'match' | 'missed' | 'extra' }} DiffToken
 */

/**
 * Backtrack through the LCS matrix to produce a word-level diff.
 *
 * Token types:
 *   - "match"  — word appears in both (green)
 *   - "missed" — in target but absent from user (red)
 *   - "extra"  — in user but absent from target (orange)
 *
 * @param {string[]} targetWords
 * @param {string[]} userWords
 * @returns {DiffToken[]}
 */
export function generateDiff(targetWords, userWords) {
  const { matrix } = computeLCS(targetWords, userWords);
  const diff = [];

  let i = targetWords.length;
  let j = userWords.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && targetWords[i - 1] === userWords[j - 1]) {
      diff.unshift({ word: targetWords[i - 1], type: 'match' });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
      diff.unshift({ word: userWords[j - 1], type: 'extra' });
      j--;
    } else {
      diff.unshift({ word: targetWords[i - 1], type: 'missed' });
      i--;
    }
  }

  return diff;
}

// ---------------------------------------------------------------------------
// Score calculation
// ---------------------------------------------------------------------------

/**
 * Calculate a percentage score based on LCS coverage of the target phrase.
 * @param {string} targetText
 * @param {string} userText
 * @returns {{ score: number, diff: DiffToken[], targetWords: string[], userWords: string[] }}
 */
export function calculateScore(targetText, userText) {
  const targetWords = tokenize(targetText);
  const userWords   = tokenize(userText);

  if (targetWords.length === 0) {
    return { score: 0, diff: [], targetWords, userWords };
  }

  const lcs = computeLCS(targetWords, userWords);
  const score = Math.round((lcs.length / targetWords.length) * 100);

  return {
    score,
    diff: generateDiff(targetWords, userWords),
    targetWords,
    userWords
  };
}

// ---------------------------------------------------------------------------
// Fallback assessment (Web Speech API path)
// ---------------------------------------------------------------------------

/**
 * Produce a structured assessment result using the Web Speech API transcript
 * and confidence value when Azure is unavailable.
 *
 * The final score is weighted by confidence to penalise low-confidence
 * transcriptions: adjustedScore = score × (0.5 + confidence × 0.5)
 *
 * @param {string} referenceText
 * @param {string} transcript
 * @param {number} confidence  - value in [0, 1]
 * @returns {{
 *   overallScore: number,
 *   accuracyScore: number,
 *   fluencyScore: number,
 *   completenessScore: number,
 *   words: Array<{ word: string, accuracyScore: number, errorType: string, phonemes: [] }>,
 *   isFallback: true
 * }}
 */
export function fallbackAssess(referenceText, transcript, confidence) {
  const clampedConfidence = Math.min(1, Math.max(0, confidence));
  const result = calculateScore(referenceText, transcript);

  const adjustedScore = Math.round(
    result.score * (0.5 + clampedConfidence * 0.5)
  );

  const words = result.diff.map(d => ({
    word: d.word,
    accuracyScore: d.type === 'match' ? Math.round(clampedConfidence * 100) : 0,
    errorType: d.type === 'match'
      ? 'None'
      : d.type === 'missed'
        ? 'Omission'
        : 'Insertion',
    phonemes: []
  }));

  return {
    overallScore:       adjustedScore,
    accuracyScore:      adjustedScore,
    fluencyScore:       Math.round(clampedConfidence * 100),
    completenessScore:  result.score,
    words,
    isFallback: true
  };
}

// ---------------------------------------------------------------------------
// Score display helpers
// ---------------------------------------------------------------------------

/**
 * Map a numeric score (0–100) to a display label and colour.
 * @param {number} score
 * @returns {{ label: string, color: string }}
 */
export function getScoreLevel(score) {
  if (score >= 90) return { label: 'Excellent',    color: '#16a34a' };
  if (score >= 70) return { label: 'Good',         color: '#d97706' };
  if (score >= 50) return { label: 'Keep Trying',  color: '#ea580c' };
  return               { label: 'Try Again',      color: '#dc2626' };
}

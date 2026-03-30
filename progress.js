/**
 * progress.js
 * Per-phrase learning progress tracking, persisted to localStorage.
 *
 * Status lifecycle:
 *   "new"      → never attempted
 *   "learning" → attempted but bestScore < 85
 *   "mastered" → bestScore >= 85
 */

const STORAGE_KEY = 'english-trainer-progress';

/** @typedef {{ attempts: number, bestScore: number, lastAttempt: string|null, status: 'new'|'learning'|'mastered' }} PhraseProgress */

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

/**
 * Load all stored progress from localStorage.
 * Returns an empty object if nothing is stored or the data is corrupt.
 * @returns {Record<string, PhraseProgress>}
 */
export function getAllProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/** @param {Record<string, PhraseProgress>} data */
function persistProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage may be full; the in-memory state is still valid for this session
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get progress for a single phrase, returning a default record if unseen.
 * @param {string} phraseId
 * @returns {PhraseProgress}
 */
export function getProgress(phraseId) {
  const all = getAllProgress();
  return all[phraseId] ?? {
    attempts:    0,
    bestScore:   0,
    lastAttempt: null,
    status:      'new'
  };
}

/**
 * Record a new attempt for phraseId with the given score.
 * Updates bestScore, increments attempt count, and recalculates status.
 *
 * @param {string} phraseId
 * @param {number} score - 0 to 100
 * @returns {PhraseProgress} The updated record
 */
export function updateProgress(phraseId, score) {
  const all     = getAllProgress();
  const current = all[phraseId] ?? {
    attempts:    0,
    bestScore:   0,
    lastAttempt: null,
    status:      'new'
  };

  current.attempts   += 1;
  current.bestScore   = Math.max(current.bestScore, score);
  current.lastAttempt = new Date().toISOString();
  current.status      = current.bestScore >= 85 ? 'mastered' : 'learning';

  all[phraseId] = current;
  persistProgress(all);
  return current;
}

/**
 * Sort a phrase array by practice priority:
 *   "learning" first (needs attention), then "new" (not yet started), then "mastered".
 *
 * The original array is not mutated.
 * @param {Array<{ id: string|number }>} phrases
 * @returns {Array<{ id: string|number }>}
 */
export function sortByPriority(phrases) {
  const progress = getAllProgress();
  const order = { learning: 0, new: 1, mastered: 2 };

  return [...phrases].sort((a, b) => {
    const pa = progress[a.id]?.status ?? 'new';
    const pb = progress[b.id]?.status ?? 'new';
    return order[pa] - order[pb];
  });
}

/**
 * Compute aggregate statistics for a set of phrases.
 * @param {Array<{ id: string|number }>} phrases
 * @returns {{ mastered: number, learning: number, new: number, total: number }}
 */
export function getStats(phrases) {
  const progress = getAllProgress();
  let mastered = 0;
  let learning = 0;
  let newCount = 0;

  for (const p of phrases) {
    const status = progress[p.id]?.status ?? 'new';
    if (status === 'mastered')     mastered++;
    else if (status === 'learning') learning++;
    else                            newCount++;
  }

  return { mastered, learning, new: newCount, total: phrases.length };
}

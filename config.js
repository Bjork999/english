/**
 * config.js
 * Azure Speech API configuration and monthly usage tracking.
 * All state is persisted to localStorage.
 */

const STORAGE_KEY_CONFIG = 'english-trainer-config';
const STORAGE_KEY_USAGE  = 'english-trainer-azure-usage';

/** 5 hours expressed in seconds */
const MONTHLY_LIMIT_SECONDS = 5 * 60 * 60;

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * Read Azure configuration from localStorage.
 * @returns {{ apiKey: string, region: string }}
 */
export function getConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!stored) return { apiKey: '', region: 'japaneast' };
    const parsed = JSON.parse(stored);
    return {
      apiKey: typeof parsed.apiKey === 'string' ? parsed.apiKey : '',
      region: typeof parsed.region === 'string' ? parsed.region : 'japaneast'
    };
  } catch {
    return { apiKey: '', region: 'japaneast' };
  }
}

/**
 * Persist Azure API key and region to localStorage.
 * @param {string} apiKey
 * @param {string} region
 */
export function saveConfig(apiKey, region) {
  localStorage.setItem(
    STORAGE_KEY_CONFIG,
    JSON.stringify({ apiKey: apiKey.trim(), region: region.trim() })
  );
}

/**
 * Returns true if an API key has been configured.
 * @returns {boolean}
 */
export function isConfigured() {
  const { apiKey } = getConfig();
  return typeof apiKey === 'string' && apiKey.length > 0;
}

// ---------------------------------------------------------------------------
// Usage tracking
// ---------------------------------------------------------------------------

/**
 * Return the current month string in "YYYY-MM" format.
 * @returns {string}
 */
function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Read usage data from localStorage, resetting automatically on a new month.
 * @returns {{ month: string, usedSeconds: number }}
 */
export function getUsageData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USAGE);
    if (!stored) return { month: getCurrentMonth(), usedSeconds: 0 };

    const data = JSON.parse(stored);
    if (data.month !== getCurrentMonth()) {
      return { month: getCurrentMonth(), usedSeconds: 0 };
    }
    return {
      month: data.month,
      usedSeconds: typeof data.usedSeconds === 'number' ? data.usedSeconds : 0
    };
  } catch {
    return { month: getCurrentMonth(), usedSeconds: 0 };
  }
}

/**
 * Add durationSeconds to the running monthly total.
 * @param {number} durationSeconds
 */
export function trackAzureUsage(durationSeconds) {
  const data = getUsageData();
  data.usedSeconds += Math.max(0, durationSeconds);
  data.month = getCurrentMonth();
  try {
    localStorage.setItem(STORAGE_KEY_USAGE, JSON.stringify(data));
  } catch {
    // localStorage may be full or unavailable; silently skip persisting
  }
}

/**
 * Return how many seconds remain in this month's quota.
 * @returns {number}
 */
export function getAzureRemainingSeconds() {
  const { usedSeconds } = getUsageData();
  return Math.max(0, MONTHLY_LIMIT_SECONDS - usedSeconds);
}

/**
 * Format the remaining monthly quota as a human-readable string, e.g. "4h37m".
 * @returns {string}
 */
export function formatRemainingTime() {
  const remaining = getAzureRemainingSeconds();
  const hours   = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  return `${hours}h${String(minutes).padStart(2, '0')}m`;
}

/**
 * Format the total monthly limit as a human-readable string, e.g. "5h00m".
 * @returns {string}
 */
export function formatTotalTime() {
  const hours = Math.floor(MONTHLY_LIMIT_SECONDS / 3600);
  return `${hours}h00m`;
}

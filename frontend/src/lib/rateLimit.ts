import { NextRequest } from "next/server";

interface RateLimitRecord {
  timestamps: number[];
  violations: number;
  jailedUntil: number | null;
}

// In-memory sliding window rate limit store
const ipStore = new Map<string, RateLimitRecord>();

// Configuration parameters
const CONFIG = {
  // Main rolling window: 1 minute (60,000ms)
  WINDOW_MS: 60 * 1000,
  // Maximum allowed requests within the 1-minute window
  MAX_REQUESTS_PER_WINDOW: 12,

  // Burst protection window: 5 seconds (5,000ms)
  BURST_WINDOW_MS: 5 * 1000,
  // Maximum requests allowed in burst window
  MAX_BURST_REQUESTS: 3,

  // Jail / Cooldown ban duration for repeat offenders: 10 minutes
  JAIL_DURATION_MS: 10 * 60 * 1000,
  // Number of rejected attempts before an IP is placed in jail
  VIOLATION_THRESHOLD_FOR_JAIL: 3,

  // Cleanup interval: 2 minutes
  CLEANUP_INTERVAL_MS: 2 * 60 * 1000,
};

// Periodic garbage collection to prevent memory leaks from inactive IPs
let lastCleanup = Date.now();
function runGarbageCollection() {
  const now = Date.now();
  if (now - lastCleanup < CONFIG.CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, record] of ipStore.entries()) {
    // If IP is not jailed and has no requests in the last window, purge it
    const isJailed = record.jailedUntil !== null && record.jailedUntil > now;
    const hasRecentRequests = record.timestamps.some(
      (ts) => now - ts < CONFIG.WINDOW_MS
    );

    if (!isJailed && !hasRecentRequests) {
      ipStore.delete(ip);
    }
  }
}

/**
 * Extracts the real client IP address from request headers.
 */
export function getClientIp(req: NextRequest): string {
  // Check Cloudflare header
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // Check X-Forwarded-For (first entry is the client)
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  // Check X-Real-IP
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Fallback to localhost identifier
  return "127.0.0.1";
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
  retryAfterSeconds: number;
  error?: string;
}

/**
 * Validates request against rate limits and bot abuse rules.
 */
export function checkRateLimit(req: NextRequest): RateLimitResult {
  runGarbageCollection();

  const ip = getClientIp(req);
  const now = Date.now();

  let record = ipStore.get(ip);
  if (!record) {
    record = {
      timestamps: [],
      violations: 0,
      jailedUntil: null,
    };
    ipStore.set(ip, record);
  }

  // 1. Check if the IP is currently jailed due to repeat violations
  if (record.jailedUntil !== null) {
    if (now < record.jailedUntil) {
      const remainingJailSeconds = Math.ceil((record.jailedUntil - now) / 1000);
      return {
        allowed: false,
        limit: CONFIG.MAX_REQUESTS_PER_WINDOW,
        remaining: 0,
        resetSeconds: remainingJailSeconds,
        retryAfterSeconds: remainingJailSeconds,
        error: `Access temporarily restricted due to excessive automated traffic. Please retry in ${remainingJailSeconds} seconds.`,
      };
    } else {
      // Jail sentence expired: reset violations and release
      record.jailedUntil = null;
      record.violations = 0;
      record.timestamps = [];
    }
  }

  // 2. Filter out timestamps older than the rolling window
  record.timestamps = record.timestamps.filter(
    (ts) => now - ts < CONFIG.WINDOW_MS
  );

  // 3. Check burst rate (e.g. > 3 requests in 5 seconds)
  const recentBurstCount = record.timestamps.filter(
    (ts) => now - ts < CONFIG.BURST_WINDOW_MS
  ).length;

  if (recentBurstCount >= CONFIG.MAX_BURST_REQUESTS) {
    record.violations += 1;
    if (record.violations >= CONFIG.VIOLATION_THRESHOLD_FOR_JAIL) {
      record.jailedUntil = now + CONFIG.JAIL_DURATION_MS;
      const jailSecs = Math.ceil(CONFIG.JAIL_DURATION_MS / 1000);
      return {
        allowed: false,
        limit: CONFIG.MAX_REQUESTS_PER_WINDOW,
        remaining: 0,
        resetSeconds: jailSecs,
        retryAfterSeconds: jailSecs,
        error: `Bot activity detected: multiple burst requests blocked. IP suspended for ${jailSecs} seconds.`,
      };
    }

    const retrySecs = 5;
    return {
      allowed: false,
      limit: CONFIG.MAX_BURST_REQUESTS,
      remaining: 0,
      resetSeconds: retrySecs,
      retryAfterSeconds: retrySecs,
      error: "You are sending requests too quickly. Please pause for 5 seconds.",
    };
  }

  // 4. Check main rolling window rate (e.g. > 12 requests in 60 seconds)
  if (record.timestamps.length >= CONFIG.MAX_REQUESTS_PER_WINDOW) {
    record.violations += 1;

    // Check if violations warrant temporary jail
    if (record.violations >= CONFIG.VIOLATION_THRESHOLD_FOR_JAIL) {
      record.jailedUntil = now + CONFIG.JAIL_DURATION_MS;
      const jailSecs = Math.ceil(CONFIG.JAIL_DURATION_MS / 1000);
      return {
        allowed: false,
        limit: CONFIG.MAX_REQUESTS_PER_WINDOW,
        remaining: 0,
        resetSeconds: jailSecs,
        retryAfterSeconds: jailSecs,
        error: `Persistent rate limit violations. IP blocked for ${jailSecs} seconds.`,
      };
    }

    // Oldest timestamp determines when the window will slide to permit the next request
    const oldestTimestamp = record.timestamps[0];
    const retrySecs = Math.max(
      1,
      Math.ceil((oldestTimestamp + CONFIG.WINDOW_MS - now) / 1000)
    );

    return {
      allowed: false,
      limit: CONFIG.MAX_REQUESTS_PER_WINDOW,
      remaining: 0,
      resetSeconds: retrySecs,
      retryAfterSeconds: retrySecs,
      error: `Rate limit reached (max ${CONFIG.MAX_REQUESTS_PER_WINDOW} per minute). Please wait ${retrySecs} seconds before uploading another image.`,
    };
  }

  // 5. Request is allowed: record timestamp and calculate remaining allowance
  record.timestamps.push(now);
  const remaining = Math.max(
    0,
    CONFIG.MAX_REQUESTS_PER_WINDOW - record.timestamps.length
  );
  const oldestTs = record.timestamps[0] || now;
  const resetSecs = Math.max(
    1,
    Math.ceil((oldestTs + CONFIG.WINDOW_MS - now) / 1000)
  );

  return {
    allowed: true,
    limit: CONFIG.MAX_REQUESTS_PER_WINDOW,
    remaining,
    resetSeconds: resetSecs,
    retryAfterSeconds: 0,
  };
}

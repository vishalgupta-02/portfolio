"use client";

import type { AnalyticsEventType } from "./types";

const VISITOR_COOKIE_NAME = "_pa_vid";
const COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60; // 1 year

/**
 * Retrieves the anonymous visitor ID from the first-party cookie,
 * or generates a cryptographically random UUID and stores it.
 */
export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "";
  }

  try {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (const cookie of cookies) {
      const [name, val] = cookie.split("=");
      if (name === VISITOR_COOKIE_NAME && val) {
        return decodeURIComponent(val);
      }
    }

    const newId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

    document.cookie = `${VISITOR_COOKIE_NAME}=${encodeURIComponent(
      newId,
    )}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;

    return newId;
  } catch {
    return "";
  }
}

/**
 * Sanitizes metadata to ensure only primitive values or clean objects are transmitted,
 * and caps nested depth and total length to avoid payload bloat.
 */
function sanitizeMetadata(
  meta?: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!meta || typeof meta !== "object") return undefined;

  const clean: Record<string, unknown> = {};
  const keys = Object.keys(meta).slice(0, 10); // Max 10 keys

  for (const key of keys) {
    const val = meta[key];
    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean"
    ) {
      clean[key] = typeof val === "string" ? val.slice(0, 200) : val;
    }
  }

  return clean;
}

/**
 * Primary telemetry dispatch function. Non-blocking and fails silently.
 */
export function trackEvent(
  type: AnalyticsEventType,
  metadata?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  try {
    const path = window.location.pathname || "/";
    const visitorId = getOrCreateVisitorId();
    const payload = JSON.stringify({
      type,
      path,
      visitorId,
      metadata: sanitizeMetadata(metadata),
    });

    const endpoint = "/api/analytics";

    // Attempt navigator.sendBeacon if available (ideal for unload / backgrounding)
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      const sent = navigator.sendBeacon(endpoint, blob);
      if (sent) return;
    }

    // Fallback to fetch with keepalive: true
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
      credentials: "same-origin",
    }).catch(() => {
      // Analytics failures are non-critical and never throw
    });
  } catch {
    // Non-blocking silent catch
  }
}

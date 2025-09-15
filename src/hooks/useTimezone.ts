"use client";

export function useTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function getLocalDateString(): string {
    // Returns YYYY-MM-DD in user's timezone
    return new Date().toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: timezone,
    });
  }

  return { timezone, getLocalDateString };
}

export function getClientFingerprint() {
  if (typeof window === "undefined") return "server";

  return btoa(
    [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
    ].join("|")
  );
}

export function fakeDelay(ms = 800) {
  return new Promise((res) => setTimeout(res, ms));
}

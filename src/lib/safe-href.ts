const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

function tryParseUrl(raw: string): URL | null {
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

export function sanitizeExternalHref(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 2048) return null;

  const url = tryParseUrl(trimmed);
  if (!url || !HTTP_PROTOCOLS.has(url.protocol)) return null;
  return url.toString();
}

export function sanitizeMailtoHref(email: string | null | undefined): string | null {
  if (!email) return null;
  const trimmed = email.trim();
  if (trimmed.length > 254) return null;
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmed)) return null;
  return `mailto:${trimmed}`;
}

export function sanitizeTelHref(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const cleaned = phone.replace(/[^0-9+().\-\s]/g, "").trim();
  const dial = cleaned.replace(/[^0-9+]/g, "");
  if (dial.length < 7 || dial.length > 20) return null;
  if (!/^\+?[0-9]+$/.test(dial)) return null;
  return `tel:${dial}`;
}

export function sanitizeDoiHref(doi: string | null | undefined): string | null {
  if (!doi) return null;
  const trimmed = doi.trim();
  if (!trimmed || trimmed.length > 255) return null;
  if (/[\s<>"'`]/.test(trimmed)) return null;
  return `https://doi.org/${encodeURI(trimmed)}`;
}

export function buildMetadataBase(
  forwardedProto: string | null,
  forwardedHost: string | null,
  host: string | null,
): URL {
  const protocol = forwardedProto === "http" ? "http" : "https";
  const candidateHost = (forwardedHost ?? host ?? "").split(",")[0]?.trim() ?? "";
  const safeHost = /^[A-Z0-9.-]+(?::\d{1,5})?$/i.test(candidateHost)
    ? candidateHost
    : "localhost:3000";
  return new URL(`${protocol}://${safeHost}`);
}

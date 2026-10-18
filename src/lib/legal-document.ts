import "server-only";

export type LegalDocument = {
  title: string;
  markdown: string;
  version: number;
  publishedAt: string;
  effectiveAt: string;
};

export async function getActiveLegalDocument(): Promise<LegalDocument | null> {
  const base = process.env.ALPHA_API_URL;
  if (!base) return null;
  let url: URL;
  try {
    url = new URL(base);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    url = new URL("/api/legal-document/active", url);
  } catch {
    return null;
  }
  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000), redirect: "error" });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (!data || typeof data !== "object") return null;
    const doc = data as Record<string, unknown>;
    if (typeof doc.title !== "string" || typeof doc.markdown !== "string" ||
        typeof doc.version !== "number" || typeof doc.publishedAt !== "string" ||
        typeof doc.effectiveAt !== "string") return null;
    return doc as LegalDocument;
  } catch {
    return null;
  }
}

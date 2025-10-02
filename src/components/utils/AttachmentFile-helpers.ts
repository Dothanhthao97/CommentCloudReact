import { AttachmentFile } from "./types";

const isAttachment = (v: unknown): v is AttachmentFile =>
  !!v && typeof v === "object" && typeof (v as any).Url === "string";

// JSON.parse an toàn
const safeJson = (s: string): unknown => {
  try { return JSON.parse(s); } catch { return undefined; }
};

// Helper: parse mọi kiểu về mảng AttachmentFile
export const parseAttachments = (raw: unknown): AttachmentFile[] => {
  if (!raw) return [];

  const val =
    typeof raw === "string" ? safeJson(raw.trim()) : raw;

  return Array.isArray(val) ? val.filter(isAttachment) : [];
};
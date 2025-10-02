// chuyển đổi Text ⇄ HTML cho editor
export const escapeHtml = (s = "") =>
  s.replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;")
   .replace(/'/g, "&#039;");

export const plainToHtml = (t = "") => {
  if (!t) return "";
  const paras = escapeHtml(t).split(/\n{2,}/).map(p => p.replace(/\n/g, "<br>"));
  return paras.map(p => `<p>${p}</p>`).join("");
};

export const htmlToPlain = (html = "") => {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return (div.innerText || "").replace(/\u00A0/g, " ").trimEnd();
};

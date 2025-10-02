import type { UploadedFile } from "../utils/types";

// tạo id ổn định cho file local
export const makeId = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;

// thêm các file vừa chọn vào list hiện có (không trùng)
export const addPickedFiles = (current: UploadedFile[], picked: File[]) => {
  const map = new Map<string, UploadedFile>();
  current.forEach(i => map.set(i.id, i));
  picked.forEach(f => {
    const id = makeId(f);
    if (!map.has(id)) {
      map.set(id, { id, file: f, url: URL.createObjectURL(f) } as UploadedFile);
    }
  });
  return Array.from(map.values());
};

// xoá 1 item + revoke URL
export const removeItemById = (list: UploadedFile[], id: string) => {
  const target = list.find(x => x.id === id);
  if (target) URL.revokeObjectURL(target.url);
  return list.filter(x => x.id !== id);
};

// revoke toàn bộ URL
export const revokeAll = (list: UploadedFile[]) => {
  list.forEach(it => URL.revokeObjectURL(it.url));
};

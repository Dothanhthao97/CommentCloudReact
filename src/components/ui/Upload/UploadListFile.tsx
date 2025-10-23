import React from "react";
import Button from "../Button";
import { UploadedFile } from "../../utils/types";

type Props = {
  items: UploadedFile[];
  onRemove: (id: string) => void;
  onClear?: () => void;
};

const UploadListFile: React.FC<Props> = ({ items, onRemove, onClear }) => {
  if (!items?.length) return null;

  const getFileExtension = (filename: string) =>
    filename.split(".").pop()?.toLowerCase() || "";

  const getFileIconClass = (ext: string): string => {
    switch (ext) {
      case "pdf":
        return "ic-pdf";
      case "doc":
      case "docx":
        return "ic-doc";
      case "xls":
      case "xlsx":
        return "ic-excel";
      case "zip":
      case "rar":
        return "ic-zip";
      case "ppt":
      case "pptx":
        return "ic-ppt";
      case "svg":
      case "ico":
        return "ic-file-image";
      default:
        return "ic-attach";
    }
  };

  const isImageFile = (ext: string) =>
    ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => {
        const ext = getFileExtension(it.file.name);
        const isImage = isImageFile(ext);
        const iconClass = getFileIconClass(ext);
        return (
          <div
            key={it.id}
            className="flex items-center gap-2 group p-0.5 relative border-1 border-[#d6d6d6] rounded-[8px] bg-white overflow-hidden hover:border-blue-500"
            title={`${it.file.name} (${Math.round(it.file.size / 1024)} KB)`}
          >
            {isImage ? (
              <div className="flex items-center gap-2 w-full">
                <div className="w-[50px] h-[50px] rounded-md overflow-hidden">
                  <img
                    src={it.url}
                    alt={it.file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* <span className="truncate text-[12px]">{it.file.name}</span> */}
              </div>
            ) : (
              <div className="flex items-center gap-2 px-2 py-1 text-[12px]">
                <span className={`${iconClass} text-[14px]`} />
                <span className="truncate">{it.file.name}</span>
              </div>
            )}

            <Button
              type="button"
              className={`p-1 rounded text-[12px] text-[#8c8c8c] bg-white hover:text-red-500 ${
                isImage ? "absolute top-1 right-1" : ""
              }`}
              onClick={() => onRemove(it.id)}
              aria-label="Remove"
              title="Xoá khỏi danh sách"
              icon="ic-remove"
            />
          </div>
        );
      })}
    </div>
  );
};

export default UploadListFile;

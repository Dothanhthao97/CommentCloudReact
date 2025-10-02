import React from "react";
import Button from "../Button";
import { UploadedFile } from "../utils/types";

type Props = {
  items: UploadedFile[];
  onRemove: (id: string) => void;
  onClear?: () => void;
};

const UploadListFile: React.FC<Props> = ({ items, onRemove, onClear }) => {
  if (!items?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => {
        const isImage = it.file.type?.startsWith("image/");
        return (
          <div
            key={it.id}
            className="group p-0.5 relative border-1 border-[#d6d6d6] rounded-[8px] bg-white overflow-hidden hover:border-blue-500"
            title={`${it.file.name} (${Math.round(it.file.size / 1024)} KB)`}
          >
            {isImage ? (
              <a
                href={it.url}
                target="_blank"
                rel="noreferrer"
                className="block w-[60px] h-[60px] rounded-md overflow-hidden"
              >
                <img
                  src={it.url}
                  alt={it.file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </a>
            ) : (
              <a
                href={it.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-2 py-1 text-[12px] max-w-[260px]"
              >
                <span className="ic-attach text-[14px]" />
                <span className="truncate">{it.file.name}</span>
              </a>
            )}

            <Button
              type="button"
              className="absolute top-1 right-1 p-1 rounded text-[12px] text-[#8c8c8c] bg-white hover:text-red-500"
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

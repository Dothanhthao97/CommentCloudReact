// FileAttachmentItem.tsx
import React from "react";
import Button from "../ui/Button";

type AttachmentFile = { ID?: string; Title?: string; Url: string };

const FileAttachmentItem: React.FC<{ file: AttachmentFile }> = ({ file }) => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = file.Url;
    a.download = file.Title || "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="inline-flex items-center gap-4 rounded-[5px] bg-white border border-[#E9E9E9] py-[9px] px-2.5 mb-2.5 mr-2.5 shadow-[0_3px_4px_0_rgba(94,94,94,0.10)] hover:border-blue-600">
      {file.Title?.match(/\.(jpg|jpeg|png|gif)$/i) && (
        <img src={`data-url=${file.Url}`} style={{ maxWidth: 200 }} />
      )}
      <a
        className="text-[#7D7D7D] text-[12px] hover:text-blue-600"
        href={`data-url=${file.Url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {file.Title || "Tải file đính kèm"}
      </a>

      <span className="inline-block w-[1px] h-[20px] bg-[#E9E9E9]" />
      <Button
        className="btn-download"
        icon="ic-download text-[16px] text-[#3076FF]"
        onClick={handleDownload}
      />
    </div>
  );
};

export default FileAttachmentItem;

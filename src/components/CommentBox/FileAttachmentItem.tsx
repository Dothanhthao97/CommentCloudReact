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
    <>
      {/* <div className="file-item">
        <a href={file.Url} target="_blank" rel="noreferrer">
          {file.Title || "Unknown file"}
        </a>
      </div> */}
      <div className="inline-flex items-center gap-3 rounded-[5px] bg-white border border-[#E9E9E9] py-[9px] px-2.5 mb-2.5 mr-2.5 shadow-[0_3px_4px_0_rgba(94,94,94,0.10)] hover:border-blue-600">
        {file.Title?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
          <img
            className="max-w-[25px] h-[25px] rounded-[2px] object-cover"
            src={file.Url}
          />
        ) : file.Title?.match(/\.(pdf)$/i) ? (
          <i className="ic-file-pdf text-red-500 text-[20px]" />
        ) : file.Title?.match(/\.(doc|docx)$/i) ? (
          <i className="ic-file-doc text-blue-600 text-[20px]" />
        ) : file.Title?.match(/\.(xls|xlsx)$/i) ? (
          <i className="ic-file-excel text-green-600 text-[20px]" />
        ) : file.Title?.match(/\.(ppt|pptx)$/i) ? (
          <i className="ic-file-ppt text-orange-600 text-[20px]" />
        ) : (
          <i className="ic-file1 text-gray-400 text-[20px]" />
        )}

        <a
          className="text-[#7D7D7D] text-[12px] hover:text-blue-600"
          href={`${file.Url}`}
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
    </>
  );
};

export default FileAttachmentItem;

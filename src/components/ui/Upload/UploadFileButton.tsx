import React from "react";
import Button from "../Button";

type UploadFileButtonProps = {
  accept?: string;
  multiple?: boolean;
  className?: string;
  onPick: (files: File[]) => void; // trả mảng File cho parent
};

const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  accept = "*/*",
  multiple = true,
  className = "btn-attach p-1 text-[#7D7D7D] hover:text-blue-600",
  onPick,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const openPicker = () => inputRef.current?.click();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onPick(files);
    e.target.value = ""; // reset để lần sau chọn cùng file vẫn trigger
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <Button
        className={className}
        icon="ic-attach text-[16px]"
        onClick={openPicker}
      />
    </>
  );
};

export default UploadFileButton;

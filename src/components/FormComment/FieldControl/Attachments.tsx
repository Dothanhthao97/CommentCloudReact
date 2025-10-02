import React from "react";

interface AttachmentsProps {
  fieldName: string;
  value?: string; // bạn có thể dùng string[] nếu nhiều file
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Attachments: React.FC<AttachmentsProps> = ({
  fieldName,
  value,
  onChange,
}) => {
  return (
    <input
      type="file"
      id={fieldName}
      name={fieldName}
      onChange={onChange}
      className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                 file:rounded file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  );
};

export default Attachments;

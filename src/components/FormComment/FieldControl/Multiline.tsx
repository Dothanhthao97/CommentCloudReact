import React from "react";

interface MultilineProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}

const Multiline: React.FC<MultilineProps> = ({
  fieldName,
  value,
  onChange,
  rows = 2,
  placeholder = "",
}) => {
  return (
    <textarea
      id={fieldName}
      name={fieldName}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-blue-500"
    />
  );
};

export default Multiline;

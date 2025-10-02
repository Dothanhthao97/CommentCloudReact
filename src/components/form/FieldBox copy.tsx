import React from "react";
import Input from "../ui/inputBox/Input";

interface FieldBoxProps {
  responsiveClasses?: string;
  formLayout?: string;
  labelName?: string;
  fieldName: string;
  labelClasses?: string;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const layoutClassMap: Record<string, string> = {
  verticalForm: "flex flex-col",
  inlineForm: "flex items-center space-x-4",
  nderlineForm: "flex flex-col border-b border-gray-300",
  gridForm: "grid grid-cols-2 gap-4",
  compactForm: "flex flex-col text-sm space-y-1",
};

const FieldBox: React.FC<FieldBoxProps> = ({
  formLayout = "verticalForm",
  responsiveClasses = "w-full gap-2",
  labelName,
  fieldName,
  labelClasses,
  isRequired,
  value,
  onChange,
}) => {
  const layoutClasses = layoutClassMap[formLayout] || "";
  return (
    <>
      <div className={`${layoutClasses} ${responsiveClasses} `}>
        <label
          htmlFor={fieldName}
          className={`block tracking-wide text-gray-700 text-xs ${labelClasses}`}
        >
          {labelName}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
        <Input
          id={fieldName} // id cho input
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default FieldBox;

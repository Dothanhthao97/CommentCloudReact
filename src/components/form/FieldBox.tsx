// FieldBox.tsx
import React from "react";
import { fieldTypeComponentMap } from "../FormComment/FieldControl/FieldTypeMap";
import Input from "../ui/inputBox/Input";

interface FieldBoxProps {
  responsiveClasses?: string;
  formLayout?: string;
  fieldName: string;
  labelName: string;
  labelClasses?: string;
  value: any;
  onChange: (e: any) => void;
  isRequired?: boolean;
  field?: any; // truyền thêm full field để dùng FieldTypeId
  disabled?: boolean;
  className?: string; // thêm className để truyền style tuỳ chỉnh nếu cần
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
  responsiveClasses = "w-full",
  fieldName,
  labelName,
  labelClasses,
  value,
  onChange,
  isRequired = false,
  field,
  disabled = false,
  className,
}) => {
  // Nếu có field và FieldTypeId, dùng component tương ứng
  const Component =
    field && fieldTypeComponentMap[field.FieldTypeId]
      ? fieldTypeComponentMap[field.FieldTypeId]
      : null;

  const layoutClasses = layoutClassMap[formLayout] || "";
  // Render layout tùy chọn (giữ nguyên nếu bạn có định nghĩa cụ thể)
  return (
    <div className={`${layoutClasses} ${responsiveClasses} ${className} `}>
      <label
        className={`block tracking-wide text-gray-700 text-xs mb-2 ${
          labelClasses || ""
        }`}
        htmlFor={field?.internalName || fieldName || ""}
      >
        {labelName} {isRequired && <span style={{ color: "red" }}>*</span>}
      </label>

      {Component ? (
        <Component
          fieldName={field.internalName}
          value={value}
          onChange={(val: any) => {
            const finalValue = val?.target?.value ?? val;
            onChange({ target: { value: finalValue } });
          }}
          field={field} // truyền thêm field nếu component cần
          disabled={disabled}
        />
      ) : (
        // Fallback: dùng Input mặc định nếu không có mapping
        // <Input
        //   id={fieldName}
        //   name={fieldName}
        //   value={value}
        //   onChange={onChange}
        //   disabled={disabled}
        // />
        ""
      )}
    </div>
  );
};

export default FieldBox;

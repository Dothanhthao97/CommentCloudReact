// Radio.tsx
import React from "react";

interface RadioProps {
  fieldName: string;
  value?: string;
  options?: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({
  fieldName,
  value,
  options = [],
  onChange,
}) => {
  if (!Array.isArray(options) || options.length === 0) {
    const safeFieldName = fieldName || "radio";
    const inputId = `${safeFieldName}`;

    return (
      <div className="flex items-center gap-2 opacity-50">
        <input
          type="radio"
          id={inputId}
          name={safeFieldName}
          disabled
          className="form-radio text-gray-400"
        />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {options.map((option, index) => {
        const safeFieldName = fieldName || "radio";
        const inputId = `${safeFieldName}_${index}`;
        return (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={inputId}
              name={fieldName}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="form-radio text-blue-500"
            />
            <label htmlFor={inputId} className="text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Radio;

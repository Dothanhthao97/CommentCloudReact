// Checkbox.tsx
import React from "react";

interface CheckboxProps {
  fieldName: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  fieldName,
  checked,
  onChange,
}) => {
  return (
    <input
      type="checkbox"
      id={fieldName}
      name={fieldName}
      checked={checked}
      onChange={onChange}
      className="form-checkbox text-blue-500"
    />
  );
};

export default Checkbox;

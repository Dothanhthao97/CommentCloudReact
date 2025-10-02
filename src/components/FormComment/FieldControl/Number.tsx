import React from "react";
import Input from "../../ui/inputBox/Input";

interface NumberProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Number: React.FC<NumberProps> = ({ fieldName, value, onChange }) => {
  return (
    <Input
      name={fieldName}
      type="number"
      id={fieldName} // id cho input
      value={value ?? ""}
      onChange={onChange}
    />
  );
};

export default Number;

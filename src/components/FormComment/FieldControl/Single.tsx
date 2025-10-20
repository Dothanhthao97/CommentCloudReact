import React from "react";
import Input from "../../ui/inputBox/Input";

interface SingleProps {
  fieldName: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Single: React.FC<SingleProps> = ({
  fieldName,
  value,
  disabled,
  onChange,
}) => {
  return (
    <>
      <Input
        type="text"
        name={fieldName}
        id={fieldName} // id cho input
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default Single;

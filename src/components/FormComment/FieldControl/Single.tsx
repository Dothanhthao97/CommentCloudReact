import React from "react";
import Input from "../../ui/inputBox/Input";

interface SingleProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Single: React.FC<SingleProps> = ({ fieldName, value, onChange }) => {
  return (
    <>
      <Input
        type="text"
        name={fieldName}
        id={fieldName} // id cho input
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Single;

import React from "react";
import Input from "../../ui/inputBox/Input";

interface ComboboxProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Combobox: React.FC<ComboboxProps> = ({ fieldName, value, onChange }) => {
  return <></>;
};

export default Combobox;

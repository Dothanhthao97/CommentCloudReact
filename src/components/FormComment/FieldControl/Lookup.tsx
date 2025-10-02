import React from "react";
import Input from "../../ui/inputBox/Input";

interface LookupProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Lookup: React.FC<LookupProps> = ({ fieldName, value, onChange }) => {
  return <></>;
};

export default Lookup;

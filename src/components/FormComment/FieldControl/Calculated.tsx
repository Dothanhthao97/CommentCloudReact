import React from "react";
import Input from "../../ui/inputBox/Input";

interface CalculatedProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Calculated: React.FC<CalculatedProps> = ({
  fieldName,
  value,
  onChange,
}) => {
  return <></>;
};

export default Calculated;

import React from "react";
import Input from "../../ui/inputBox/Input";

interface DropDownListProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropDownList: React.FC<DropDownListProps> = ({
  fieldName,
  value,
  onChange,
}) => {
  return <></>;
};

export default DropDownList;

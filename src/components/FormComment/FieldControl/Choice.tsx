import React from "react";
import Input from "../../ui/inputBox/Input";

interface ChoiceProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Choice: React.FC<ChoiceProps> = ({ fieldName, value, onChange }) => {
  return <></>;
};

export default Choice;

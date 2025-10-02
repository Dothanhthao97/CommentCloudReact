import React from "react";
import Input from "../../ui/inputBox/Input";

interface RelatedProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Related: React.FC<RelatedProps> = ({ fieldName, value, onChange }) => {
  return <></>;
};

export default Related;

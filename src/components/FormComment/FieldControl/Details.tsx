import React from "react";
import Input from "../../ui/inputBox/Input";

interface DetailsProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Details: React.FC<DetailsProps> = ({ fieldName, value, onChange }) => {
  return <></>;
};

export default Details;

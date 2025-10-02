import React from "react";
import Input from "../../ui/inputBox/Input";

interface PersonProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Person: React.FC<PersonProps> = ({ fieldName, value, onChange }) => {
  return <></>;
};

export default Person;

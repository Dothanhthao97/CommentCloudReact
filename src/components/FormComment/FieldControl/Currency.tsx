import React from "react";
import Input from "../../ui/inputBox/Input";

interface CurrencyProps {
  fieldName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Currency: React.FC<CurrencyProps> = ({ fieldName, value, onChange }) => {
  return <></>;
};

export default Currency;

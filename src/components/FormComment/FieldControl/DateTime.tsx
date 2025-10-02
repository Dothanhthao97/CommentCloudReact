import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimeProps {
  fieldName: string;
  value?: string;
  onChange?: (value: Date | null) => void;
}

const DateTime: React.FC<DateTimeProps> = ({ fieldName, value, onChange }) => {
  const parsedDate = value ? new Date(value) : null;

  const handleChange = (date: Date | null) => {
    if (onChange) {
      onChange(date); // ✅ không cần ép kiểu khác
    }
  };

  return (
    <DatePicker
      selected={parsedDate}
      onChange={handleChange}
      showTimeSelect
      dateFormat="Pp"
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-blue-500"
      placeholderText="Chọn ngày và giờ"
      id={fieldName}
    />
  );
};

export default DateTime;

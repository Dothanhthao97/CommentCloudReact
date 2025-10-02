import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ id, error, className, ...rest }) => {
  return (
    <>
      <input
        id={id}
        className={`bg-white appearance-none border-1 ${
          error ? "border-red-500" : "border-gray-200"
        } rounded w-full py-2 px-4 text-gray-700 leading-tight outline-0 focus:outline-none focus:bg-white focus:shadow-none focus:ring-0 ${
          error ? "focus:border-red-500" : "focus:border-blue-500"
        } ${className}`}
        {...rest}
      />

      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </>
  );
};

export default Input;

// Button.tsx
import React, { forwardRef } from "react";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  className?: string;
  /** icon class (string) hoặc ReactNode */
  icon?: string | React.ReactNode;
  text?: string;
  classText?: string;
  noBg?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", icon, text, classText, noBg, type = "button", ...rest },
    ref
  ) => {
    const buttonClass = `btn ${
      noBg ? "btn-no-backg" : "btn-backg"
    } ${className}`.trim();
    const hasText = typeof text === "string" && text.trim().length > 0;

    return (
      <button
        ref={ref}
        className={`flex items-center justify-center gap-1.5 leading-none cursor-pointer text-[13px] outline-0 ${buttonClass}`}
        type={type}
        {...rest}
      >
        {typeof icon === "string" ? <i className={icon} /> : icon}
        {hasText && <span className={classText}>{text}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;

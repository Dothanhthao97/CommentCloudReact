import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  rows?: number;
  placeholder?: string; // text hiển thị trong span
  stylePlaceholder?: React.CSSProperties;
  hideLabel?: boolean;
};

function Textarea({
  id,
  name,
  className = "",
  rows,
  placeholder,
  stylePlaceholder,
  hideLabel = false,
  onChange, // lấy ra để gọi lại
  defaultValue,
  value,
  ...rest
}: TextareaProps) {
  // trạng thái rỗng
  const [isEmpty, setIsEmpty] = React.useState(
    (typeof value === "string" ? value : (defaultValue as string) ?? "")
      .length === 0
  );

  // đồng bộ khi value (controlled) thay đổi từ ngoài
  React.useEffect(() => {
    if (typeof value === "string") setIsEmpty(value.length === 0);
  }, [value]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setIsEmpty(e.target.value.length === 0);
    onChange?.(e);
  };

  const textareaClass = `${className}`.trim();

  return (
    <div className="relative flex items-center flex-1 w-full">
      {!hideLabel && isEmpty && (
        <span
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 leading-none"
          style={stylePlaceholder}
        >
          {placeholder}
        </span>
      )}

      <textarea
        id={id}
        name={name}
        className={`w-full py-1 pr-2 outline-0 border-0 resize-none rounded-md ${textareaClass}`}
        rows={rows}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
}

export default Textarea;

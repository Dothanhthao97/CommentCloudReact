import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import Button from "../Button";
import CirculateInforButton from "../Modal/CirculateInforButton";

type HeaderToggleProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  BoxclassName?: string;
  showButton?: boolean;
  isOpen?: boolean; // <-- trạng thái mở được truyền từ cha
  onToggle?: (isOpen: boolean) => void; // <-- sự kiện toggle
  //user: StepItem;
};
function HeaderToggle({
  title,
  children,
  className,
  BoxclassName = "",
  showButton,
  isOpen,
  onToggle,
}: HeaderToggleProps) {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    useCollapse({
      isExpanded: isOpen, // controlled nếu có isOpen
    });

  // Xác định state mở
  const expanded = isOpen !== undefined ? isOpen : isExpanded;

  // Khi người dùng bấm nút toggle
  const handleToggle = () => {
    if (isOpen !== undefined && onToggle) {
      onToggle(!isOpen);
    } else {
      setExpanded(!isExpanded);
    }
  };
  // console.log("BoxclassName received:", BoxclassName);
  // console.log("👉 Rendering HeaderToggle from UI/Toggle");

  return (
    <div className={BoxclassName}>
      <div className="flex gap-3 border-b border-b-gray-200">
        <div onClick={handleToggle}>
          <div
            className={`inline-flex items-center gap-2.5 cursor-pointer py-2.5 ${className}`}
          >
            <Button
              className={`p-2 toggle-button`}
              icon={
                isExpanded ? "ic-expand text-[8px]" : "ic-collapse  text-[8px]"
              }
            />
            <span className="text-blue-600 font-bold">
              {title || "Luồng trao đổi"}
            </span>
          </div>
        </div>
        {showButton && <CirculateInforButton />}
      </div>

      <div {...getCollapseProps()}>{children}</div>
    </div>
  );
}

export default HeaderToggle;

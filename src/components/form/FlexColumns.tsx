import React from "react";

interface FlexColumnsProps {
  columns: number; // Số cột
  height?: string; // Chiều cao tùy chọn
  gapClass?: string; // Lớp khoảng cách giữa các cột
}

const FlexColumns: React.FC<FlexColumnsProps> = ({
  columns,
  height,
  gapClass,
}) => {
  // Tính toán số cột dựa trên prop columns
  const columnClass = `w-full ${Array.from(
    { length: columns },
    (_, i) => `sm:w-1/${columns}`
  ).join(" ")} mb-4`;

  return (
    <>
      <div className="">{columnClass}</div>
    </>
  );
};
export default FlexColumns;

import React from "react";

type HeaderItem = {
  label: string;
  className?: string;
};

type TableProps = {
  title?: string;
  headers?: HeaderItem[];
  tbody: React.ReactNode;
  className?: string;
};

const Table: React.FC<TableProps> = ({ title, headers, tbody, className }) => {
  return (
    <div className="overflow-x-auto">
      {title && title.length > 0 && (
        <h2 className="text-blue-600 font-semibold text-sm mb-3">
          {title || "Xem chi tiết thông tin xử lý"}
        </h2>
      )}
      <table className={`w-full text-sm text-left ${className}`}>
        {headers && headers.length > 0 && (
          <thead className="bg-gray-100 text-black font-semibold">
            <tr>
              {headers?.map((header, idx) => (
                <th
                  key={idx}
                  className={`px-1.5 py-2 bg-[rgb(245, 245, 245)] text-[#202020] text-[13px] ${
                    header.className || ""
                  }`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
};

export default Table;

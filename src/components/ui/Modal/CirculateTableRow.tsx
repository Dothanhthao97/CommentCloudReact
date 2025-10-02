import React from "react";
import { StepItem } from "../../utils/types";

type CirculateTableRowProps = {
  user: StepItem;
  //showAction?: boolean;
  //getSubmitActionBgClass: (status: number, submitActionId: number) => string;
};

const CirculateTableRow: React.FC<CirculateTableRowProps> = ({
  user,
  //showAction,
  //getSubmitActionBgClass,
}) => {
  function formatDate(dateString: string) {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Tháng từ 0
    const year = String(d.getFullYear()).slice(2); // Lấy 2 số cuối năm
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <>
      <tr className="odd:bg-[#f3f9ff]">
        <td className="px-1.5 py-2 w-[19%]">
          <div className="flex items-center gap-2">
            <img
              src={user.FromUserAvatar}
              className="w-6 h-6 rounded-full"
              alt=""
            />
            <div>
              <div className="font-medium">{user.FromUserName}</div>
              <div className="text-xs text-gray-500">
                {user.FromPositionTitle}
              </div>
            </div>
          </div>
        </td>

        {/* Gửi đến */}
        <td className="px-1.5 py-2 w-[19%]">
          <div className="flex items-center gap-2">
            <img
              src={user.AssignUserAvatar}
              className="w-6 h-6 rounded-full"
              alt=""
            />
            <div>
              <div className="font-medium">{user.AssignUserName}</div>
              <div className="text-xs text-gray-500">
                {user.AssignPositionTitle}
              </div>
            </div>
          </div>
        </td>

        {/* Ngày bắt đầu */}
        <td className="px-1.5 py-2 whitespace-nowrap w-[11%]">
          {formatDate(user.Created)}
        </td>

        {/* Hạn hoàn thành */}
        <td className="px-1.5 py-2 whitespace-nowrap w-[11%]"></td>

        {/* Ngày hoàn thành */}
        <td className="px-1.5 py-2 whitespace-nowrap w-[11%]">
          {formatDate(user.CompletedDate)}
        </td>

        {/* Hành động */}
        <td className="px-1.5 py-2 w-[15%]">
          <span className={""}>{user.SubmitAction}</span>
        </td>

        {/* Ý kiến */}
        <td className="px-1.5 py-2 w-[15%]">{user.Comment}</td>
      </tr>
    </>
  );
};

export default CirculateTableRow;

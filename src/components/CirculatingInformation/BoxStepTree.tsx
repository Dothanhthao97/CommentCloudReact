// components/UserNode.tsx
import React from "react";
import { StepItem } from "../utils/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi"; // ngôn ngữ tiếng Việt

type BoxStepItemProps = {
  user: StepItem;
  level?: number;
  getSubmitActionBgClass: (status: number, submitActionId: number) => string;
};

const BoxStepItem: React.FC<BoxStepItemProps> = ({
  user,
  level = 0,
  getSubmitActionBgClass,
}) => {
  dayjs.extend(relativeTime);
  dayjs.locale("vi");

  return (
    <>
      <div
        key={user.ID}
        style={{ paddingLeft: `${level * 16}px` }}
        className={`mt-3.5`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={user.AssignUserAvatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-[#202020]">
                {user.AssignUserName}
              </p>
              <span className="text-xs text-[#6d6d6d] text-[11px]">
                {user.FromPositionTitle}
              </span>
            </div>
          </div>

          <div className="flex gap-1 flex-col">
            <span
              className={`text-xs text-center whitespace-nowrap rounded-[5px] py-[3px] px-[20px] text-[12px] ${getSubmitActionBgClass(
                user.Status,
                user.SubmitActionId
              )}`}
            >
              {user.SubmitAction}
            </span>
            <span className="text-xs text-right text-[13px] text-[#7D7D7D]">
              {user.CompletedDate ? dayjs(user.CompletedDate).fromNow() : ""}
            </span>
          </div>
        </div>

        {user.Comment && (
          <div className="pl-10 text-sm text-[#202020] break-words line-clamp-2 mt-2">
            {user.Comment}
          </div>
        )}
      </div>
      <div className="pl-6">
        {user.children?.map((child) => (
          <BoxStepItem
            key={child.ID}
            user={child}
            level={level + 1}
            getSubmitActionBgClass={getSubmitActionBgClass}
          />
        ))}
      </div>
    </>
  );
};

export default BoxStepItem;

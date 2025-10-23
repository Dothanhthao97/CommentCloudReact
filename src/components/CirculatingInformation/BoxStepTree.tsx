// components/UserNode.tsx
import React from "react";
import { StepItem } from "../utils/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi"; // ngôn ngữ tiếng Việt

type BoxStepItemProps = {
  user: StepItem;
  level?: number;
  GetSubmitActionBgClass: (status: number, submitActionId: number) => string;
};

const BoxStepItem: React.FC<BoxStepItemProps> = ({
  user,
  level = 0,
  GetSubmitActionBgClass,
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
        <div className="flex gap-2 justify-between items-center w-full">
          {/* LEFT */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src={user.AssignUserAvatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col min-w-0 max-w-[calc(100%-40px)]">
              <p className="text-sm font-medium text-[#202020] truncate">
                {user.AssignUserName}
              </p>
              <span className="text-xs text-[#6d6d6d] text-[11px] truncate">
                {user.AssignPositionTitle}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex gap-1 flex-col flex-shrink-0 items-end">
            <span
              className={`text-xs text-center whitespace-nowrap rounded-[5px] py-[3px] px-[20px] text-[12px] ${GetSubmitActionBgClass(
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
            GetSubmitActionBgClass={GetSubmitActionBgClass}
          />
        ))}
      </div>
    </>
  );
};

export default BoxStepItem;

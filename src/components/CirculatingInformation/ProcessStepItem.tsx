import React from "react";
import { StepItem } from "../utils/types";
import BoxStepItem from "./BoxStepTree";

type ProcessStepProps = {
  Step: number;
  Status: number;
  Title: string;
  users: StepItem[];
};

const ProcessStepItem: React.FC<ProcessStepProps> = ({
  Step,
  Title,
  Status,
  users,
}) => {
  function GetSubmitActionBgClass(
    status: number,
    submitActionId: number
  ): string {
    if (status === 0) return "text-[#DBA410] bg-[#FEEDBB]"; //yellow
    if (status === 1) {
      if (submitActionId === 4 || submitActionId === 5)
        return "text-[#EB342E] bg-[#FFCBCB]"; //red
      if (submitActionId === 2) return "text-[#03b400] bg-[#DCFFDA]"; //green
      return "text-[#005FD4] bg-[#D1E9FF]"; //light blue
    }
    return "bg-gray-100"; //gray
  }

  const getStepBgClass = (status: number, submitActionId: number): string => {
    if (status === 1 && submitActionId === 5) return "text-[#D1E9FF] beforeRed";
    if (status === 1) return "text-[#D1E9FF] beforeGreen";
    if (status === 0) return "text-[#FEEDBB] beforeYellow";
    return "bg-gray-100";
  };
  const representativeUser = users.find((u) => u.ParentId === null);
  const submitActionId = representativeUser?.SubmitActionId ?? 0;

  const buildUserTree = (users: StepItem[]): StepItem[] => {
    const map = new Map<string, StepItem>();
    const roots: StepItem[] = [];

    // Bước 1: Tạo map tất cả user với children rỗng
    users.forEach((user) => {
      map.set(String(user.ID), { ...user, children: [] });
    });

    // Bước 2: Gắn children và phân loại node gốc0
    users.forEach((user) => {
      const parentId = user.ParentId;
      const currentUser = map.get(String(user.ID));

      if (parentId != null && map.has(String(parentId))) {
        map.get(String(parentId))!.children!.push(currentUser!);
      } else {
        roots.push(currentUser!);
      }
    });

    // Sắp xếp theo thời gian tạo (nếu cần)
    const sortByCreateDesc = (items: StepItem[]) => {
      items.sort(
        (a, b) => new Date(a.Created).getTime() - new Date(b.Created).getTime()
      );
      items.forEach((item) => {
        item.children && sortByCreateDesc(item.children);
      });
    };

    sortByCreateDesc(roots);
    return roots;
  };

  const userTree = buildUserTree(users);

  return (
    <li className="m rounded-md relative before:content-[''] last:before:content-none before:absolute before:w-px before:h-full before:bg-gray-200 before:top-[15px] before:left-2 before:z-0">
      <div className="flex items-center gap-3.5">
        <div
          className={`ic-step py-1 bg-white relative z-10 ${getStepBgClass(
            Status,
            submitActionId
          )}`}
          title="No process"
        ></div>
        <div className="font-semibold text-[16px] text-black truncate">
          {Title}
        </div>
      </div>

      <div className="pl-[30px]">
        {userTree.map((user) => (
          <BoxStepItem
            key={user.ID}
            user={user}
            GetSubmitActionBgClass={GetSubmitActionBgClass}
          />
        ))}
      </div>
    </li>
  );
};

export default ProcessStepItem;

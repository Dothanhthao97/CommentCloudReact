import React, { useEffect, useState } from "react";
import ProcessStepItem from "./ProcessStepItem";
import { getAPI } from "../../services/api/GetAPI";
import HeaderToggle from "../ui/Toggle/HeaderToggle";
import { GroupedIDStep, StepItem } from "../utils/types";

function ProcessTimeline() {
  const [steps, setSteps] = useState<GroupedIDStep[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Khi gửi comment giữ nguyên trạng thái mở/đóng
  const [isProcessTimeline, setIsProcessTimeline] = useState(true);

  function groupByConsecutiveSteps(items: StepItem[]): GroupedIDStep[] {
    const grouped: GroupedIDStep[] = [];

    for (let i = 0; i < items.length; i++) {
      const current = items[i];
      const lastGroup = grouped[grouped.length - 1];

      if (
        lastGroup &&
        lastGroup.Step === current.Step &&
        lastGroup.Title === current.Title
      ) {
        lastGroup.users.push(current);
      } else {
        grouped.push({
          ID: current.ID,
          Step: current.Step,
          Title: current.Title,
          Status: current.Status,
          users: [current],
        });
      }
    }

    return grouped;
  }

  async function getDataComment() {
    // 2) Lấy dữ liệu BẰNG getAPI
    const res: any = await getAPI(
      `/support/_layouts/15/FN.DPM.API/Mobile/WorkflowRequest.ashx`,
      {
        func: "getHistory",
        lid: 1066,
        rid: 25927,
      }
    );
    //console.log("API Thông tin luân chuyển:", res);
    if (res?.status !== "SUCCESS") {
      setError(res?.mess?.Value || "Không có dữ liệu");
      return;
    }
    const groupedSteps = groupByConsecutiveSteps(res.data);
    setSteps(groupedSteps);
  }

  useEffect(() => {
    getDataComment();
  }, []);

  return (
    <HeaderToggle
      title="Thông tin luân chuyển"
      className="pl-2.5"
      showButton
      isOpen={isProcessTimeline}
      onToggle={setIsProcessTimeline}
      BoxclassName="ProcessTimeline"
    >
      <ul className="flex flex-col gap-3.5 pl-3 pt-4">
        {steps.map((step) => (
          <ProcessStepItem
            key={step.ID}
            Step={step.Step}
            Title={step.Title}
            users={step.users}
            Status={step.Status}
          />
        ))}
      </ul>
    </HeaderToggle>
  );
}

export default ProcessTimeline;

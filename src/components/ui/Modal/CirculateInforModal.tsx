import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { getAPI } from "../../../services/api/GetAPI";
import CirculateTableRow from "./CirculateTableRow";
import { StepItem } from "../../utils/types";

type DataTreeNode = {
  ID: string;
  ParentId: string | null;
};

const CirculateInforHeaders = [
  { label: "Tên bước", className: "w-[10%]" },
  { label: "", className: "w-[25px]" },
  { label: "Người thực hiện", className: "w-[19%]" },
  { label: "Gửi đến", className: "w-[19%]" },
  { label: "Ngày bắt đầu", className: "w-[11%]" },
  { label: "Hạn hoàn thành", className: "w-[11%]" },
  { label: "Ngày hoàn thành", className: "w-[11%]" },
  { label: "Hành động", className: "w-[15%]" },
  { label: "Ý kiến", className: "w-[15%]" },
];

const CirculateInforModal = () => {
  const [parentSteps, setParentSteps] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [rootSteps, setRootSteps] = useState<StepItem[]>([]);

  // Hàm xử lý class theo status
  const GetSubmitActionBgClass = (status: number, submitActionId: number) => {
    if (status === 1) return "bg-green-100";
    if (submitActionId === 2) return "bg-yellow-100";
    return "";
  };

  // Lấy các user có cùng ParentId
  function printTreeNonRecursiveSimple(data: DataTreeNode[]): string[] {
    const childrenMap = new Map<string | null, DataTreeNode[]>();
    data.forEach((item) => {
      const list = childrenMap.get(item.ParentId) || [];
      list.push(item);
      childrenMap.set(item.ParentId, list);
    });

    const queue: Array<{ node: DataTreeNode; level: number }> = [];
    const orderedIds: string[] = [];

    (childrenMap.get(null) || []).forEach((node) => {
      queue.push({ node, level: 0 });
    });

    while (queue.length > 0) {
      const { node, level } = queue.shift()!;
      orderedIds.push(node.ID); // ✅ lưu ID theo thứ tự phân cấp
      (childrenMap.get(node.ID) || []).forEach((child) => {
        queue.push({ node: child, level: level + 1 });
      });
    }

    return orderedIds;
  }

  // Hàm xử lý getAPI
  async function getDataComment() {
    const res: any = await getAPI(
      `/support/_layouts/15/FN.DPM.API/Mobile/WorkflowRequest.ashx`,
      {
        func: "getHistory",
        lid: 1066,
        rid: 124818,
      }
    );
    console.log("API popup Thông tin luân chuyển:", res);

    if (res?.status !== "SUCCESS") {
      setError(res?.mess?.Value || "Không có dữ liệu");
    } else {
      //Lay danh sach gốc
      const rootData = res.data?.slice().reverse() || [];
      setRootSteps(rootData);
      console.log("RootSteps", rootData);

      // Lay danh sach cha
      const parents = rootData.filter(
        (step: StepItem) => step.ParentId == null
      );
      setParentSteps(parents);
    }
  }
  useEffect(() => {
    getDataComment();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table
        className="table-fixed"
        headers={CirculateInforHeaders}
        tbody={
          error ? (
            <tr>
              <td colSpan={8} className="text-red-500 text-center py-3">
                {error}
              </td>
            </tr>
          ) : parentSteps.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-gray-500 text-center py-3">
                Đang tải...
              </td>
            </tr>
          ) : (
            parentSteps.map((step, index) => (
              <React.Fragment key={step.ID}>
                <tr className={`item`} data-step={step.Step}>
                  <td className={`py-[8px] ${index === 0 ? "pt-[16px]" : ""}`}>
                    {step.Action}
                  </td>
                  <td
                    className={`item-icon py-[8px] ${step.Status} ${
                      index === 0 ? "pt-[16px]" : ""
                    }`}
                  ></td>
                  <td
                    className={`item-child py-[8px] ${
                      index === 0 ? "pt-[16px]" : ""
                    }`}
                    colSpan={7}
                  >
                    <Table
                      className="border border-[#d1e9ff] text-sm text-left tb-child table-fixed w-full"
                      tbody={[
                        <CirculateTableRow
                          key={step.ID}
                          user={step} // ✅ dòng cha
                          //getSubmitActionBgClass={getSubmitActionBgClass}
                        />,
                        ...rootSteps
                          .filter((subStep) => subStep.ParentId === step.ID)
                          .map((subStep) => (
                            <CirculateTableRow
                              key={subStep.ID}
                              user={subStep} // ✅ dòng con
                              //getSubmitActionBgClass={getSubmitActionBgClass}
                            />
                          )),
                      ]}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))
          )
        }
      />
    </div>
  );
};

export default CirculateInforModal;

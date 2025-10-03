import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderToggle from "../ui/Toggle/HeaderToggle";
import FieldBox from "../form/FieldBox";
import {
  fetchFormStructureRequest,
  fetchFormDataRequest,
  fetchSetItemID,
  fetchSetListID,
} from "../../store/system/systemSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

// Hàm xử lý chuỗi (bạn có thể để ngoài file hoặc trong component)
function cleanValue(raw: string): string {
  if (!raw) return "";
  const parts = raw.split(";#");
  const filtered = parts.filter((p) => p.trim() !== "");
  return filtered.length > 0 ? filtered[filtered.length - 1] : raw;
}

function FormComment() {
  const [isFormCommentOpen, setIsFormCommentOpen] = useState(false);
  const [formValues, setFormValues] = React.useState<{ [key: string]: any }>(
    {}
  );
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery();
  const ListID = useSelector((state: RootState) => state.formComment.ListID);
  const ItemID = useSelector((state: RootState) => state.formComment.ItemID);
  const {
    titleForm,
    fieldsGroup,
    formData,
    loadingStructure,
    loadingData,
    errorStructure,
    errorData,
  } = useSelector((state: RootState) => state.formComment);

  useEffect(() => {
    const itemID = query.get("ItemId"); // chú ý viết hoa chữ I, chữ d thường
    const listID = query.get("LId");

    // console.log("ItemID from URL:", itemID);
    // console.log("ListID from URL:", listID);

    if (itemID) dispatch(fetchSetItemID(Number(itemID)));
    if (listID) dispatch(fetchSetListID(listID));
  }, [dispatch, query]);

  useEffect(() => {
    if (ListID && ItemID) {
      dispatch(fetchFormStructureRequest());
      dispatch(fetchFormDataRequest());
    }
  }, [dispatch, ListID, ItemID]);

  if (loadingStructure || loadingData) return <p>Đang tải biểu mẫu...</p>;
  if (errorStructure) return <p>Lỗi cấu trúc: {errorStructure}</p>;
  if (errorData) return <p>Lỗi dữ liệu: {errorData}</p>;
  return (
    <>
      <HeaderToggle
        title={titleForm}
        isOpen={isFormCommentOpen}
        onToggle={setIsFormCommentOpen}
        BoxclassName="BoxComment"
      >
        <div className="py-3 pl-0 pr-3">
          <div className="flex flex-col gap-4">
            {fieldsGroup.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`} className="group flex gap-3">
                {group.map((field, fieldIndex) => {
                  const rawValue = formValues[field.internalName];
                  const value =
                    typeof rawValue === "string"
                      ? rawValue
                      : rawValue?.Text ?? "";
                  const cleanData = cleanValue(value);
                  return (
                    <div
                      key={`field-${groupIndex}-${fieldIndex}`}
                      className="w-full"
                    >
                      <FieldBox
                        fieldName={field.internalName || ""}
                        labelName={field.Title || field.internalName}
                        formLayout="verticalForm"
                        value={value}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            [field.internalName]: e.target.value,
                          }))
                        }
                        isRequired={field?.parsedOption?.Require === true}
                        field={field}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      </HeaderToggle>
    </>
  );
}

export default FormComment;

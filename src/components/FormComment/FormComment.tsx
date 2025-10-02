import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderToggle from "../ui/Toggle/HeaderToggle";
import FieldBox from "../form/FieldBox";
import {
  fetchFormStructureRequest,
  fetchFormDataRequest,
} from "../../store/system/systemSlice";
import type { RootState, AppDispatch } from "../../store/store";

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
  const ranOnce = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    titleForm,
    fieldsGroup,
    formData,
    loadingStructure,
    loadingData,
    errorStructure,
    errorData,
  } = useSelector((state: RootState) => state.formComment);

  React.useEffect(() => {
    console.log("FormComment mounted");
    return () => console.log("FormComment unmounted");
  }, []);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    dispatch(fetchFormStructureRequest());
    dispatch(fetchFormDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (formData?.ItemInfo) {
      console.log("Set formValues to:", formData.ItemInfo);
      setFormValues(formData.ItemInfo);
    }
  }, [formData]);

  if (loadingStructure || loadingData) return <p>Đang tải biểu mẫu...</p>;
  if (errorStructure) return <p>Lỗi cấu trúc: {errorStructure}</p>;
  if (errorData) return <p>Lỗi dữ liệu: {errorData}</p>;

  return (
    <HeaderToggle
      title={titleForm}
      isOpen={isFormCommentOpen}
      onToggle={setIsFormCommentOpen}
    >
      <div className="p-4">
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
  );
}

export default FormComment;

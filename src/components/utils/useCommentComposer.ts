//useCommentComposer.ts
import React from "react";
import axios, { AxiosRequestConfig } from "axios";

import type { UploadedFile } from "./types";
import { plainToHtml, htmlToPlain } from "./editor.utils";
import { addPickedFiles, removeItemById, revokeAll } from "./uploads.utils";
import type { AddCommentEnvelope, AddCommentPayload } from "./AddComment-types";
import PostAPI, { PostAPIWithFormData } from "../../services/api/PostAPI";
import { useAppSelector } from "../../store/hook";

type CommentContext = {
  rid: number;
  resourceCategoryId: number;
  resourceSubCategoryId: number;
  otherResourceId?: string;
};

type Options = CommentContext & {
  onSend?: (
    content: string,
    envelope?: AddCommentEnvelope,
    fileNames?: string[]
  ) => Promise<void> | void;
  preferHtml?: boolean;
  replyId?: string | null;
};

export function useCommentComposer({
  rid,
  resourceCategoryId,
  resourceSubCategoryId,
  onSend,
  preferHtml = false,
  replyId,
}: //otherResourceId,
Options) {
  const reduxOtherResourceId = useAppSelector(
    (state) => state.comment.otherResourceId
  );
  //console.log(">>>reduxOtherResourceId:", reduxOtherResourceId);

  const [text, setText] = React.useState("");
  const [uploaded, setUploaded] = React.useState<UploadedFile[]>([]);
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [richHtml, setRichHtml] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const toggleEditor = React.useCallback(() => {
    setIsEditorOpen((prev) => {
      if (!prev) setRichHtml(plainToHtml(text));
      else setText(htmlToPlain(richHtml));
      return !prev;
    });
  }, [text, richHtml]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file); // đọc toàn bộ nội dung file
    });
  };

  const handlePickFiles = React.useCallback(async (files: File[]) => {
    console.log(
      "🚀 Files được chọn:",
      files.map((f) => f.name)
    );
    if (!files?.length) return;

    const newFiles = await Promise.all(
      files.map(async (file) => ({
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
        base64: await fileToBase64(file),
      }))
    );

    setUploaded((prev) => [...prev, ...newFiles]);
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setUploaded((prev) => removeItemById(prev, id));
  }, []);

  const clearAll = React.useCallback(() => {
    setUploaded((prev) => {
      revokeAll(prev);
      return [];
    });
  }, []);

  React.useEffect(() => () => revokeAll(uploaded), [uploaded]);

  const handleSend = React.useCallback(
    async (contentOverride?: string) => {
      console.log("handleSend được gọi, content:", contentOverride);
      const content =
        contentOverride ??
        (preferHtml
          ? isEditorOpen
            ? richHtml
            : text
          : isEditorOpen
          ? htmlToPlain(richHtml)
          : text);

      if (!content?.trim()) return;

      try {
        setSending(true);

        const payload: AddCommentPayload = {
          Content: content,
          OtherResourceId: reduxOtherResourceId ?? undefined, // ưu tiên lấy từ redux
          ParentCommentId: replyId || undefined,
          ResourceCategoryId: resourceCategoryId,
          ResourceSubCategoryId: resourceSubCategoryId,

          Files:
            uploaded.length > 0
              ? uploaded.map((f) => ({
                  Name: f.file.name,
                  Base64: f.base64?.split(",")[1] || "", // đảm bảo không undefined
                }))
              : null,
        };
        const Files =
          uploaded.length > 0
            ? uploaded.map((f) => ({
                Name: f.file.name,
                Base64: f.base64?.split(",")[1] || "", // đảm bảo không undefined
              }))
            : null;

        // console.log(
        //   "🚀 Files gửi lên server:",
        //   uploaded.map((f) => ({
        //     Name: f.file.name,
        //     Base64: f.base64?.split(",")[1] || "",
        //   }))
        // );
        if (!reduxOtherResourceId) {
          console.warn("Thiếu otherResourceId, không thể gửi bình luận.");
          return;
        }

        const formData = new FormData();
        formData.set("data", JSON.stringify(payload));

        if (Files) {
          formData.set("Files", JSON.stringify(Files));
        }
        const response = await PostAPIWithFormData(
          `/support/_layouts/15/FN.DPM.API/Mobile/Social.ashx?func=ADDCOMMENT&rid=${rid}`,
          formData
        );

        //const res = await axios.request<AddCommentEnvelope>(response);
        const envelope = response as AddCommentEnvelope;
        //console.log("API trả về:", envelope);

        if (response.status === "SUCCESS") {
          await onSend?.(
            content,
            envelope,
            uploaded.map((f) => f.file.name) // truyền mảng tên file
          );
          setText("");
          setRichHtml("");
          clearAll();
          setIsEditorOpen(false);
          console.log(envelope);
        } else {
          console.warn(
            "Send failed:",
            envelope.mess?.Value || JSON.stringify(envelope)
          );
        }
      } finally {
        setSending(false);
      }
    },
    [
      preferHtml,
      isEditorOpen,
      richHtml,
      text,
      rid,
      resourceCategoryId,
      resourceSubCategoryId,
      reduxOtherResourceId,
      replyId,
      onSend,
      clearAll,
      uploaded,
    ]
  );

  return {
    // state
    text,
    setText,
    uploaded,
    isEditorOpen,
    richHtml,
    setRichHtml,
    sending,

    // handlers
    toggleEditor,
    handlePickFiles,
    removeItem,
    clearAll,
    handleSend,
  };
}

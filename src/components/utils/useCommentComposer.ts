import React from "react";
import axios, { AxiosRequestConfig } from "axios";

import type { UploadedFile } from "./types";
import { plainToHtml, htmlToPlain } from "./editor.utils";
import { addPickedFiles, removeItemById, revokeAll } from "./uploads.utils";
import type { AddCommentEnvelope, AddCommentPayload } from "./AddComment-types";

type CommentContext = {
  rid: number;
  resourceCategoryId: number;
  resourceSubCategoryId: number;
  otherResourceId: string;
};

type Options = CommentContext & {
  onSend?: (content: string, envelope?: AddCommentEnvelope) => Promise<void> | void;
  /** Nếu backend nhận HTML, bật cờ này để gửi HTML khi editor mở */
  preferHtml?: boolean;
  replyId?: string | null;
};

export function useCommentComposer({
  rid,
  resourceCategoryId,
  resourceSubCategoryId,
  otherResourceId,
  onSend,
  preferHtml = false,
  replyId,
}: Options) {
  const [text, setText] = React.useState("");
  const [uploaded, setUploaded] = React.useState<UploadedFile[]>([]);
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [richHtml, setRichHtml] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const toggleEditor = React.useCallback(() => {
    setIsEditorOpen(prev => {
      if (!prev) setRichHtml(plainToHtml(text));
      else setText(htmlToPlain(richHtml));
      return !prev;
    });
  }, [text, richHtml]);

  const handlePickFiles = React.useCallback((files: File[]) => {
    if (!files?.length) return;
    setUploaded(prev => addPickedFiles(prev, files));
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setUploaded(prev => removeItemById(prev, id));
  }, []);

  const clearAll = React.useCallback(() => {
    setUploaded(prev => { revokeAll(prev); return []; });
  }, []);

  React.useEffect(() => () => revokeAll(uploaded), [uploaded]);

  const handleSend = React.useCallback(
    async (contentOverride?: string) => {
      const content = contentOverride ??
        (preferHtml
          ? (isEditorOpen ? richHtml : text)
          : (isEditorOpen ? htmlToPlain(richHtml) : text));

      if (!content?.trim()) return;

      try {
        setSending(true);

        const payload: AddCommentPayload = {
          content,
          otherResourceId,
          ParentCommentId: replyId || undefined,
          resourceCategoryId,
          resourceSubCategoryId,
          attachments: [], // Nếu bạn muốn gửi file thì map `uploaded` tại đây
        };

        const form = new URLSearchParams();
        form.set("data", JSON.stringify(payload));

        const config: AxiosRequestConfig = {
          method: "post",
          maxBodyLength: Infinity,
          url: `/api-social/qc/_layouts/15/FN.DPM.API/Mobile/Social.ashx?func=ADDCOMMENT&rid=${rid}`,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: form.toString(),
        };

        const res = await axios.request<AddCommentEnvelope>(config);
        const envelope = res.data;

        if (envelope.status === "SUCCESS") {
          await onSend?.(content, envelope);
          setText(""); setRichHtml(""); clearAll(); setIsEditorOpen(false);
        } else {
          console.warn("Send failed:", envelope.mess);
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
      otherResourceId,
      replyId,
      onSend,
      clearAll,
    ]
  );

  return {
    // state
    text, setText,
    uploaded,
    isEditorOpen, richHtml, setRichHtml,
    sending,

    // handlers
    toggleEditor, handlePickFiles, removeItem, clearAll, handleSend,
  };
}

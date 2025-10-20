// src/components/CommentBox/CommentComposer.tsx
import React, { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";
import BoxReply from "./BoxReply";
import { ReplyPreview } from "../utils/types";
import UploadFileButton from "../ui/Upload/UploadFileButton";
import UploadListFile from "../ui/Upload/UploadListFile";
import { useCommentComposer } from "../utils/useCommentComposer";
import TiptapEditor from "./ParagraphEditor/TiptapEditor";
import { AddCommentEnvelope } from "../utils/AddComment-types";
import { useAppSelector } from "../../store/hook";
import { RootState } from "../../store/store"; // đường dẫn đúng
interface CommentComposerProps {
  reply?: ReplyPreview | null;
  onCloseReply?: () => void;
  onSend?: (
    content: string,
    envelope?: AddCommentEnvelope,
    fileNames?: string[]
  ) => Promise<void> | void;
  //otherResourceId?: string | null;
}

import { useLocation } from "react-router-dom";
import { RichTextEditorRef } from "mui-tiptap";
import { forwardRef, useImperativeHandle } from "react";
//import { useMentionOptions } from "./mentionOptions";
const CommentComposer = forwardRef<RichTextEditorRef, CommentComposerProps>(
  ({ reply, onCloseReply, onSend }, ref) => {
    const reduxOtherResourceId = useAppSelector(
      (state) => state.comment.otherResourceId
    );
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const itemId = query.get("ItemId");
    const listId = query.get("LId");

    const {
      text,
      setText,
      uploaded,
      richHtml,
      setRichHtml,
      isEditorOpen,
      toggleEditor,
      sending,
      handlePickFiles,
      removeItem,
      clearAll,
      handleSend,
    } = useCommentComposer({
      rid: itemId ? parseInt(itemId, 10) : 0,
      resourceCategoryId: 8,
      resourceSubCategoryId: 9,
      otherResourceId: reduxOtherResourceId ?? undefined,
      onSend,
      replyId: reply?.id || null,
    });

    const [showToolbar, setShowToolbar] = React.useState(false);
    const inputRef = React.useRef<RichTextEditorRef>(null);

    const [htmlContent, setHtmlContent] = React.useState("");
    const [editorKey, setEditorKey] = useState(0);
    const [content, setContent] = useState("");

    // Forward the inputRef to parent
    useImperativeHandle(ref, () => inputRef.current as RichTextEditorRef, []);

    //Tính chiều cao fixedBoxComment
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = boxRef.current;
      if (!el) return;

      const updateHeight = () => {
        const height = el.offsetHeight;
        document.documentElement.style.setProperty(
          "--height-boxComment",
          `${height}px`
        );
      };

      updateHeight(); // Cập nhật lần đầu

      const observer = new ResizeObserver(() => {
        updateHeight();
      });

      observer.observe(el);

      return () => {
        observer.disconnect(); // Dọn dẹp khi component unmount
      };
    }, []);

    return (
      <div
        ref={boxRef}
        className="fixedBoxComment flex flex-col p-3 mt-3 shadow-md border border-[#eee] rounded-[10px] bg-white w-full"
      >
        {reply && (
          <BoxReply
            FullName={reply.fullName}
            Created={reply.created}
            Content={reply.content}
            onClose={onCloseReply}
          />
        )}

        <div
          id="boxEditorComt"
          className={`boxEditorComt flex justify-between w-full ${
            reply || isEditorOpen || uploaded.length > 0
              ? "flex-col "
              : "items-center gap-4"
          }`}
        >
          <div className="flex flex-1 flex-col [word-break:break-word]">
            <TiptapEditor
              ref={inputRef}
              key={editorKey}
              showToolbar={showToolbar}
              content={htmlContent}
              onUpdateContent={(html) => {
                setRichHtml(html);
                setHtmlContent(html);
              }}
            />
          </div>

          <div
            className={`flex gap-4 ${
              uploaded.length > 0 ? "flex-none justify-between" : "flex-col"
            }`}
          >
            <UploadListFile
              items={uploaded}
              onRemove={removeItem}
              onClear={clearAll}
            />

            <div className="flex items-center justify-end gap-4">
              <Button
                className={`btn-editor text-[#7D7D7D] hover:text-blue-600 ${
                  isEditorOpen ? "text-blue-600" : ""
                }`}
                icon="ic-editor text-[16px]"
                onClick={() => {
                  toggleEditor();
                  setShowToolbar((prev) => !prev);
                }}
              />

              <UploadFileButton
                accept="image/*,.pdf"
                multiple
                onPick={handlePickFiles}
              />

              <span className="inline-block w-[1px] h-[20px] bg-[#E9E9E9]" />

              <Button
                className="react-btn-send border text-[#3076FF] border-[#3076FF] rounded-[5px] px-9 py-2 hover:bg-blue-500 hover:text-white"
                text={sending ? "Đang gửi..." : "Gửi"}
                icon="ic-send text-[16px]"
                onClick={() => {
                  handleSend(htmlContent);
                  setHtmlContent("");
                  setEditorKey((prev) => prev + 1);
                }}
                disabled={sending}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CommentComposer;

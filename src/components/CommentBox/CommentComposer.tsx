import React, { useState, useEffect } from "react";

import Button from "../ui/Button";
import BoxReply from "./BoxReply";
import { ReplyPreview } from "../utils/types";
import UploadFileButton from "../ui/Upload/UploadFileButton";
import UploadListFile from "../ui/Upload/UploadListFile";
import { useCommentComposer } from "../utils/useCommentComposer";
import TiptapEditor from "../form/ParagraphEditor/TiptapEditor";
import { AddCommentEnvelope } from "../utils/AddComment-types";

interface CommentComposerProps {
  reply?: ReplyPreview | null;
  onCloseReply?: () => void;
  onSend?: (
    content: string,
    envelope?: AddCommentEnvelope
  ) => Promise<void> | void;
}

const CommentComposer: React.FC<CommentComposerProps> = ({
  reply,
  onCloseReply,
  onSend,
}) => {
  const {
    text,
    setText,
    uploaded,
    richHtml,
    setRichHtml,
    isEditorOpen, // <-- lấy từ hook
    toggleEditor, // <-- lấy từ hook
    sending,
    handlePickFiles,
    removeItem,
    clearAll,
    handleSend,
  } = useCommentComposer({
    rid: 10470,
    resourceCategoryId: 8,
    resourceSubCategoryId: 9,
    otherResourceId: "5c2c1923-fad9-4c23-94b9-dc96a07c171d",

    onSend,
    replyId: reply?.id || null,
  });

  const [showToolbar, setShowToolbar] = React.useState(false);
  // const [editorState, setEditorState] = React.useState(
  //   EditorState.createEmpty()
  // );
  // const toggleToolbar = () => {
  //   setShowToolbar((prev) => !prev);
  // };

  const [htmlContent, setHtmlContent] = React.useState("");
  const [editorKey, setEditorKey] = useState(0);
  const [content, setContent] = useState("");

  const fakeMentions = [
    { id: "1", label: "Alice", url: "/profile/1" },
    { id: "2", label: "Bob", url: "/profile/2" },
    { id: "3", label: "Charlie", url: "/profile/3" },
  ];

  return (
    <div className="flex flex-col p-4 mt-4 shadow-md border border-[#eee] rounded-[10px] bg-white w-full">
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
        className={`boxEditorComt flex justify-between w-full gap-4 ${
          reply || isEditorOpen || uploaded.length > 0 ? "flex-col" : ""
        }`}
      >
        <div className="flex flex-1 flex-col [word-break:break-word]">
          <TiptapEditor
            key={editorKey}
            showToolbar={showToolbar}
            content={htmlContent}
            onUpdateContent={(html) => {
              setRichHtml(html);
              setHtmlContent(html);
            }}
            mentionSuggestions={fakeMentions} // 👈 truyền data giả ở đây
          />
        </div>

        <div
          className={`flex ${
            uploaded.length > 0 ? "flex-none ..." : "flex-col ..."
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
              className="btn-send p-1 border text-[#3076FF] border-[#3076FF] rounded-[5px] px-9 py-2 bg-white hover:bg-blue-500 hover:text-white"
              text={sending ? "Đang gửi..." : "Gửi"}
              icon="ic-send text-[16px]"
              onClick={() => {
                console.log("📄 Dữ liệu HTML:", htmlContent);
                handleSend(htmlContent);
                setHtmlContent(""); // reset content sau khi gửi
                setEditorKey((prev) => prev + 1);
              }}
              disabled={sending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComposer;

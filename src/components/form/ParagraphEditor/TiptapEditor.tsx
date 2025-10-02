import React, { useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import "./style.css";

import {
  MenuButtonAlignCenter,
  MenuButtonAlignJustify,
  MenuButtonAlignLeft,
  MenuButtonAlignRight,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonTaskList,
  MenuButtonUnderline,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { mentionSuggestionRenderer } from "./mentionExtension";

interface MentionSuggestion {
  id: string;
  label: string;
  url: string;
}

interface TiptapEditorProps {
  showToolbar: boolean;
  onUpdateContent: (html: string) => void;
  content?: string;
  mentionSuggestions?: MentionSuggestion[];
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  showToolbar,
  onUpdateContent,
  content = "",
  mentionSuggestions = [],
}) => {
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <>
      <RichTextEditor
        ref={rteRef}
        content={content}
        extensions={[
          StarterKit,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Mention.configure({
            HTMLAttributes: { class: "mention" },
            // ⬇️ Đây mới là dạng đúng của SuggestionOptions
            suggestion: {
              char: "@",
              startOfLine: false,
              items: ({ query }) =>
                mentionSuggestions
                  .filter((it) =>
                    it.label.toLowerCase().startsWith(query.toLowerCase())
                  )
                  .slice(0, 5),
              // ⬇️ truyền function, KHÔNG gọi ()
              render: mentionSuggestionRenderer,
            },
          }),
        ]}
        onUpdate={({ editor }) => {
          onUpdateContent(editor.getHTML());
        }}
        renderControls={
          showToolbar
            ? () => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  {/* <MenuDivider /> */}
                  <div className="border border-[#eee] rounded-md">
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    <MenuButtonUnderline />
                  </div>
                  <div className="border border-[#eee] rounded-md">
                    <MenuButtonAlignLeft />
                    <MenuButtonAlignCenter />
                    <MenuButtonAlignRight />
                    <MenuButtonAlignJustify />
                  </div>
                  <div className="border border-[#eee] rounded-md">
                    <MenuButtonBulletedList />
                    <MenuButtonOrderedList />
                    <MenuButtonIndent />
                    <MenuButtonUnindent />
                  </div>
                </MenuControlsContainer>
              )
            : undefined
        }
      />

      {/* Ví dụ: nút để test lấy HTML */}
      {/* <Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>
        Log HTML
      </Button> */}
    </>
  );
};

export default TiptapEditor;

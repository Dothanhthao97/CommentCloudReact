import React, { forwardRef, useImperativeHandle, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { FileHandler } from "./FileHandler";

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
import { getAPI } from "../../../services/api/GetAPI";
import { PluginKey } from "prosemirror-state";

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

const CustomMention = Mention.extend({
  addAttributes() {
    return {
      id: {},
      label: {},
      href: {}, // ✅ cần khai báo rõ ràng ở đây
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      {
        ...HTMLAttributes,
        href: node.attrs.href,
        class: "mention text-blue-600 hover:underline",
      },
      `@${node.attrs.label}`,
    ];
  },
});

const TiptapEditor = forwardRef<RichTextEditorRef, TiptapEditorProps>(
  (
    { showToolbar, onUpdateContent, content = "", mentionSuggestions = [] },
    ref
  ) => {
    const rteRef = useRef<RichTextEditorRef>(null);

    const mentionPluginKey = new PluginKey("mentionSuggestion");

    // Expose rteRef.current ra ngoài thông qua ref
    useImperativeHandle(ref, () => rteRef.current as RichTextEditorRef, []);

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

            CustomMention.configure({
              HTMLAttributes: {
                class: "mention text-blue-600 hover:underline",
              },
              suggestion: {
                char: "@",
                pluginKey: mentionPluginKey,
                allowSpaces: true,
                startOfLine: false,
                command: ({ editor, range, props }) => {
                  console.log("Mention selected:", editor, range, props);
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .insertContentAt(range.from, [
                      {
                        type: "mention",
                        attrs: {
                          ...props,
                          href: `/support/SitePages/ViewOrEditUser.aspx?IID=${props.id}`,
                        },
                      },
                      { type: "text", text: " " },
                    ])
                    .run();
                },
                items: async ({ query }) => {
                  // ... giữ nguyên
                  try {
                    const payload = {
                      Keyword: query || "",
                      ListStatus: "-2",
                    };

                    const res = await getAPI(
                      "/support/_layouts/15/FN.DPM.API/Mobile/UserGroup.ashx",
                      {
                        func: "searchUserAndGroup",
                        data: JSON.stringify({
                          Keyword: query || "",
                          ListStatus: "-2",
                        }),
                        type: 0,
                        limit: 10,
                        offset: 0,
                      },
                      {
                        withCredentials: true,
                      }
                    );
                    const dataBody = res.data;
                    //console.log("⚡️ Mention API trả về:", dataBody.Data);

                    const arr = dataBody?.Data ?? [];
                    if (!Array.isArray(arr)) {
                      console.warn(
                        "⚠️ Mention API trả về không đúng định dạng:",
                        res
                      );
                      return [];
                    }

                    return arr.map((item: any) => ({
                      id: item.ID,
                      label: item.Name || "Không tên",
                      url: `/profile/${item.ID}`,
                    }));
                  } catch (error) {
                    console.error("Lỗi khi gọi API mention:", error);
                    return [];
                  }
                },
                render: mentionSuggestionRenderer,
              },
            }),

            Placeholder.configure({
              placeholder: "Nhập bình luận...",
              emptyEditorClass: "tiptap-placeholder",
            }),
            Image.configure({
              allowBase64: true, // nếu bạn muốn paste ảnh dạng base64
            }),  
            FileHandler,

          ]}
          onUpdate={({ editor }) => {
            onUpdateContent(editor.getHTML());
          }}
          renderControls={
            showToolbar
              ? () => (
                  <MenuControlsContainer>
                    <MenuSelectHeading />
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
      </>
    );
  }
);
export default TiptapEditor;

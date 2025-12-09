import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export const FileHandler = Extension.create({
  name: "fileHandler",

  addProseMirrorPlugins() {
    const editor = this.editor;

    return [
      new Plugin({
        key: new PluginKey("fileHandler"),

        props: {
          handlePaste(view, event) {
            const items = event.clipboardData?.items;
            if (!items) return false;

            for (const item of items) {
              if (item.kind === "file") {
                const file = item.getAsFile();
                if (file && file.type.startsWith("image/")) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    editor
                      .chain()
                      .focus()
                      .setImage({ src: reader.result as string })
                      .run();
                  };
                  reader.readAsDataURL(file);

                  return true; // đã xử lý rồi
                }
              }
            }

            return false;
          },

          handleDrop(view, event) {
            const files = event.dataTransfer?.files;
            if (!files || files.length === 0) return false;

            for (const file of files) {
              if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = () => {
                  editor
                    .chain()
                    .focus()
                    .setImage({ src: reader.result as string })
                    .run();
                };
                reader.readAsDataURL(file);

                return true;
              }
            }

            return false;
          },
        },
      }),
    ];
  },
});

import tippy, { Instance, Props } from "tippy.js";
//import { Instance, Props } from "tippy.js";
import "tippy.js/dist/tippy.css";

export function mentionSuggestionRenderer() {
  let component: HTMLDivElement | null = null;
  let popup: Instance<Props> | null = null;
  let selectedIndex = 0;

  function updateComponent(props: any) {
  if (!component) return;

  component.innerHTML = "";

  props.items.forEach((item: any, i: number) => {
    const div = document.createElement("div");
    div.className = `mention-item ${i === selectedIndex ? "selected" : ""}`;
    div.textContent = item.label;
    div.addEventListener("click", () => props.command(item));
    component!.appendChild(div); // dùng non-null assertion
  });
}

  return {
    onStart(props: any) {
      component = document.createElement("div");
      component.className = "mention-dropdown";
      selectedIndex = 0;
      updateComponent(props);

      const instance = tippy(document.body, {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });

      // tippy() có thể trả về array hoặc instance
      popup = Array.isArray(instance) ? instance[0] : instance;
    },

    onUpdate(props: any) {
      updateComponent(props);
      popup?.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown(props: any) {
      const event = props.event;

      if (event.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % props.items.length;
        updateComponent(props);
        return true;
      }
      if (event.key === "ArrowUp") {
        selectedIndex =
          (selectedIndex - 1 + props.items.length) % props.items.length;
        updateComponent(props);
        return true;
      }
      if (event.key === "Enter") {
        props.command(props.items[selectedIndex]);
        return true;
      }
      if (event.key === "Escape") {
        popup?.hide();
        return true;
      }
      return false;
    },

    onExit() {
      popup?.destroy();
      popup = null;
      component = null;
    },
  };
}

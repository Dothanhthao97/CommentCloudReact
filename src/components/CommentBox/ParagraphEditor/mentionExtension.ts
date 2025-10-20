import tippy, { Instance, Props } from "tippy.js";
import "tippy.js/dist/tippy.css";

export function mentionSuggestionRenderer() {
  let component: HTMLDivElement | null = null;
  let popup: Instance<Props> | null = null;
  let selectedItemLabels: Set<string> = new Set();
  let selectedIndex = -1;

  // ✅ Thêm biến để lưu props từ onUpdate
  let lastProps: any = null;

  function getNextSelectableIndex(
    items: any[],
    start: number,
    direction: 1 | -1
  ): number {
    const total = items.length;
    if (total === 0) return -1;

    let i = start;
    let count = 0;

    while (count < total) {
      // tiến tới index kế tiếp
      i = (i + direction + total) % total;

      // nếu chưa chọn thì return
      if (!selectedItemLabels.has(items[i].label)) {
        console.log("✅ Next selectable:", i, items[i].label);
        return i;
      }

      count++;
    }

    console.warn("⚠️ Không còn item nào để chọn");
    return -1;
  }

  function updateComponent(props: any) {
    console.log("🔥 onUpdate gọi, props.items:", props.items);
    if (!component) return;
    component.innerHTML = "";

    props.items.forEach((item: any, i: number) => {
      const div = document.createElement("div");
      if (i === selectedIndex) {
        console.log("🎯 Render highlight for index", i, "label:", item.label);
      }

      div.className = `mention-item ${
        i === selectedIndex ? "highlighted" : ""
      } ${selectedItemLabels.has(item.label) ? "selected" : ""}`;
      div.textContent = item.label;

      div.addEventListener("click", () => {
        if (selectedItemLabels.has(item.label)) return; // ✅ Không cho chọn lại
        selectedItemLabels.add(item.label);
        selectedIndex = i;
        props.command(item);
      });

      component!.appendChild(div);
    });
  }

  return {
    onStart(props: any) {
      component = document.createElement("div");
      component.className = "mention-dropdown";
      selectedIndex = -1;
      // ✅ Lưu lại props để dùng sau
      lastProps = props;

      const lastLabel = Array.from(selectedItemLabels).at(-1);
      if (lastLabel) {
        const foundIndex = props.items.findIndex(
          (item: any) => item.label === lastLabel
        );
        selectedIndex =
          foundIndex !== -1
            ? getNextSelectableIndex(props.items, foundIndex, 1)
            : -1;
      }

      const instance = tippy(document.body, {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });

      popup = Array.isArray(instance) ? instance[0] : instance;
    },

    onUpdate(props: any) {
      lastProps = props;
      // Nếu chưa có selectedIndex hợp lệ thì tìm item chưa chọn
      if (selectedIndex === -1) {
        selectedIndex = getNextSelectableIndex(props.items, 0, 1);
      }

      updateComponent(lastProps);
      popup?.setProps({
        getReferenceClientRect: lastProps.clientRect,
        content: component ?? "", // đủ rồi
      });
    },

    onKeyDown(props: any) {
      console.log("✅ onKeyDown triggered:", props.event.key);
      console.log("📦 props:", props);
      const event = props.event;
      const items = lastProps?.items ?? [];
      const command = lastProps?.command;
      if (!items || items.length === 0) return false;

      if (event.key === "ArrowDown") {
        // ✅ Nếu lần đầu, bắt đầu từ 0
        selectedIndex =
          selectedIndex < 0
            ? getNextSelectableIndex(items, 0, 1)
            : getNextSelectableIndex(items, selectedIndex, 1);

        console.log("🔽 New selectedIndex:", selectedIndex);
        updateComponent(lastProps);
        popup?.setProps({
          getReferenceClientRect: lastProps.clientRect,
          content: component ?? "",
        });
        event.preventDefault();
        return true;
      }

      if (event.key === "ArrowUp") {
        selectedIndex =
          selectedIndex < 0
            ? getNextSelectableIndex(items, items.length - 1, -1)
            : getNextSelectableIndex(items, selectedIndex, -1);

        updateComponent(lastProps);
        popup?.setProps({
          getReferenceClientRect: lastProps.clientRect,
          content: component ?? "", // đủ rồi
        });
        event.preventDefault();
        return true;
      }

      if (event.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          const selectedItem = items[selectedIndex];
          if (!selectedItemLabels.has(selectedItem.label)) {
            selectedItemLabels.add(selectedItem.label);
            command?.(selectedItem);
          }
          event.preventDefault();
          event.stopPropagation();
          return true;
        }
      }

      if (event.key === "Escape") {
        popup?.hide();
        event.preventDefault();
        return true;
      }

      return false;
    },

    onExit() {
      popup?.destroy();
      popup = null;
      component = null;
      selectedIndex = -1;
      lastProps = null; // ✅ reset cache
    },
  };
}

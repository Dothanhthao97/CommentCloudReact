import React, { useState } from "react";
import Button from "../ui/Button";
import { BoxReplyProps } from "../utils/types";

// mở rộng props để có defaultOpen & animate
type Props = BoxReplyProps & {
  defaultOpen?: boolean; // mặc định mở
  animate?: boolean; // bật/tắt animation
};

// Kiểm tra xem có phải HTML thật hay không (markup)
const isRealHtml = (input: string) => {
  if (!input) return false;

  // Nếu string chứa &lt; &gt; thì chắc chắn KHÔNG phải HTML thật
  if (input.includes("&lt;") || input.includes("&gt;")) return false;

  const doc = new DOMParser().parseFromString(input, "text/html");

  // HTML thật nếu có ít nhất 1 ELEMENT_NODE
  return Array.from(doc.body.childNodes).some(
    (node) => node.nodeType === 1
  );
};

// Loại bỏ thẻ HTML → lấy text
const stripHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const BoxReply: React.FC<Props> = (props) => {
  const {
    FullName,
    Created,
    Content,
    onClose,
    defaultOpen = true,
    animate = true,
  } = props;

  const [visible, setVisible] = useState(defaultOpen); // khi false -> unmount
  const [closing, setClosing] = useState(false);

  if (!visible) return null;

  const handleClose = () => {
    onClose?.(); // báo parent (nếu cần)
    if (animate) setClosing(true);
    else setVisible(false);
  };

   // Tự động phân loại nội dung
  const realHtml = isRealHtml(Content);
  const plainText = realHtml ? stripHtml(Content) : Content;

  return (
    <div
      className={[
        "box-reply inline-flex flex-col items-start justify-between gap-2.5 flex-wrap w-fit md:max-w-[50%] max-w-full mb-2.5",
        "rounded-[5px] bg-white p-2.5 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] leading-[normal]",
        animate ? "overflow-hidden transition-all duration-200" : "",
        animate
          ? closing
            ? "opacity-0 max-h-0"
            : "opacity-100 max-h-[400px]"
          : "",
      ].join(" ")}
      onTransitionEnd={() => {
        if (closing) setVisible(false); // ẩn xong -> unmount
      }}
    >
      <div className="flex items-center justify-between w-full gap-2.5">
        <div className="flex items-center gap-2.5">
          <a
            href="#"
            target="_blank"
            aria-label={`View profile of ${FullName}`}
            className="text-[12px]"
          >
            {FullName}
          </a>
          <span className="text-[11px] text-[#7D7D7D]">
            {new Date(Created).toLocaleString()}
          </span>
        </div>

        {/* dùng handleClose để chạy logic đóng + animate */}
        <Button
          type="button"
          className="ic-close font-bold text-[14px] text-[#7D7D7D] hover:text-blue-500"
          onClick={handleClose}
          aria-label="Đóng trích dẫn"
        />
      </div>

      <div className="block w-full">
        {realHtml ? (
          // TH: nội dung là HTML thật (h3, p, strong...) → bỏ tag, hiển thị text
          <div className="block text-[13px] text-[#202020] whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {plainText}
          </div>
        ) : (
          // TH: nội dung là text có <script> hoặc html thô → hiển thị nguyên dạng
          <span className="textHtml" dangerouslySetInnerHTML={{ __html: Content }} />
        )}
      </div>
    </div>
  );
};

export default BoxReply;

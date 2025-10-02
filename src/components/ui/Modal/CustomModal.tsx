import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: string; // Tailwind class, ví dụ: "max-w-2xl"
  title?: React.ReactNode;
  children?: React.ReactNode;
};

export default function CustomModal({
  isOpen,
  onClose,
  size = "max-w-md",
  title,
  children,
}: CustomModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Modal wrapper */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Modal content */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${size} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title
                  as="div"
                  className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  <h3>{title || "Modal title"}</h3>
                  <Button
                    className="inline-flex justify-center rounded-md border border-transparent px-2 py-2 text-sm font-medium text-[#202020] hover:bg-blue-100"
                    onClick={onClose}
                    icon="ic-close text-[16px]"
                  />
                </Dialog.Title>
                <div className="mt-2">
                  {children || "Modal content goes here."}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

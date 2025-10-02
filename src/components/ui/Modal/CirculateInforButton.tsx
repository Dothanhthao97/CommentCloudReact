import React, { useState } from "react";
import Button from "../Button";
import CustomModal from "./CustomModal";
import CirculateInforModal from "./CirculateInforModal";

type CirculateInforButtonProps = {
  className?: string;
};

const CirculateInforButton: React.FC<CirculateInforButtonProps> = ({
  className,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        className={className}
        icon="ic-transfer-inform text-[18px] text-[#54CFFF] hover:text-[#0095FF]"
        onClick={() => setModalOpen(true)}
      />
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        size="max-w-full"
        title="Thông tin luân chuyển"
      >
        <CirculateInforModal />
      </CustomModal>
    </>
  );
};

export default CirculateInforButton;

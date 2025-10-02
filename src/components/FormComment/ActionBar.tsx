import React from "react";
import Button from "../ui/Button";

export type ActionItem = {
  id: string;
  icon?: string | React.ReactNode;
  text?: string;
  className?: string;
  classText?: string;
  noBg?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  visible?: boolean;
  type?: "button" | "submit" | "reset";
};

type ActionBarProps = {
  actions: ActionItem[];
};

const ActionBar: React.FC<ActionBarProps> = ({ actions }) => {
  return (
    <div className="flex gap-2 px-4 py-2 border-b bg-white justify-end">
      {actions
        .filter((action) => action.visible !== false)
        .map((action) => (
          <Button
            key={action.id}
            icon={action.icon}
            text={action.text}
            className={action.className}
            classText={action.classText}
            noBg={action.noBg}
            onClick={action.onClick}
            disabled={action.disabled}
            type={action.type}
          />
        ))}
    </div>
  );
};

export default ActionBar;

import React from "react";
import ActionBar from "./ActionBar";

function HeaderActions() {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <ActionBar actions={[]} />
      </div>
      <div className="flex items-center"></div>
    </div>
  );
}

export default HeaderActions;

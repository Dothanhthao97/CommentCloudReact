import React from "react";
import ProcessTimeline from "../CirculatingInformation/ProcessTimeline";
import FormComment from "../FormComment/FormComment";

function ContentArea() {
  return (
    <div className="flex border-t border-t-gray-200">
      <div className="w-2/3">
        <FormComment />
      </div>
    </div>
  );
}

export default ContentArea;

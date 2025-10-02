import React from "react";
import ProcessTimeline from "../CirculatingInformation/ProcessTimeline";
import FormComment from "../FormComment/FormComment";

function ContentArea() {
  return (
    <div className="flex border-t border-t-gray-200">
      <div className="w-2/3">
        <FormComment />
      </div>
      <div className="w-1/3 border-l-[1px] border-l-gray-200">
        <ProcessTimeline />
      </div>
    </div>
  );
}

export default ContentArea;

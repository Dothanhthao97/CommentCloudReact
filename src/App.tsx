import React from "react";
import "./App.css";
import CommentBox from "./components/CommentBox/CommentBox";

function App() {
  return (
    <div className="social-main flex flex-col h-full min-h-0">
      <CommentBox />
    </div>
  );
}

export default App;

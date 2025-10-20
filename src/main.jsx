import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommentBox from "./components/CommentBox/CommentBox.tsx";
import ProcessTimeline from "./components/CirculatingInformation/ProcessTimeline.tsx";

ReactDOM.createRoot(document.getElementById("commentsReact")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div className="social-main flex flex-col h-full min-h-0">
                <CommentBox />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("ProcessTimeline")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div className="">
                <ProcessTimeline />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

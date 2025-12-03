import React, { useEffect, useState } from "react";
import CommentElement from "./CommentElement";
import CommentComposer from "./CommentComposer";
import HeaderToggle from "../ui/Toggle/HeaderToggle";
import ContentArea from "../FormComment/ContentArea";
import { loginRequest, fetchCommentsRequest } from "./commentSlice";
import { AddCommentEnvelope } from "../utils/AddComment-types";
import { ReplyPreview } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  fetchFormDataRequest,
  fetchSetItemID,
  fetchSetListID,
} from "../../store/system/systemSlice";
import { useLocation } from "react-router-dom";
import { RichTextEditorRef } from "mui-tiptap";

const CommentBox = () => {
  const dispatch = useAppDispatch();

  // Lấy state từ redux
  const comments = useAppSelector((state) => state.comment.comments);
  const error = useAppSelector((state) => state.comment.error);
  const loading = useAppSelector((state) => state.comment.loading);
  const isLoggedIn = useAppSelector((state) => state.comment.isLoggedIn);

  const [isFormCommentOpen, setIsFormCommentOpen] = useState(true);

  // State UI local
  const [boxReply, setBoxReply] = useState<ReplyPreview | null>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const query = useQuery();
  const itemId = query.get("ItemId") || query.get("ItemID");
  const listId = query.get("LId") || query.get("ListID");
  const inputRef = React.useRef<RichTextEditorRef>(null);

  // console.log("ItemID from URL:", itemId);
  // console.log("ListID from URL:", listId);

  useEffect(() => {
    dispatch(fetchSetItemID(itemId ? parseInt(itemId) : null));
    dispatch(fetchSetListID(listId ? listId : null));
  }, [dispatch, itemId, listId]);

  // Khi gửi comment thành công, fetch lại comment
  const onComposerSend = React.useCallback(
    async (
      content: string,
      envelope?: AddCommentEnvelope,
      fileNames?: string[]
    ) => {
      if (envelope?.status === "SUCCESS" && envelope.data) {
        //dispatch(fetchCommentsRequest());
        dispatch(fetchCommentsRequest({ ItemId: parseInt(itemId!) }));
      }
      setBoxReply(null);
    },
    [dispatch]
  );
  // Khi mount, dispatch login
  useEffect(() => {
    dispatch(loginRequest());
  }, [dispatch]);

  useEffect(() => {
    if (itemId && listId) {
      dispatch(fetchSetItemID(parseInt(itemId)));
      dispatch(fetchSetListID(listId));
      //dispatch(fetchCommentsRequest()); // gọi fetch comment sau khi set ID
      dispatch(fetchCommentsRequest({ ItemId: parseInt(itemId!) }));
    }
  }, [dispatch, itemId, listId]);

  // Khi gửi comment giữ nguyên trạng thái mở

  if (error) return <div className="container text-red">❌ {error}</div>;

  if (loading) return <div className="container">Loading...</div>;

  // if (!comments.length)
  //   return <div className="container">Không có bình luận nào.</div>;

  return (
    <>
      <div className="">
        {/* <div className="overflow-y-auto bg-white p-3.5 rounded-[10px] border border-[#e9ecf2]">ActionBar</div> */}
        {/* <div className="">
          <ContentArea />
        </div> */}
        <HeaderToggle
          title={`Bình luận (${comments.length})`}
          isOpen={isFormCommentOpen}
          onToggle={setIsFormCommentOpen}
          BoxclassName={`BoxComment ${
            isFormCommentOpen && comments.length > 0 ? "" : "collapsed"
          }${comments.length === 0 ? " noneComment" : ""}`}
        >
          <div className="flex flex-col flex-1 ">
            {comments.map((c) => (
              <CommentElement
                key={c.ID}
                commentData={c}
                allComments={comments}
                onReply={(r) => {
                  inputRef.current?.editor?.commands.focus();
                  console.log("Reply to:", inputRef.current);
                  setBoxReply(r);
                }}
              />
            ))}
          </div>
        </HeaderToggle>
      </div>

      <CommentComposer
        reply={boxReply}
        ref={inputRef}
        onCloseReply={() => setBoxReply(null)}
        onSend={onComposerSend}
      />
    </>
  );
};

export default CommentBox;

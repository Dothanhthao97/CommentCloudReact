import React, { useEffect, useState } from "react";
import CommentElement from "./CommentElement";
import CommentComposer from "./CommentComposer";
import HeaderToggle from "../ui/Toggle/HeaderToggle";
import ContentArea from "../FormComment/ContentArea";
import { loginRequest, fetchCommentsRequest } from "./commentSlice";
import { AddCommentEnvelope } from "../utils/AddComment-types";
import { ReplyPreview } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchSetItemID, fetchSetListID } from "../../store/system/systemSlice";
import { useLocation } from "react-router-dom";

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
  const itemId = query.get("ItemID");
  const listId = query.get("ListID");
  console.log("ItemID from URL:", itemId);
  console.log("ListID from URL:", listId);

  useEffect(() => {
    dispatch(fetchSetItemID(itemId ? parseInt(itemId) : null));
    dispatch(fetchSetListID(listId ? listId : null));
  }, [dispatch, itemId, listId]);

  // Khi gửi comment thành công, fetch lại comment
  const onComposerSend = React.useCallback(
    async (content: string, envelope?: AddCommentEnvelope) => {
      if (envelope?.status === "SUCCESS" && envelope.data) {
        dispatch(fetchCommentsRequest());
      }
      setBoxReply(null);
    },
    [dispatch]
  );
  // Khi mount, dispatch login
  useEffect(() => {
    dispatch(loginRequest());
  }, [dispatch]);

  // Khi gửi comment giữ nguyên trạng thái mở

  if (error) return <div className="container text-red">❌ {error}</div>;

  if (loading) return <div className="container">Loading...</div>;

  if (!comments.length)
    return <div className="container">Không có bình luận nào.</div>;

  return (
    <>
      <div className="overflow-y-auto bg-white p-3.5 rounded-[10px] border border-[#e9ecf2]">
        <div className="">ActionBar</div>
        <div className="">
          <ContentArea />
        </div>
        <HeaderToggle
          title={`Bình luận (${comments.length})`}
          isOpen={isFormCommentOpen}
          onToggle={setIsFormCommentOpen}
          BoxclassName="BoxComment"
        >
          <div className="flex flex-col flex-1 ">
            {comments.map((c) => (
              <CommentElement
                key={c.ID}
                commentData={c}
                allComments={comments}
                onReply={(r) => setBoxReply(r)}
              />
            ))}
          </div>
        </HeaderToggle>
      </div>

      <CommentComposer
        reply={boxReply}
        onCloseReply={() => setBoxReply(null)}
        onSend={onComposerSend}
      />
    </>
  );
};

export default CommentBox;

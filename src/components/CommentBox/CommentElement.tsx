import React, { useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import BoxReply from "./BoxReply";
import FileAttachmentItem from "./FileAttachmentItem";
import { getParentPreview } from "../utils/comment-helpers";
import { parseAttachments } from "../utils/AttachmentFile-helpers";
import { CommentModel, ReplyPreview, TypeInforUser } from "../utils/types";
import PostAPI from "../../services/api/PostAPI";

interface CommentElementProps {
  commentData: CommentModel;
  allComments: CommentModel[];
  onReply?: (r: ReplyPreview) => void;
}

interface AttachmentFile {
  ID?: string;
  Title?: string;
  Url: string;
}

const CommentElement: React.FC<CommentElementProps> = ({
  commentData,
  allComments,
  onReply,
}) => {
  // ---- Lấy số like
  const initialLikeCount = commentData.LikeCount ?? 0;
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [liked, setLiked] = useState<boolean>(commentData?.IsLiked);
  const hasParent = Boolean(commentData.ParentCommentId);
  const [showParent, setShowParent] = useState(hasParent);

  const handleLikeClick = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : Math.max(prev - 1, 0)));

    const funcLike = newLiked ? "like" : "unlike";
    try {
      const response = await PostAPI<{ status: string }>(
        `/support/workflow/_layouts/15/VuThao.BPMOP.Social/Like.ashx?func=${funcLike}`,
        {
          ResourceId: commentData.ID,
          ResourceCategoryId: 32,
        }
      );
      //console.log("✅ API Response:", response);
      if (response.status !== "SUCCESS") {
        throw new Error("API không thành công");
      }
    } catch (error) {
      // rollback về trạng thái cũ
      setLiked(liked);
      setLikeCount(likeCount);
      console.error("Lỗi khi gọi API like/unlike", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const parentComment = useMemo(
    () => getParentPreview(commentData.ParentCommentId, allComments),
    [commentData.ParentCommentId, allComments]
  );

  useEffect(() => {
    setShowParent(hasParent);
  }, [hasParent]);

  // ---- Hiển thị AttachmentFile cha nếu có
  const files: AttachmentFile[] = parseAttachments(commentData?.Image);
  //console.log("Attachments parsed:", files);

  useEffect(() => {
    //console.log("[CommentElement] mounted:", commentData.ID);
  }, [commentData.ID]);

  return (
    <>
      <div className="flex gap-2.5 py-3">
        <div>
          <a
            href="#"
            target="_blank"
            className="inline-block w-[40px] h-[40px] rounded-4xl bg-[#e8e8e8] overflow-hidden"
          >
            <img
              className="object-cover max-w-full h-full"
              src={commentData?.ImagePath || ""} // Sử dụng thông tin user
              alt={commentData?.Name || "User"}
            />
          </a>
        </div>

        <div className="relative w-[calc(100%-50px)] ">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-2.5">
              <a href="#" target="_blank" className="font-bold text-[14px]">
                {commentData.Name}
              </a>
              <span className="text-[#6D6D6D] text-[11px]">
                {commentData.PositionName}
              </span>
            </div>
            <div className="text-[#6D6D6D] text-[12px]">
              {new Date(commentData.Created).toLocaleString()}
            </div>
          </div>

          <div className="flex flex-wrap flex-col gap-2.5 bg-[#F8F8F8] w-full shadow-[0_0_4px_0_#F8F8F8] rounded-lg p-3">
            {/* Nếu là comment con, hiển thị trích dẫn cha */}
            {parentComment && (
              <BoxReply
                FullName={parentComment.Name}
                Created={parentComment.Created}
                Content={parentComment.Content}
              />
            )}

            <div className="des text-[13px] text-[#202020]">
              <p
                className="mb-2.5"
                dangerouslySetInnerHTML={{ __html: commentData.Content }}
              />
              {files.map((file, idx) => (
                <FileAttachmentItem key={file.ID ?? idx} file={file} />
              ))}
            </div>

            <div className="divGroupBtn inline-flex items-center py-1 px-3 gap-5 rounded-2xl border border-[#EBEBEB] bg-[#fff] shadow-[0_0_5px_0_rgba(0,95,212,0.20)] absolute bottom-[-11px] left-3.5">
              <Button
                className="btn-reply text-[#64748B] hover:text-blue-500"
                icon="ic-forward1 ic-forward-inf scale-x-[-1] scale-y-[-1]"
                text="Hồi đáp"
                onClick={() =>
                  onReply?.({
                    id: commentData.ID,
                    fullName: commentData.Name,
                    created: commentData.Created,
                    content: commentData.Content,
                  })
                }
              />
              <Button
                className={`btn-like text-[#64748B] hover:text-blue-500 ${
                  likeCount > 0 ? "text-blue-500" : ""
                }`}
                icon="ic-like"
                text={`${likeCount > 0 ? likeCount : ""}`}
                classText="text-[#202020]"
                onClick={() => {
                  handleLikeClick();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentElement;

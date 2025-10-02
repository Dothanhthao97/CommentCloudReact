import React, { useState } from "react";
import Button from "../ui/Button";

const LikeButton = () => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked((prev) => !prev);
  };

  return (
    <Button
      onClick={handleLikeClick}
      className={`btn-like text-[#64748B] hover:text-blue-500 ${
        liked ? "text-blue-500" : ""
      }`}
      icon="ic-like"
      text={likeCount > 0 ? `${likeCount}` : ""}
      classText="text-[#202020]"
    />
  );
};

export default LikeButton;

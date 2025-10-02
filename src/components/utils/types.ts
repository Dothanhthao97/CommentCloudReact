// src/components/CommentBox/comment.types.ts
export interface BoxReplyProps {
  Name?: string;
  FullName?: string;
  Created: string;
  Content: string; // Assuming Content might contain HTML, we use dangerouslySetInnerHTML
  isPlainText?: boolean;
  onClose?: () => void;
  defaultOpen?: boolean;
  animate?: boolean;
}

export interface AttachmentFile {
  ID?: string;
  Title?: string;
  Url: string;
}

export interface CommentModel {
  ID: string;
  Content: string;
  ImagePath: string;
  Name: string;
  Image: string | null;
  Created: string;
  PositionName: string;
  LikeCount: number;
  ParentCommentId?: string | null;
}

export interface ReplyPreview {
  id: string;
  fullName: string;
  created: string;
  content: string;
}

export type UploadedFile = {
  id: string;
  file: File;
  url: string;
};


export interface AddCommentPayload {
  OtherResourceId: string;
  ParentCommentId: string;
  ResourceCategoryId: number;
  ResourceSubCategoryId: number;
  Content: string;
  Files: unknown | null;
}

export interface TypeInforUser {
  ID: string;
  Name: string;
  Email: string;
  ImagePath: string | null;
  // Các thuộc tính khác của người dùng
}
export interface CommentModel {
  ID: string;
  Content: string;
  ImagePath: string;
  Name: string;
  Image: string | null;
  Created: string;
  PositionName: string;
  LikeCount: number;
  IsLiked: boolean;
  ResourceCategoryId: number | null; // chuẩn hoá về number
  ParentCommentId?: string | null;
}

export interface StepItem {
  ID: string;
  ParentId?: string | null;
  Step: number;
  Title: string;
  TitleEN: string;
  Action: string;
  Comment: string;
  CompletedDate: string;
  AssignPositionTitle: string;
  AssignUserName: string;
  AssignUserAvatar: string;
  FromUserName: string;
  FromPositionTitle: string;
  FromUserAvatar: string;
  Created: string;
  Status: number;
  SubmitAction: string;
  SubmitActionId: number;
  children?: StepItem[];
};
export interface GroupedIDStep {
  ID: string;
  Step: number;
  Title: string;
  Status: number;
  users: StepItem[];
}
// AddComment/types.ts

// (Tuỳ backend) nếu sau này có gửi file, bạn có thể chuẩn hoá lại schema này
export type UploadedFileRef = {
  Id?: string;
  Name?: string;
  Url?: string;
  Size?: number;
  ContentType?: string;
};

// Payload bạn gửi vào API (đặt trong key 'data' dạng JSON string)
export interface AddCommentPayload {
  content: string;
  replyId?: string;
  attachments?: any[];
  ParentCommentId?: string;
  resourceCategoryId?: number;
  resourceSubCategoryId?: number;
  otherResourceId?: string;
}

// Envelope API trả về
export interface AddCommentEnvelope {
  status: "SUCCESS" | "ERROR" | string;
  mess: { Key: string | null; Value: string | null };
  data: {
    ID: string;           // CommentId (GUID)
    CID: number;
    Content: string;
    Image: string;
    ResourceId: string;   // thường trùng OtherResourceId
    [k: string]: any;     // phòng khi API bổ sung field khác
  };
  dateNow: string;        // "yyyy-MM-dd HH:mm:ss"
}

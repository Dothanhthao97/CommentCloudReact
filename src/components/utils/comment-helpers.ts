import type { CommentModel, BoxReplyProps } from "./types";

export const getParentPreview = (
  parentId?: string | null,
  all: CommentModel[] = []
): BoxReplyProps | undefined => {
  const p = parentId ? all.find(c => c.ID === parentId) : undefined;
  return p ? { Name: p.Name, Created: p.Created, Content: p.Content } : undefined;
};

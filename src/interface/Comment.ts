import { User } from "./User";

export interface Comment {
  _id: string;
  text: string;
  document_id: string;

  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: User;
  updatedBy?: string;
}

export interface CreateCommentRequest {
  text: string;
  document_id: string;
}

export interface UpdateCommentRequest {
  text: string;
  document_id: string;
}

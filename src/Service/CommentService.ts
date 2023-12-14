import {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../interface";
import { handleApiRequest } from "../utils";

export const create = async (data: CreateCommentRequest): Promise<Comment> => {
  const endpoint = "comment";
  return handleApiRequest<Comment>("post", endpoint, data);
};

export const getCommentByDocument = async (
  document_id: string
): Promise<Comment[]> => {
  const endpoint = `comment/get-by-document/${document_id}`;
  return handleApiRequest<Comment[]>("get", endpoint);
};

export const getById = async (id: string): Promise<Comment> => {
  const endpoint = `comment/${id}`;
  return handleApiRequest<Comment>("get", endpoint);
};

export const update = async (
  id: string,
  data: UpdateCommentRequest
): Promise<Comment> => {
  const endpoint = `comment/${id}`;
  return handleApiRequest<Comment>("put", endpoint, data);
};

export const remove = async (id: string): Promise<any> => {
  const endpoint = `comment/${id}`;
  return handleApiRequest<Comment>("delete", endpoint);
};

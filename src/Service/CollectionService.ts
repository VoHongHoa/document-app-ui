import {
  Collection,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "../interface";
import { handleApiRequest } from "../utils";

export const getDataSelect = async (status: string): Promise<Collection[]> => {
  const endpoint = `collection/filter/select?status=${status}`;
  return handleApiRequest<Collection[]>("get", endpoint);
};

export const create = async (
  data: CreateCollectionRequest
): Promise<Collection> => {
  const endpoint = "collection";
  return handleApiRequest<Collection>("post", endpoint, data);
};

export const getAll = async (): Promise<Collection[]> => {
  const endpoint = "collection";
  return handleApiRequest<Collection[]>("get", endpoint);
};

export const getById = async (id: string): Promise<Collection> => {
  const endpoint = `collection/${id}`;
  return handleApiRequest<Collection>("get", endpoint);
};

export const update = async (
  id: string,
  data: UpdateCollectionRequest
): Promise<Collection> => {
  const endpoint = `collection/${id}`;
  return handleApiRequest<Collection>("put", endpoint, data);
};

export const remove = async (id: string): Promise<any> => {
  const endpoint = `collection/${id}`;
  return handleApiRequest<Collection>("delete", endpoint);
};

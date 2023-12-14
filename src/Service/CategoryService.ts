import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../interface";
import { handleApiRequest } from "../utils";

export const getDataSelect = async (status: string): Promise<Category[]> => {
  const endpoint = `category/filter/select?status=${status}`;
  return handleApiRequest<Category[]>("get", endpoint);
};
export const create = async (
  data: CreateCategoryRequest
): Promise<Category> => {
  return handleApiRequest<Category>("post", "category", data);
};
export const getAll = async (): Promise<Category[]> => {
  return handleApiRequest<Category[]>("get", "category");
};
export const getById = async (id: string): Promise<Category> => {
  const endpoint = `category/${id}`;
  return handleApiRequest<Category>("get", endpoint);
};
export const update = async (
  id: string,
  data: UpdateCategoryRequest
): Promise<Category> => {
  const endpoint = `category/${id}`;
  return handleApiRequest<Category>("put", endpoint, data);
};
export const remove = async (id: string): Promise<any> => {
  const endpoint = `category/${id}`;
  return handleApiRequest<Category>("delete", endpoint);
};

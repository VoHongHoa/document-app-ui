import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import { CreateUser, ExceptionResponse, UpdateUser, User } from "../interface";
import { handleApiRequest } from "../utils";

export const getMe = async (): Promise<User> => {
  const endpoint = `user/me`;
  return handleApiRequest<User>("get", endpoint);
};

export const updateMe = async (data: UpdateUser): Promise<User> => {
  const endpoint = `user/update/me`;
  return handleApiRequest<User>("post", endpoint, data);
};

export const remove = async (id: string) => {
  const endpoint = `user/${id}`;
  return handleApiRequest<User>("delete", endpoint);
};

export const update = async (id: string, model: UpdateUser): Promise<User> => {
  const endpoint = `user/${id}`;
  return handleApiRequest<User>("put", endpoint, model);
};

export const getById = async (id: string): Promise<User> => {
  const endpoint = `user/${id}`;
  return handleApiRequest<User>("get", endpoint);
};
export const create = async (model: CreateUser): Promise<User> => {
  const endpoint = `user`;
  return handleApiRequest<User>("post", endpoint, model);
};
export const fetchUsersData = async (): Promise<User[]> => {
  const endpoint = `user`;
  return handleApiRequest<User[]>("get", endpoint);
};

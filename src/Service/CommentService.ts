import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import {
  Comment,
  CreateCommentRequest,
  ExceptionResponse,
  UpdateCommentRequest,
} from "../interface";

export const create = async (data: CreateCommentRequest): Promise<Comment> => {
  try {
    const response: AxiosResponse<Comment> = await axios.post<Comment>(
      "comment",
      data
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getCommentByDocument = async (
  document_id: string
): Promise<Comment[]> => {
  try {
    const response: AxiosResponse<Comment[]> = await axios.get<Comment[]>(
      `comment/get-by-document/${document_id}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getById = async (id: string): Promise<Comment> => {
  try {
    const response: AxiosResponse<Comment> = await axios.get<Comment>(
      `comment/${id}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const update = async (
  id: string,
  data: UpdateCommentRequest
): Promise<Comment> => {
  try {
    const response: AxiosResponse<Comment> = await axios.put<Comment>(
      `comment/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const remove = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.delete(`comment/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

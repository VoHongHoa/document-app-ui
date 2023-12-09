import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import {
  Category,
  CreateCategoryRequest,
  ExceptionResponse,
  UpdateCategoryRequest,
} from "../interface";

export const getDataSelect = async (status: string): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await axios.get<Category[]>(
      `category/filter/select?status=${status}`
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

export const create = async (
  data: CreateCategoryRequest
): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await axios.post<Category>(
      "category",
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

export const getAll = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await axios.get<Category[]>(
      "category"
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

export const getById = async (id: string): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await axios.get<Category>(
      `category/${id}`
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
  data: UpdateCategoryRequest
): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await axios.put<Category>(
      `category/${id}`,
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
    const response: AxiosResponse<any> = await axios.delete(`category/${id}`);
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

import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import {
  Collection,
  CreateCollectionRequest,
  ExceptionResponse,
  UpdateCollectionRequest,
} from "../interface";

export const getDataSelect = async (status: string): Promise<Collection[]> => {
  try {
    const response: AxiosResponse<Collection[]> = await axios.get<Collection[]>(
      `collection/filter/select?status=${status}`
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
  data: CreateCollectionRequest
): Promise<Collection> => {
  try {
    const response: AxiosResponse<Collection> = await axios.post<Collection>(
      "collection",
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

export const getAll = async (): Promise<Collection[]> => {
  try {
    const response: AxiosResponse<Collection[]> = await axios.get<Collection[]>(
      "collection"
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

export const getById = async (id: string): Promise<Collection> => {
  try {
    const response: AxiosResponse<Collection> = await axios.get<Collection>(
      `collection/${id}`
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
  data: UpdateCollectionRequest
): Promise<Collection> => {
  try {
    const response: AxiosResponse<Collection> = await axios.put<Collection>(
      `collection/${id}`,
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
    const response: AxiosResponse<any> = await axios.delete(`collection/${id}`);
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

import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import { CreateUser, ExceptionResponse, UpdateUser, User } from "../interface";

export const getMe = async (): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get<User>(`user/me`);
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

export const remove = async (id: string) => {
  try {
    const response = await axios.delete(`user/${id}`);
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

export const update = async (id: string, model: UpdateUser): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.put<User>(
      `user/${id}`,
      model
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

export const getById = async (id: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get<User>(`user/${id}`);
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
export const create = async (model: CreateUser): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.post<User>("user", model);
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
export const fetchUsersData = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get<User[]>("user");
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

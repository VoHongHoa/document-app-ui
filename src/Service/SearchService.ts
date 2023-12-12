import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import { Document, ExceptionResponse, SearchKeyResponse } from "../interface";

export const getKeySearch = async (): Promise<SearchKeyResponse[]> => {
  try {
    const response: AxiosResponse<SearchKeyResponse[]> = await axios.get<
      SearchKeyResponse[]
    >(`search/key-search`);
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

export const search = async (
  searchKey: SearchKeyResponse[]
): Promise<Document[]> => {
  try {
    const response: AxiosResponse<Document[]> = await axios.post<Document[]>(
      `search`,
      searchKey
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

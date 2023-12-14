import {
  AxiosResponse,
  AxiosError,
  isAxiosError,
  AxiosRequestConfig,
} from "axios";
import axios from "../Config/AxiosConfig";
import { ExceptionResponse } from "../interface";

type TMethodRequest = "post" | "get" | "put" | "delete";

export const handleApiRequest = async <T>(
  method: TMethodRequest,
  endpoint: string,
  requestData?: any
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      data: requestData,
    };

    const response: AxiosResponse<T> = await axios(config);
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
      error: "unknown",
      status_code: 500,
    };
  }
};

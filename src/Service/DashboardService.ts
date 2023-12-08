import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import { ExceptionResponse, OverViewResponse } from "../interface";

export const getOverViewData = async (): Promise<OverViewResponse> => {
  try {
    const response: AxiosResponse<OverViewResponse> =
      await axios.get<OverViewResponse>("dashboard/overview");
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

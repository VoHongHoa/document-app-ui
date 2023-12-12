import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import { EpointHistory, ExceptionResponse } from "../interface";

export const geUserEPointHistory = async (): Promise<EpointHistory[]> => {
  try {
    const response: AxiosResponse<EpointHistory[]> = await axios.get<
      EpointHistory[]
    >(`epoint-history`);
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

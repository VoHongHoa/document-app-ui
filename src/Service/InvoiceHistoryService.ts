import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import { Document, ExceptionResponse } from "../interface";

export const create = async (document_id: string): Promise<Document> => {
  try {
    const response: AxiosResponse<Document> = await axios.get<Document>(
      `invoice-history/${document_id}`
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

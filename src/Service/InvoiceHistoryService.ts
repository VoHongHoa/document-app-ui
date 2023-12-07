import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import {
  Document,
  ExceptionResponse,
  InvoiceHistotyWithDocumentObj,
} from "../interface";

export const getAllInvoiceHistoryByUser = async (): Promise<
  InvoiceHistotyWithDocumentObj[]
> => {
  try {
    const response: AxiosResponse<InvoiceHistotyWithDocumentObj[]> =
      await axios.get<InvoiceHistotyWithDocumentObj[]>(`invoice-history`);
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

import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import {
  Collection,
  CreateCollectionRequest,
  ExceptionResponse,
  Notification,
  UpdateCollectionRequest,
  UpdateDocumentRequest,
} from "../interface";

export const geUserNotification = async (): Promise<Notification[]> => {
  try {
    const response: AxiosResponse<Notification[]> = await axios.get<
      Notification[]
    >(`notification`);
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

export const geNotificationById = async (id: string): Promise<Notification> => {
  try {
    const response: AxiosResponse<Notification> = await axios.get<Notification>(
      `notification/${id}`
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

export const approveDocument = async (
  id: string,
  data: UpdateDocumentRequest
): Promise<Notification> => {
  try {
    const response: AxiosResponse<Notification> =
      await axios.post<Notification>(`notification/approve/${id}`, data);
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

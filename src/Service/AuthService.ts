import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import {
  ExceptionResponse,
  SignInReponse,
  SignInRequest,
  SignUpReponse,
  SignUpRequest,
} from "../interface";

export const login = async (data: SignInRequest): Promise<SignInReponse> => {
  try {
    const response: AxiosResponse<SignInReponse> =
      await axios.post<SignInReponse>("auth/signin", data);
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

export const signUp = async (data: SignUpRequest): Promise<SignUpReponse> => {
  try {
    const response: AxiosResponse<SignUpReponse> =
      await axios.post<SignUpReponse>("auth/signup", data);
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

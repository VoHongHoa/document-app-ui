import {
  SignInReponse,
  SignInRequest,
  SignUpReponse,
  SignUpRequest,
} from "../interface";
import { handleApiRequest } from "../utils";

export const login = async (data: SignInRequest): Promise<SignInReponse> => {
  return handleApiRequest<SignInReponse>("post", "auth/signin", data);
};

export const signUp = async (data: SignUpRequest): Promise<SignUpReponse> => {
  return handleApiRequest<SignUpReponse>("post", "auth/signup", data);
};

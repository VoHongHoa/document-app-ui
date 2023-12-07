import { User } from "./User";

export interface SignInReponse {
  access_token: string;
  user: User;
}

export interface SignInRequest {
  username: string;
  password: string;
}

import { User } from "./User";

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  display_name?: string;
}

export interface SignUpReponse {
  access_token: string;
  user: User;
}

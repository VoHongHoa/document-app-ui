export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  e_point: number;
  display_name?: string;
  avatar?: string;
  status: string;
  role: "Admin" | "User";

  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
  display_name?: string;
  avatar?: string;
  status: string;
  role: "Admin" | "User";
}

export interface UpdateUser {
  display_name?: string;
  avatar?: string;
  status: string;
  role: "Admin" | "User";
}

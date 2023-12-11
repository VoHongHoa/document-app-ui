import { User } from "./User";

export interface Document {
  _id: string;
  title: string;
  total_page: number;
  theme_image: string;
  price: number;
  url_download: string;
  total_view: number;
  total_download: number;
  description: string;
  status: string;

  category_id?: string;
  collection_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: Pick<User, "_id" | "display_name">;
  updatedBy?: string;
}

export interface DocumentForUser {
  _id: string;
  title: string;
  total_page: number;
  theme_image: string;
  price: number;
  total_view: number;
  total_download: number;
  description: string;
  category_id?: string;
  collection_id?: string;
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: Pick<User, "_id" | "display_name">;
  updatedBy?: string;
}

export interface CreateDocumentRequest {
  title: string;
  total_page: number;
  theme_image: string;
  price: number;
  url_download: string;
  category_id?: string;
  collection_id?: string;
  description: string;
  status: string;
}

export interface UpdateDocumentRequest {
  title: string;
  total_page: number;
  theme_image: string;
  price: number;
  description: string;
  category_id?: string;
  collection_id?: string;
  status: string;
}

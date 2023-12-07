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

  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
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
  status: string;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface CreateDocumentRequest {
  title: string;
  total_page: number;
  theme_image: string;
  price: number;
  url_download: string;
  description: string;
  status: string;
}

export interface UpdateDocumentRequest {
  title: string;
  total_page: number;
  theme_image: string;
  price: number;
  description: string;
  status: string;
}

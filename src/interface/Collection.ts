export interface Collection {
  _id: string;
  title: string;
  theme_image: string;
  description?: string;
  status: string;
  createAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CreateCollectionRequest {
  title: string;
  theme_image: string;
  description?: string;
  status: string;
}

export interface UpdateCollectionRequest {
  title: string;
  theme_image: string;
  description?: string;
  status: string;
}

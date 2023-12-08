export interface Category {
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

export interface CreateCategoryRequest {
  title: string;
  theme_image: string;
  description?: string;
  status: string;
}

export interface UpdateCategoryRequest {
  title: string;
  theme_image: string;
  description?: string;
  status: string;
}

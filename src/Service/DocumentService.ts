import {
  CreateDocumentRequest,
  Document,
  UpdateDocumentRequest,
} from "../interface";
import { handleApiRequest } from "../utils";

export const getAllDocumentUploadByUser = async (): Promise<Document[]> => {
  const endpoint = `document/upload/user`;
  return handleApiRequest<Document[]>("get", endpoint);
};

export const getDocumentByCollection = async (
  id: string
): Promise<Omit<Document, "url_download">[]> => {
  const endpoint = `document/get-document-by-collection/${id}`;
  return handleApiRequest<Omit<Document, "url_download">[]>("get", endpoint);
};

export const filterDocument = async (
  searchModel: any
): Promise<Omit<Document, "url_download">[]> => {
  const endpoint = "document/homepage/filter";
  return handleApiRequest<Omit<Document, "url_download">[]>(
    "post",
    endpoint,
    searchModel
  );
};
export const getDocumentWithManyView = async (): Promise<
  Omit<Document, "url_download">[]
> => {
  const endpoint = "document/homepage/document-with-many-view";
  return handleApiRequest<Omit<Document, "url_download">[]>("get", endpoint);
};
export const getDocumentWithManyDownload = async (): Promise<
  Omit<Document, "url_download">[]
> => {
  const endpoint = "document/homepage/document-with-many-download";
  return handleApiRequest<Omit<Document, "url_download">[]>("get", endpoint);
};
export const getDocumentHomePage = async (): Promise<
  Omit<Document, "url_download">[]
> => {
  const endpoint = "document/homepage/all";
  return handleApiRequest<Omit<Document, "url_download">[]>("get", endpoint);
};
export const create = async (
  data: CreateDocumentRequest
): Promise<Document> => {
  const endpoint = "document";
  return handleApiRequest<Document>("post", endpoint, data);
};
export const getAll = async (): Promise<Document[]> => {
  const endpoint = "document";
  return handleApiRequest<Document[]>("get", endpoint);
};

export const getById = async (id: string): Promise<Document> => {
  const endpoint = `document/${id}`;
  return handleApiRequest<Document>("get", endpoint);
};

export const getDetail = async (id: string): Promise<Document> => {
  const endpoint = `document/detail/${id}`;
  return handleApiRequest<Document>("get", endpoint);
};

export const update = async (
  id: string,
  data: UpdateDocumentRequest
): Promise<Document> => {
  const endpoint = `document/${id}`;
  return handleApiRequest<Document>("put", endpoint, data);
};

export const remove = async (id: string): Promise<any> => {
  const endpoint = `document/${id}`;
  return handleApiRequest<Document>("delete", endpoint);
};

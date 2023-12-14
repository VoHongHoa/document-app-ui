import { Document, SearchKeyResponse } from "../interface";
import { handleApiRequest } from "../utils";

export const getKeySearch = async (): Promise<SearchKeyResponse[]> => {
  const endpoint = `search/key-search`;
  return handleApiRequest<SearchKeyResponse[]>("get", endpoint);
};

export const search = async (
  searchKey: SearchKeyResponse[]
): Promise<Document[]> => {
  const endpoint = `search`;
  return handleApiRequest<Document[]>("post", endpoint, searchKey);
};

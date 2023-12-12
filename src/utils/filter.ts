import Fuse, { IFuseOptions } from "fuse.js";
import { SearchKeyResponse } from "../interface";

const options: IFuseOptions<SearchKeyResponse> = {
  includeScore: true,
  threshold: 0.4,
};

export function findSimilarObjects(
  searchTerm: string,
  objects: SearchKeyResponse[]
): SearchKeyResponse[] {
  const fuse = new Fuse(objects, {
    ...options,
    keys: ["label"],
  });

  const result = fuse.search(searchTerm);
  return result.map((item) => item.item);
}

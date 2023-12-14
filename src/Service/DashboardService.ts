import { OverViewResponse } from "../interface";
import { handleApiRequest } from "../utils";

export const getOverViewData = async (): Promise<OverViewResponse> => {
  const endpoint = "dashboard/overview";
  return handleApiRequest<OverViewResponse>("get", endpoint);
};

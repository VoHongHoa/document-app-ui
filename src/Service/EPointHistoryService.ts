import { EpointHistory } from "../interface";
import { handleApiRequest } from "../utils";

export const geUserEPointHistory = async (): Promise<EpointHistory[]> => {
  const endpoint = `epoint-history`;
  return handleApiRequest<EpointHistory[]>("get", endpoint);
};

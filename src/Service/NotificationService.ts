import { Notification, UpdateDocumentRequest } from "../interface";
import { handleApiRequest } from "../utils";

export const geUserNotification = async (): Promise<Notification[]> => {
  const endpoint = `notification`;
  return handleApiRequest<Notification[]>("get", endpoint);
};
export const geNotificationById = async (id: string): Promise<Notification> => {
  const endpoint = `notification/${id}`;
  return handleApiRequest<Notification>("get", endpoint);
};
export const approveDocument = async (
  id: string,
  data: UpdateDocumentRequest
): Promise<Notification> => {
  const endpoint = `notification/approve/${id}`;
  return handleApiRequest<Notification>("get", endpoint, data);
};

import { Document } from "./Document";
import { User } from "./User";

export interface Notification {
  _id: string;
  sender: User;
  document: Document;
  recipient: string;
  isRead: boolean;

  createAt?: Date;
  updatedAt?: Date;
}

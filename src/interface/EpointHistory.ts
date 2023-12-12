import { Document } from "./Document";

export interface EpointHistory {
  _id: string;
  document: Document;
  value: number;
  source: string;
  recipient: string;

  createdAt?: Date;
  updatedAt?: Date;
}

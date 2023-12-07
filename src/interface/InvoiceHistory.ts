import { Document } from "./Document";
export interface InvoiceHistoty {
  _id: string;
  document_id: string;

  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface InvoiceHistotyWithDocumentObj {
  _id: string;
  document_id: string;
  documentObject: Document;

  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

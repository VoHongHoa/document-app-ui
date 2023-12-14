import { Document, InvoiceHistotyWithDocumentObj } from "../interface";
import { handleApiRequest } from "../utils";

export const getAllInvoiceHistoryByUser = async (): Promise<
  InvoiceHistotyWithDocumentObj[]
> => {
  const endpoint = `invoice-history`;
  return handleApiRequest<InvoiceHistotyWithDocumentObj[]>("get", endpoint);
};

export const create = async (document_id: string): Promise<Document> => {
  const endpoint = `invoice-history/${document_id}`;
  return handleApiRequest<Document>("get", endpoint);
};

import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import axios from "../Config/AxiosConfig";
import {
  CreateDocumentRequest,
  Document,
  ExceptionResponse,
  UpdateDocumentRequest,
} from "../interface";

export const getDocumentByCollection = async (
  id: string
): Promise<Omit<Document, "url_download">[]> => {
  try {
    const response: AxiosResponse<Omit<Document, "url_download">[]> =
      await axios.get<Omit<Document, "url_download">[]>(
        `document/get-document-by-collection/${id}`
      );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const filterDocument = async (
  searchModel: any
): Promise<Omit<Document, "url_download">[]> => {
  try {
    const response: AxiosResponse<Omit<Document, "url_download">[]> =
      await axios.post<Omit<Document, "url_download">[]>(
        "document/homepage/filter",
        searchModel
      );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getDocumentWithManyView = async (): Promise<
  Omit<Document, "url_download">[]
> => {
  try {
    const response: AxiosResponse<Omit<Document, "url_download">[]> =
      await axios.get<Omit<Document, "url_download">[]>(
        "document/homepage/document-with-many-view"
      );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getDocumentWithManyDownload = async (): Promise<
  Omit<Document, "url_download">[]
> => {
  try {
    const response: AxiosResponse<Omit<Document, "url_download">[]> =
      await axios.get<Omit<Document, "url_download">[]>(
        "document/homepage/document-with-many-download"
      );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getDocumentHomePage = async (): Promise<
  Omit<Document, "url_download">[]
> => {
  try {
    const response: AxiosResponse<Omit<Document, "url_download">[]> =
      await axios.get<Omit<Document, "url_download">[]>(
        "document/homepage/all"
      );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const create = async (
  data: CreateDocumentRequest
): Promise<Document> => {
  try {
    const response: AxiosResponse<Document> = await axios.post<Document>(
      "document",
      data
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getAll = async (): Promise<Document[]> => {
  try {
    const response: AxiosResponse<Document[]> = await axios.get<Document[]>(
      "document"
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getById = async (id: string): Promise<Document> => {
  try {
    const response: AxiosResponse<Document> = await axios.get<Document>(
      `document/${id}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const getDetail = async (id: string): Promise<Document> => {
  try {
    const response: AxiosResponse<Document> = await axios.get<Document>(
      `document/detail/${id}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const update = async (
  id: string,
  data: UpdateDocumentRequest
): Promise<Document> => {
  try {
    const response: AxiosResponse<Document> = await axios.put<Document>(
      `document/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

export const remove = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.delete(`document/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ExceptionResponse>;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw {
      message: "Internal server error",
      error: "unkown",
      status_code: 500,
    };
  }
};

import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import { AppContext } from "../../AppContext";
import {
  CreateDocumentRequest,
  Document,
  ExceptionResponse,
} from "../../interface";
import { StatusEnum } from "../../utils";
import { DocumentService } from "../../Service";

interface IDocumentsContextProps {
  isOpenModal: boolean;
  action: TAction;
  model: CreateDocumentRequest;
  processDataTable: Row[];

  handleOnchangeInput: (keyInput: TKeyInput, value: string) => void;

  handleOpenModal: (action: TAction) => void;
  handleCloseModal: () => void;

  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleView: (id: string) => void;

  handleSubmit: () => void;
}
type TKeyInput =
  | "title"
  | "total_page"
  | "theme_image"
  | "price"
  | "url_download"
  | "description"
  | "status";
export type TAction = "LIST" | "EDIT" | "ADD" | "VIEW" | "DELETE";
interface Row extends Document {
  id: string;
}

const DocumentsContext = createContext<IDocumentsContextProps>(
  {} as IDocumentsContextProps
);

const DocumentsContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    React.useContext(AppContext);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [action, setAction] = useState<TAction>("LIST");
  const [dataTable, setDataTable] = useState<Document[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const processDataTable = useMemo(() => {
    if (dataTable.length === 0) {
      return [];
    }
    return dataTable.map((item) => {
      return {
        ...item,
        id: item._id,
      } as Row;
    });
  }, [dataTable]);
  const [model, setModel] = useState<CreateDocumentRequest>({
    description: "",
    price: 0,
    theme_image: "",
    title: "",
    total_page: 0,
    url_download: "",
    status: StatusEnum.Active,
  });
  const handleOnchangeInput = (keyInput: TKeyInput, value: string) => {
    if (keyInput === "price" || keyInput === "total_page") {
      setModel({
        ...model,
        [keyInput]: Number(value),
      });
    } else {
      setModel({
        ...model,
        [keyInput]: value,
      });
    }
  };

  const handleOpenModal = (action: TAction) => {
    setAction(action);
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setAction("LIST");
    setIsOpenModal(false);
    resetModel();
  };

  const handleDelete = (id: string) => {
    handleOpenBackDrop();
    DocumentService.remove(id)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Delete success");
          handleCloseModal();
          fetchDataTable();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const handleEdit = (id: string) => {
    setSelectedId(id);
    fetchDocumentById(id);
    handleOpenModal("EDIT");
  };
  const handleView = (id: string) => {};
  const resetModel = () => {
    setModel({
      description: "",
      price: 0,
      theme_image: "",
      title: "",
      total_page: 0,
      url_download: "",
      status: StatusEnum.Active,
    });
  };

  const createDocument = () => {
    handleOpenBackDrop();
    DocumentService.create(model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Upload success");
          handleCloseModal();
          fetchDataTable();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  const editDocument = () => {
    handleOpenBackDrop();
    DocumentService.update(selectedId, model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Update success");
          handleCloseModal();
          fetchDataTable();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  const handleSubmit = () => {
    if (action === "ADD") {
      createDocument();
    }

    if (action === "EDIT") {
      editDocument();
    }
  };

  const fetchDocumentById = (id: string) => {
    handleOpenBackDrop();
    DocumentService.getById(id)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setModel(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  const fetchDataTable = () => {
    handleOpenBackDrop();
    DocumentService.getAll()
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setDataTable(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <DocumentsContext.Provider
      value={{
        action,
        isOpenModal,
        model,
        processDataTable,

        handleOnchangeInput,

        handleOpenModal,
        handleCloseModal,

        handleDelete,
        handleEdit,
        handleView,

        handleSubmit,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
export { DocumentsContext, DocumentsContextProvider };

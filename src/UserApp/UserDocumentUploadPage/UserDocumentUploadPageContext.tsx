import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppContext } from "../../AppContext";
import { DocumentService } from "../../Service";
import { Document, ExceptionResponse } from "../../interface";
interface Row extends Document {
  id: string;
  quick_view_link: string;
}

interface IUserDocumentUploadPageContextProps {
  processDataTable: Row[];
  isOpenModal: boolean;
  urlQuickView: string;

  handleOpenMdal: (url: string) => void;
  handleCloseModal: () => void;
}

const UserDocumentUploadPageContext =
  createContext<IUserDocumentUploadPageContextProps>(
    {} as IUserDocumentUploadPageContextProps
  );

const UserDocumentUploadPageContextProvider: React.FC<
  PropsWithChildren<{}>
> = ({ children }) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);

  const [dataTable, setDataTable] = useState<Document[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [urlQuickView, setUrlQuickView] = useState<string>("");

  const handleOpenMdal = (url: string) => {
    setUrlQuickView(url);
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const processDataTable: Row[] = useMemo(() => {
    if (dataTable.length === 0) {
      return [];
    }
    return dataTable.map((item) => {
      return {
        ...item,
        id: item._id,
        quick_view_link: item.url_download,
      } as Row;
    });
  }, [dataTable]);
  const fetchUserUploadDocument = () => {
    handleOpenBackDrop();
    DocumentService.getAllDocumentUploadByUser()
      .then((response) => {
        handleCloseBackDrop();
        setDataTable(response);
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  useEffect(() => {
    return fetchUserUploadDocument();
  }, []);

  return (
    <UserDocumentUploadPageContext.Provider
      value={{
        handleCloseModal,
        handleOpenMdal,
        isOpenModal,
        processDataTable,
        urlQuickView,
      }}
    >
      {children}
    </UserDocumentUploadPageContext.Provider>
  );
};
export { UserDocumentUploadPageContext, UserDocumentUploadPageContextProvider };

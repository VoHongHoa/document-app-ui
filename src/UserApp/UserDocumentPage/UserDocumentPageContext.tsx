import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppContext } from "../../AppContext";
import {
  Document,
  ExceptionResponse,
  InvoiceHistotyWithDocumentObj,
} from "../../interface";
import { InvoiceHistoryService } from "../../Service";
interface Row extends Document {
  id: string;
  quick_view_link: string;
}
interface IUserDocumentPageContextProps {
  processDataTable: Row[];
  isOpenModal: boolean;
  urlQuickView: string;

  handleOpenMdal: (url: string) => void;
  handleCloseModal: () => void;
}

const UserDocumentPageContext = createContext<IUserDocumentPageContextProps>(
  {} as IUserDocumentPageContextProps
);

const UserDocumentPageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const [dataTable, setDataTable] = useState<InvoiceHistotyWithDocumentObj[]>(
    []
  );
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
      const documentObj = item.documentObject;
      return {
        ...documentObj,
        id: documentObj._id,
        quick_view_link: documentObj.url_download,
      } as Row;
    });
  }, [dataTable]);

  const fetchData = () => {
    handleOpenBackDrop();
    InvoiceHistoryService.getAllInvoiceHistoryByUser()
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
    return fetchData();
  }, []);

  return (
    <UserDocumentPageContext.Provider
      value={{
        processDataTable,
        isOpenModal,
        urlQuickView,
        handleCloseModal,
        handleOpenMdal,
      }}
    >
      {children}
    </UserDocumentPageContext.Provider>
  );
};
export { UserDocumentPageContext, UserDocumentPageContextProvider };

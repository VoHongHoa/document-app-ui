import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Document, ExceptionResponse } from "../../interface";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";
import { DocumentService, InvoiceHistoryService } from "../../Service";
import { StatusEnum } from "../../utils";

interface IDocumentDetailContextProps {
  detaiDocument: Document;
  hadnleBuyDocumnent: () => void;
}
const DocumentDetailContext = createContext<IDocumentDetailContextProps>(
  {} as IDocumentDetailContextProps
);

const DocumentDetailContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const { id } = useParams();
  const [detaiDocument, setDetailDocument] = useState<Document>({
    _id: "",
    description: "",
    theme_image: "",
    total_download: 0,
    price: 0,
    total_page: 0,
    status: StatusEnum.Active,
    title: "",
    total_view: 0,
    url_download: "",
  });

  const fetchDocumentDetail = (id: string) => {
    handleOpenBackDrop();
    DocumentService.getDetail(id)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setDetailDocument(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  const hadnleBuyDocumnent = () => {
    handleOpenBackDrop();
    if (id) {
      InvoiceHistoryService.create(id)
        .then((response) => {
          handleCloseBackDrop();
          if (response) {
            handleCloseBackDrop();
            handleOpenNotify("success", "Mua tài liệu thành công");
          }
        })
        .catch((error: ExceptionResponse) => {
          handleCloseBackDrop();
          handleOpenNotify("error", error.message || "Lỗi server");
        });
    } else {
      handleOpenNotify("error", "Lỗi server");
    }
  };

  useEffect(() => {
    if (id) {
      fetchDocumentDetail(id);
    }
  }, [id]);

  return (
    <DocumentDetailContext.Provider
      value={{ detaiDocument, hadnleBuyDocumnent }}
    >
      {children}
    </DocumentDetailContext.Provider>
  );
};
export { DocumentDetailContext, DocumentDetailContextProvider };

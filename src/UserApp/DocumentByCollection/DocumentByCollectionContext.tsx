import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../../AppContext";
import { Document, ExceptionResponse } from "../../interface";
import { useParams } from "react-router-dom";
import { DocumentService } from "../../Service";

interface IDocumentByCollectionContextProps {
  data: Omit<Document, "url_download">[];
  id: string | undefined;
}
const DocumentByCollectionContext =
  createContext<IDocumentByCollectionContextProps>(
    {} as IDocumentByCollectionContextProps
  );

const DocumentByCollectionContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const { id } = useParams();
  const [data, setData] = useState<Omit<Document, "url_download">[]>([]);
  const fetchData = () => {
    if (id) {
      handleOpenBackDrop();
      DocumentService.getDocumentByCollection(id)
        .then((response) => {
          if (response) {
            handleCloseBackDrop();
            setData(response);
          }
        })
        .catch((error: ExceptionResponse) => {
          handleCloseBackDrop();
          handleOpenNotify("error", error.message || "Lỗi server");
        });
    }
  };

  useEffect(() => {
    return fetchData();
  }, [id]);

  return (
    <DocumentByCollectionContext.Provider value={{ data, id }}>
      {children}
    </DocumentByCollectionContext.Provider>
  );
};
export { DocumentByCollectionContext, DocumentByCollectionContextProvider };

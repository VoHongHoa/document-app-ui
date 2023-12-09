import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../../AppContext";
import {
  Document,
  ExceptionResponse,
  SearchModelRequest,
} from "../../interface";
import { DocumentService } from "../../Service";
interface IDocumentFilterContextProps {
  data: Omit<Document, "url_download">[];
  searchModel: SearchModelRequest;

  handleOnchangeSearchModel: (
    keySearch: TKeySeacrhModel,
    value: string
  ) => void;
}
type TKeySeacrhModel = "category_id" | "collection_id";
const DocumentFilterContext = createContext<IDocumentFilterContextProps>(
  {} as IDocumentFilterContextProps
);

const DocumentFilterContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const [data, setData] = useState<Omit<Document, "url_download">[]>([]);
  const [searchModel, setSearchModel] = useState<SearchModelRequest>({
    category_id: "",
    collection_id: "",
  });
  const [softOption, setSortOption] = useState();
  const [searchOption, setSearchOption] = useState();
  const handleOnchangeSearchModel = (
    keySearch: TKeySeacrhModel,
    value: string
  ) => {
    setSearchModel({
      ...searchModel,
      [keySearch]: value,
    });
  };
  const fetchData = () => {
    handleOpenBackDrop();
    DocumentService.filterDocument(searchModel)
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
  };

  useEffect(() => {
    fetchData();
  }, [searchModel]);
  return (
    <DocumentFilterContext.Provider
      value={{ data, searchModel, handleOnchangeSearchModel }}
    >
      {children}
    </DocumentFilterContext.Provider>
  );
};
export { DocumentFilterContext, DocumentFilterContextProvider };

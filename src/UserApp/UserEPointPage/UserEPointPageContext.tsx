import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EpointHistory, ExceptionResponse } from "../../interface";
import { AppContext } from "../../AppContext";
import { EPointHistoryService } from "../../Service";
import { formatDate } from "../../utils/format";
interface Row extends EpointHistory {
  id: string;
  document_title: string;
  date: string;
}
interface IUserEPointPageContextProps {
  processData: Row[];
}
const UserEPointPageContext = createContext<IUserEPointPageContextProps>(
  {} as IUserEPointPageContextProps
);

const UserEPointPageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const [data, setData] = useState<EpointHistory[]>([]);

  const fetchData = () => {
    handleOpenBackDrop();
    EPointHistoryService.geUserEPointHistory()
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setData(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const processData = useMemo(() => {
    if (data.length === 0) {
      return [];
    }
    return data.map((item) => {
      return {
        ...item,
        id: item._id,
        document_title: item.document.title,
        date: formatDate(item.createdAt || new Date()),
      } as Row;
    });
  }, [data]);

  useEffect(() => {
    return fetchData();
  }, []);

  return (
    <UserEPointPageContext.Provider value={{ processData }}>
      {children}
    </UserEPointPageContext.Provider>
  );
};
export { UserEPointPageContext, UserEPointPageContextProvider };

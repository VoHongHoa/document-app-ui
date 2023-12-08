import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../../AppContext";
import { ExceptionResponse, OverViewResponse } from "../../interface";
import { DashboardService } from "../../Service";

interface IHomeDashboardContextProps {
  overViewData: OverViewResponse;
}
const HomeDashboardContext = createContext<IHomeDashboardContextProps>(
  {} as IHomeDashboardContextProps
);

const HomeDashboardContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const [overViewData, setOverViewData] = useState<OverViewResponse>({
    num_of_document: 0,
    num_of_total_download: 0,
    num_of_total_view: 0,
    num_of_user: 0,
  });

  const fetchOverViewData = () => {
    handleOpenBackDrop();
    DashboardService.getOverViewData()
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setOverViewData(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  useEffect(() => {
    return fetchOverViewData();
  }, []);

  return (
    <HomeDashboardContext.Provider value={{ overViewData }}>
      {children}
    </HomeDashboardContext.Provider>
  );
};
export { HomeDashboardContext, HomeDashboardContextProvider };

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Document, ExceptionResponse } from "../../interface";
import { AppContext } from "../../AppContext";
interface IUserEPointPageContextProps {}
const UserEPointPageContext = createContext<IUserEPointPageContextProps>(
  {} as IUserEPointPageContextProps
);

const UserEPointPageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);

  return (
    <UserEPointPageContext.Provider value={{}}>
      {children}
    </UserEPointPageContext.Provider>
  );
};
export { UserEPointPageContext, UserEPointPageContextProvider };

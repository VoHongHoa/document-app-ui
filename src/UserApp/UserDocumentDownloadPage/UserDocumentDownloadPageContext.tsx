import { PropsWithChildren, createContext, useContext } from "react";
import { AppContext } from "../../AppContext";
interface IUserDocumentDownloadPageContextProps {}
const UserDocumentDownloadPageContext =
  createContext<IUserDocumentDownloadPageContextProps>(
    {} as IUserDocumentDownloadPageContextProps
  );

const UserDocumentDownloadPageContextProvider: React.FC<
  PropsWithChildren<{}>
> = ({ children }) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);

  return (
    <UserDocumentDownloadPageContext.Provider value={{}}>
      {children}
    </UserDocumentDownloadPageContext.Provider>
  );
};
export {
  UserDocumentDownloadPageContext,
  UserDocumentDownloadPageContextProvider,
};

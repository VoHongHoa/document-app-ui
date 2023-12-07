import { PropsWithChildren, createContext, useContext } from "react";
import { AppContext } from "../../AppContext";
interface IUserDocumentPageContextProps {}
const UserDocumentPageContext = createContext<IUserDocumentPageContextProps>(
  {} as IUserDocumentPageContextProps
);

const UserDocumentPageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);

  return (
    <UserDocumentPageContext.Provider value={{}}>
      {children}
    </UserDocumentPageContext.Provider>
  );
};
export { UserDocumentPageContext, UserDocumentPageContextProvider };

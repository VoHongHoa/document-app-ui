import { PropsWithChildren, createContext, useContext } from "react";
import { AppContext } from "../../AppContext";
interface IDocumentFilterContextProps {}
const DocumentFilterContext = createContext<IDocumentFilterContextProps>(
  {} as IDocumentFilterContextProps
);

const DocumentFilterContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);

  return (
    <DocumentFilterContext.Provider value={{}}>
      {children}
    </DocumentFilterContext.Provider>
  );
};
export { DocumentFilterContext, DocumentFilterContextProvider };

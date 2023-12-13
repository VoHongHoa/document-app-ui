import React, { createContext, PropsWithChildren, useState } from "react";
import useWindowSize from "../../../CustomeHook/useWindowSize";

interface IAdminLayoutContextProps {
  handleChangeSideBarMode: () => void;
  width: number;
  showSideBar: boolean;
}

const AdminLayoutContext = createContext<IAdminLayoutContextProps>(
  {} as IAdminLayoutContextProps
);

const AdminLayoutContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { width } = useWindowSize();
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const handleChangeSideBarMode = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <AdminLayoutContext.Provider
      value={{ handleChangeSideBarMode, width, showSideBar }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
};
export { AdminLayoutContext, AdminLayoutContextProvider };

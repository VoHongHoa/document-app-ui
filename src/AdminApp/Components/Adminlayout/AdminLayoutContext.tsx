import React, { createContext, PropsWithChildren } from "react";

interface IAdminLayoutContextProps {}

const AdminLayoutContext = createContext<IAdminLayoutContextProps>(
  {} as IAdminLayoutContextProps
);

const AdminLayoutContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <AdminLayoutContext.Provider value={{}}>
      {children}
    </AdminLayoutContext.Provider>
  );
};
export { AdminLayoutContext, AdminLayoutContextProvider };

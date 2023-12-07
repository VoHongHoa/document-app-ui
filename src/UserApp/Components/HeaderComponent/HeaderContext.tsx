import React, { createContext, useState, PropsWithChildren } from "react";

interface IHeaderContextProps {
  isHovered: {
    subMenu: boolean;
    account: boolean;
  };
  handleMouseEnter: (key: "subMenu" | "account") => void;
  handleMouseLeave: (key: "subMenu" | "account") => void;

  openModalUpload: boolean;
  handleOpenModalUpload: () => void;
  handleCloseModalUpload: () => void;
}

const HeaderContext = createContext<IHeaderContextProps>(
  {} as IHeaderContextProps
);

const HeaderContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isHovered, setIsHovered] = useState<{
    subMenu: boolean;
    account: boolean;
  }>({
    subMenu: false,
    account: false,
  });
  const [openModalUpload, setOpenModalUpload] = useState<boolean>(false);

  const handleMouseEnter = (key: "subMenu" | "account") => {
    setIsHovered({
      ...isHovered,
      [key]: true,
    });
  };
  const handleMouseLeave = (key: "subMenu" | "account") => {
    setIsHovered({
      ...isHovered,
      [key]: false,
    });
  };

  const handleOpenModalUpload = () => {
    setOpenModalUpload(true);
  };
  const handleCloseModalUpload = () => {
    setOpenModalUpload(false);
  };
  return (
    <HeaderContext.Provider
      value={{
        isHovered,
        handleMouseEnter,
        handleMouseLeave,
        handleCloseModalUpload,
        handleOpenModalUpload,
        openModalUpload,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
export { HeaderContext, HeaderContextProvider };

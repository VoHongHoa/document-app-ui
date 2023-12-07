import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface IAppContextProps {
  handleOpenNotify: (status: TStatusNotify, message: string) => void;
  handleCloseNotify: (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
  handleOpenBackDrop: () => void;
  handleCloseBackDrop: () => void;

  openModal: {
    signUpModal: boolean;
    signInModal: boolean;
  };
  handleOpenMadal: (keyModal: TKeyModal) => void;
  handleCloseModal: (keyModal: TKeyModal) => void;
  handleChangeModal: (from: TKeyModal, to: TKeyModal) => void;
}
export type TStatusNotify = "error" | "success" | "warning" | "info";
export type TKeyModal = "signUpModal" | "signInModal";

const AppContext = createContext<IAppContextProps>({} as IAppContextProps);

const AppContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openBackdrop, setOpenBackDrop] = React.useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [openModal, setOpenModal] = React.useState<{
    signUpModal: boolean;
    signInModal: boolean;
  }>({
    signUpModal: false,
    signInModal: false,
  });
  const [notifyStatus, setNotifySatatus] = useState<TStatusNotify>("info");
  const navigate = useNavigate();

  const handleOpenNotify = (status: TStatusNotify, message: string) => {
    setMessage(message);
    setNotifySatatus(status);
    setOpen(true);
  };

  const handleOpenBackDrop = () => {
    setOpenBackDrop(true);
  };
  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const handleCloseNotify = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleOpenMadal = (keyModal: TKeyModal) => {
    setOpenModal({
      ...openModal,
      [keyModal]: true,
    });
  };

  const handleCloseModal = (keyModal: TKeyModal) => {
    setOpenModal({
      ...openModal,
      [keyModal]: false,
    });
  };

  const handleChangeModal = (from: TKeyModal, to: TKeyModal) => {
    setOpenModal({
      ...openModal,
      [from]: false,
      [to]: true,
    });
  };

  return (
    <AppContext.Provider
      value={{
        handleOpenNotify,
        handleCloseNotify,
        handleOpenBackDrop,
        handleCloseBackDrop,
        handleCloseModal,
        handleOpenMadal,
        handleChangeModal,

        openModal,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleCloseNotify}
      >
        <Alert
          onClose={handleCloseNotify}
          severity={notifyStatus}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={openBackdrop}
        onClick={handleCloseBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </AppContext.Provider>
  );
};
export { AppContext, AppContextProvider };

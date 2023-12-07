import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../../../../AppContext";
import { AuthService } from "../../../../Service";
import { useAppDispatch } from "../../../../redux/hooks";
import { loginSuccess } from "../../../Login/LoginSlice";
import {
  ExceptionResponse,
  SignInReponse,
  SignUpRequest,
} from "../../../../interface";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
type TKeyInput = "email" | "password" | "username";

export default function SignUpModal() {
  const {
    openModal,
    handleOpenNotify,
    handleCloseBackDrop,
    handleCloseModal,
    handleOpenBackDrop,
    handleChangeModal,
  } = React.useContext(AppContext);
  const [signUpData, setSignUpData] = React.useState<SignUpRequest>({
    email: "",
    password: "",
    username: "",
  });
  const dispatch = useAppDispatch();

  const handleSignUp = async () => {
    handleOpenBackDrop();
    AuthService.signUp(signUpData)
      .then((response: SignInReponse) => {
        handleCloseBackDrop();
        if (response) {
          localStorage.setItem("access_token", response.access_token);
          dispatch(
            loginSuccess({
              isLogin: true,
              access_token: response.access_token,
              user: response.user,
            })
          );
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Đăng ký thất bại");
      });
  };
  const handleOnChangeInput = (key: TKeyInput, value: string) => {
    setSignUpData({
      ...signUpData,
      [key]: value,
    });
  };

  const handleChangeToSignIn = () => {
    handleChangeModal("signUpModal", "signInModal");
  };

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={openModal.signUpModal}
      className="max-sm:w-full"
    >
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: "#2563EB", color: "white" }}
        id="customized-dialog-title"
      >
        Sign Up
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleCloseModal("signUpModal")}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "white",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div className="w-full flex flex-col gap-4 ">
          <button className="border bg-blue-500 text-white p-3 ">
            Sign up with Faccebook
          </button>
          <div className="flex flex-row items-center w-full">
            <div className="h-[1px] w-[45%] bg-gray-400"></div>
            <span className="w-[10%] text-center">Or</span>
            <div className="h-[1px] w-[45%] bg-gray-400"></div>
          </div>
          <input
            className="border p-4 w-72"
            placeholder="Email"
            type="text"
            onChange={(e) => handleOnChangeInput("email", e.target.value)}
          />
          <input
            className="border p-4"
            placeholder="Password"
            type="password"
            onChange={(e) => handleOnChangeInput("password", e.target.value)}
          />

          <input
            className="border p-4"
            placeholder="Display Name"
            type="text"
            onChange={(e) => handleOnChangeInput("username", e.target.value)}
          />
          <button
            className="border bg-blue-500 text-white p-3"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <span>
            Bạn đã có tài khoản?
            <strong
              className="text-blue-500 cursor-pointer"
              onClick={handleChangeToSignIn}
            >
              Đăng nhập
            </strong>
          </span>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
}

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
  SignInRequest,
} from "../../../../interface";
type TKeyInput = "username" | "password";

export default function SignInModal() {
  const {
    openModal,
    handleOpenNotify,
    handleCloseBackDrop,
    handleCloseModal,
    handleOpenBackDrop,
    handleChangeModal,
  } = React.useContext(AppContext);
  const [signInData, setSignInData] = React.useState<SignInRequest>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    handleOpenBackDrop();
    AuthService.login(signInData)
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
        handleOpenNotify("error", error.message || "Đăng nhập thất bại");
      });
  };
  const handleOnChangeInput = (key: TKeyInput, value: string) => {
    setSignInData({
      ...signInData,
      [key]: value,
    });
  };
  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${process.env.REACT_APP_API_URL}auth/google`;
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      maxWidth="sm"
      open={openModal.signInModal}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: "#2563EB", color: "white" }}
        id="customized-dialog-title"
      >
        Sign In
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleCloseModal("signInModal")}
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
        <div className="w-full flex flex-col gap-4">
          <button
            className="border bg-blue-500 text-white p-3"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>
          <div className="flex flex-row items-center w-full">
            <div className="h-[1px] w-[45%] bg-gray-400"></div>
            <span className="w-[10%] text-center">Or</span>
            <div className="h-[1px] w-[45%] bg-gray-400"></div>
          </div>
          <input
            className="border p-4 w-72 "
            placeholder="Username"
            type="text"
            onChange={(e) => handleOnChangeInput("username", e.target.value)}
          />
          <input
            className="border p-4"
            placeholder="Password"
            type="password"
            onChange={(e) => handleOnChangeInput("password", e.target.value)}
          />
          <button
            className="border bg-blue-500 text-white p-3"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <span>
            Bạn chưa có tài khoản?{" "}
            <strong
              className="text-blue-500 cursor-pointer"
              onClick={() => handleChangeModal("signInModal", "signUpModal")}
            >
              Đăng ký
            </strong>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

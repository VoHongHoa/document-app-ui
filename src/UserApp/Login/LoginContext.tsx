import React, { createContext, useState, PropsWithChildren } from "react";
import { AuthService } from "../../Service";

import { AppContext } from "../../AppContext";
import { useAppDispatch } from "../../redux/hooks";
import { ILoginReduxState, loginSuccess } from "./LoginSlice";
import {
  ExceptionResponse,
  SignInReponse,
  SignInRequest,
} from "../../interface";

interface ILoginContextProps {
  datalogin: SignInRequest;
  handleOnchange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => void;
  handleLogin: () => Promise<void>;
}

const LoginContext = createContext<ILoginContextProps>(
  {} as ILoginContextProps
);

const LoginContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [datalogin, setDataLogin] = useState<SignInRequest>({
    username: "",
    password: "",
  });
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    React.useContext(AppContext);

  const dispatch = useAppDispatch();

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    e.preventDefault();
    setDataLogin({ ...datalogin, [key]: e.target.value });
  };

  const handleLogin = async () => {
    AuthService.login(datalogin)
      .then((response: SignInReponse) => {
        if (response) {
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
        handleOpenNotify("error", error.message || "Đăng nhập thất bại");
      });
  };

  return (
    <LoginContext.Provider value={{ datalogin, handleOnchange, handleLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
export { LoginContext, LoginContextProvider };

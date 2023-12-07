import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { ExceptionResponse, SignUpRequest } from "../../interface";
import { AppContext } from "../../AppContext";
import { useAppDispatch } from "../../redux/hooks";
import { AuthService } from "../../Service";
import { loginSuccess } from "../../redux/slices/AuthSlice";

interface IHomePageContextProps {
  signUpData: SignUpRequest;
  handleOnchangeInput: (key: TKeyInput, value: string) => void;
  handleSignUp: () => void;
}
const HomePageContext = createContext<IHomePageContextProps>(
  {} as IHomePageContextProps
);
type TKeyInput = "email" | "password" | "display_name";

const HomePageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const dispatch = useAppDispatch();
  const [signUpData, setSignUpData] = useState<SignUpRequest>({
    email: "",
    password: "",
    username: "",
  });
  const handleOnchangeInput = (key: TKeyInput, value: string) => {
    setSignUpData({
      ...signUpData,
      [key]: value,
    });
  };
  const handleSignUp = () => {
    AuthService.signUp(signUpData)
      .then((response) => {
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
        handleOpenNotify("error", error.message || "Sign up failed");
      });
  };
  return (
    <HomePageContext.Provider
      value={{ signUpData, handleOnchangeInput, handleSignUp }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
export { HomePageContext, HomePageContextProvider };

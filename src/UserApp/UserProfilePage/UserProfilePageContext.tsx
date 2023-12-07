import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { ExceptionResponse, User } from "../../interface";
import { AppContext } from "../../AppContext";
import { UserService } from "../../Service";
import { RoleEnum, StatusEnum } from "../../utils";
interface IUserProfilePageContextProps {
  action: TAction;
  model: User;

  handleOnchangeInput: (keyInput: TKeyInput, value: string) => void;
  handleChangeMode: (mode: TAction) => void;

  handleSubmit: () => void;
}
const UserProfilePageContext = createContext<IUserProfilePageContextProps>(
  {} as IUserProfilePageContextProps
);
type TAction = "VIEW" | "EDIT";
type TKeyInput = "display_name" | "avatar";
const UserProfilePageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const [action, setAction] = useState<TAction>("VIEW");
  const [model, setModel] = useState<User>({
    _id: "",
    email: "",
    username: "",
    display_name: "",
    password: "",
    role: RoleEnum.USER,
    e_point: 0,
    status: StatusEnum.Inactive,
    avatar: "",
  });
  const handleChangeMode = (mode: TAction) => {
    setAction(mode);
  };
  const handleOnchangeInput = (keyInput: TKeyInput, value: string) => {
    setModel({
      ...model,
      [keyInput]: value,
    });
  };

  const handleSubmit = () => {
    handleOpenNotify("warning", "Chức năng đang được phát triển");
  };

  const fetchUserData = () => {
    handleOpenBackDrop();
    UserService.getMe()
      .then((response) => {
        handleCloseBackDrop();
        setModel(response);
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  useEffect(() => {
    return fetchUserData();
  }, []);

  return (
    <UserProfilePageContext.Provider
      value={{
        action,
        model,
        handleOnchangeInput,
        handleChangeMode,
        handleSubmit,
      }}
    >
      {children}
    </UserProfilePageContext.Provider>
  );
};
export { UserProfilePageContext, UserProfilePageContextProvider };

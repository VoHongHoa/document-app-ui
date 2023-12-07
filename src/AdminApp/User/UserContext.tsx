import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppContext } from "../../AppContext";

import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CreateUser, ExceptionResponse, User } from "../../interface";
import { UserService } from "../../Service";
import { RoleEnum, StatusEnum } from "../../utils";

export type TAction = "LIST" | "ADD" | "EDIT" | "VIEW";
interface Row extends User {
  id: string;
}
export type TKeyInput =
  | "email"
  | "password"
  | "username"
  | "display_name"
  | "avatar"
  | "role"
  | "status";
interface IUserContextProps {
  isOpenModal: boolean;
  action: TAction;
  model: CreateUser;
  processDataTable: Row[];

  handleOpenModal: (action: TAction) => void;
  handleCloseModal: () => void;

  handleDelete: (id: string) => void;
  handleView: (id: string) => void;
  handleEdit: (id: string) => void;
  handleSubmit: () => void;
  handleOnChangeInput: (keyInput: TKeyInput, value: string) => void;
}

const UserContext = createContext<IUserContextProps>({} as IUserContextProps);

const UserContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    React.useContext(AppContext);
  const [isOpenModal, setIsOpenMdal] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<TAction>("LIST");
  const [model, setModel] = React.useState<CreateUser>({
    email: "",
    status: StatusEnum.Active,
    password: "",
    username: "",
    role: RoleEnum.USER,
    avatar: "",
    display_name: "",
  });
  const [selectedId, setSelectedId] = useState<string>("");
  const [dataTable, setDataTable] = React.useState<User[]>([]);

  const fetchDataTable = () => {
    handleOpenBackDrop();
    UserService.fetchUsersData()
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setDataTable(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  const processDataTable: Row[] = useMemo(() => {
    if (dataTable && dataTable.length === 0) {
      return [];
    }
    return dataTable.map((item) => {
      return {
        id: item._id,
        email: item.email,
        status: item.status,
        username: item.username,
        avatar: item.avatar,
        role: item.role,
        display_name: item.display_name,
      } as Row;
    });
  }, [dataTable]);

  const handleOpenModal = (action: TAction) => {
    setAction(action);
    setIsOpenMdal(true);
  };
  const handleCloseModal = () => {
    resetModel();
    setAction("LIST");
    setIsOpenMdal(false);
  };
  const handleSubmit = () => {
    if (action === "ADD") {
      createUser();
    }
    if (action === "EDIT") {
      editUser();
    }
    handleCloseModal();
  };

  const handleOnChangeInput = (keyInput: TKeyInput, value: string) => {
    setModel({
      ...model,
      [keyInput]: value,
    });
  };
  const fetchUserById = useCallback((id: string) => {
    handleOpenBackDrop();
    UserService.getById(id)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setModel(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  }, []);
  const fetchDetailUser = () => {};
  const createUser = () => {
    handleOpenBackDrop();
    UserService.create(model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Thêm mới người dùng thành công");
          fetchDataTable();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const editUser = () => {
    handleOpenBackDrop();
    UserService.update(selectedId, model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Chỉnh sửa người dùng thành công");
          fetchDataTable();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const handleDelete = (id: string) => {
    handleOpenBackDrop();
    UserService.remove(id)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Xóa dữ liệu thành công");
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const handleView = (id: string) => {};

  const handleEdit = (id: string) => {
    setAction("EDIT");
    setSelectedId(id);
    fetchUserById(id);
    setIsOpenMdal(true);
  };
  const resetModel = () => {
    setModel({
      email: "",
      status: StatusEnum.Active,
      password: "",
      username: "",
      role: RoleEnum.USER,
      avatar: "",
      display_name: "",
    });
  };
  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isOpenModal,
        model,
        processDataTable,
        action,

        handleCloseModal,
        handleDelete,
        handleEdit,
        handleOpenModal,
        handleView,

        handleSubmit,
        handleOnChangeInput,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };

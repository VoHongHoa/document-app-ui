import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Category,
  CreateCategoryRequest,
  ExceptionResponse,
} from "../../interface";
import { AppContext } from "../../AppContext";
import { StatusEnum } from "../../utils";
import { CategoryService } from "../../Service";
export type TAction = "LIST" | "ADD" | "EDIT" | "VIEW";
interface Row extends Category {
  id: string;
}
export type TKeyInput = "title" | "theme_image" | "description" | "status";
interface ICategoriesContextProps {
  isOpenModal: boolean;
  action: TAction;
  model: CreateCategoryRequest;
  processDataTable: Row[];

  handleOnChangeInput: (keyInput: TKeyInput, value: string) => void;

  handleOpenModal: (action: TAction) => void;
  handleCloseModal: () => void;

  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleView: (id: string) => void;

  handleSubmit: () => void;
}
const CategoriesContext = createContext<ICategoriesContextProps>(
  {} as ICategoriesContextProps
);

const CategoriesContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const [isOpenModal, setIsOpenMdal] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<TAction>("LIST");
  const [model, setModel] = React.useState<CreateCategoryRequest>({
    theme_image: "",
    status: StatusEnum.Active,
    title: "",
    description: "",
  });
  const [selectedId, setSelectedId] = useState<string>("");
  const [dataTable, setDataTable] = React.useState<Category[]>([]);

  const fetchDataTable = () => {
    handleOpenBackDrop();
    CategoryService.getAll()
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
        ...item,
        id: item._id,
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
    CategoryService.getById(id)
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
    CategoryService.create(model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Thêm mới loại tài liệu thành công");
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
    CategoryService.update(selectedId, model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Chỉnh sửa loại tài liệu thành công");
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
    CategoryService.remove(id)
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
      theme_image: "",
      status: StatusEnum.Active,
      title: "",
      description: "",
    });
  };
  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        action,
        isOpenModal,
        model,
        processDataTable,

        handleOnChangeInput,

        handleOpenModal,
        handleCloseModal,

        handleDelete,
        handleEdit,
        handleView,

        handleSubmit,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
export { CategoriesContext, CategoriesContextProvider };

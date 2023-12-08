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
  Collection,
  CreateCollectionRequest,
  ExceptionResponse,
} from "../../interface";
import { AppContext } from "../../AppContext";
import { CollectionService } from "../../Service";
import { StatusEnum } from "../../utils";
export type TAction = "LIST" | "ADD" | "EDIT" | "VIEW";
interface Row extends Collection {
  id: string;
}
export type TKeyInput = "title" | "theme_image" | "description" | "status";
interface ICollectionsContextProps {
  isOpenModal: boolean;
  action: TAction;
  model: CreateCollectionRequest;
  processDataTable: Row[];

  handleOnChangeInput: (keyInput: TKeyInput, value: string) => void;

  handleOpenModal: (action: TAction) => void;
  handleCloseModal: () => void;

  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleView: (id: string) => void;

  handleSubmit: () => void;
}
const CollectionsContext = createContext<ICollectionsContextProps>(
  {} as ICollectionsContextProps
);

const CollectionsContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);

  const [isOpenModal, setIsOpenMdal] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<TAction>("LIST");
  const [model, setModel] = React.useState<CreateCollectionRequest>({
    theme_image: "",
    status: StatusEnum.Active,
    title: "",
    description: "",
  });
  const [selectedId, setSelectedId] = useState<string>("");
  const [dataTable, setDataTable] = React.useState<Collection[]>([]);

  const fetchDataTable = () => {
    handleOpenBackDrop();
    CollectionService.getAll()
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
    CollectionService.getById(id)
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
    CollectionService.create(model)
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
    CollectionService.update(selectedId, model)
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
    CollectionService.remove(id)
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
    <CollectionsContext.Provider
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
    </CollectionsContext.Provider>
  );
};
export { CollectionsContext, CollectionsContextProvider };

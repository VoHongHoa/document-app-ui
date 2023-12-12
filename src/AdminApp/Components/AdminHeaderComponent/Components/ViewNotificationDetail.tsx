import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ViewDocumentComponent from "../../../../UserApp/Components/ViewDocumentComponent/ViewDocumentComponent";
import useWindowSize from "../../../../CustomeHook/useWindowSize";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../AppContext";
import { NotificationService } from "../../../../Service";
import { Document, ExceptionResponse } from "../../../../interface";
import { a11yProps } from "../../../../utils/format";
import TabComponent from "../../TabComponent/TabComponent";
import { StatusEnum } from "../../../../utils";
import StatusSelectComponent from "../../StatusSelectComponent/StatusSelectComponent";
import CategorySelect from "../../../Categories/Components/CategorySelect";
import CollectionSelect from "../../../Collections/Components/CollectionSelect";
import DialogActions from "@mui/material/DialogActions";

interface IViewNotificationDetailProps {
  isOpenModal: boolean;
  handleClose: () => void;
  id: string;
}
type TKeyInput =
  | "title"
  | "total_page"
  | "theme_image"
  | "price"
  | "url_download"
  | "category_id"
  | "collection_id"
  | "description"
  | "status";
export default function ViewNotificationDetail(
  props: IViewNotificationDetailProps
) {
  const { handleOpenBackDrop, handleCloseBackDrop, handleOpenNotify } =
    useContext(AppContext);
  const { width } = useWindowSize();
  const [model, setModel] = useState<Document>({
    _id: "",
    total_download: 0,
    total_view: 0,
    description: "",
    price: 0,
    theme_image: "",
    title: "",
    total_page: 0,
    url_download: "",
    status: StatusEnum.Active,
  });
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOnchangeInput = (keyInput: TKeyInput, value: string) => {
    if (keyInput === "price" || keyInput === "total_page") {
      setModel({
        ...model,
        [keyInput]: Number(value),
      });
    } else {
      setModel({
        ...model,
        [keyInput]: value,
      });
    }
  };
  const fetchData = (id: string) => {
    handleOpenBackDrop();
    NotificationService.geNotificationById(id)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setModel(response.document);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const handleApproveDocument = () => {
    handleOpenBackDrop();
    NotificationService.approveDocument(props.id, model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          props.handleClose();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const disable = () => {
    if (model.status === StatusEnum.Active) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    return fetchData(props.id);
  }, [props.id]);
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={props.isOpenModal}
      fullScreen={width > 1023 ? false : true}
      maxWidth="md"
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: "#2563EB", color: "white" }}
        id="customized-dialog-title"
      >
        Duyệt tài liệu
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleClose}
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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Thông tin chung" {...a11yProps(0)} />
              <Tab label="Thông tin thêm" {...a11yProps(1)} />
              <Tab label="Upload file" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabComponent value={value} index={0}>
            <div className="w-full flex flex-col gap-10">
              <TextField
                label="Title"
                variant="outlined"
                placeholder="Title"
                type="text"
                value={model.title}
                onChange={(e) => handleOnchangeInput("title", e.target.value)}
                disabled={disable()}
              />
              <TextField
                label="Total page"
                variant="outlined"
                placeholder="Total page"
                type="text"
                value={model.total_page}
                disabled={disable()}
                onChange={(e) =>
                  handleOnchangeInput("total_page", e.target.value)
                }
              />
              <TextField
                label="Theme Image"
                variant="outlined"
                placeholder="Theme Image"
                value={model.theme_image}
                disabled={disable()}
                onChange={(e) =>
                  handleOnchangeInput("theme_image", e.target.value)
                }
              />
              <TextField
                label="Price"
                variant="outlined"
                placeholder="Price"
                disabled={disable()}
                value={model.price}
                onChange={(e) => handleOnchangeInput("price", e.target.value)}
              />

              <div className="flex flex-row justify-between gap-10">
                <StatusSelectComponent
                  key={"status_select"}
                  value={model.status}
                  disable={true}
                />
                <CategorySelect
                  value={model.category_id || ""}
                  onchange={handleOnchangeInput}
                  disable={disable()}
                />
                <CollectionSelect
                  value={model.collection_id || ""}
                  onchange={handleOnchangeInput}
                  disable={disable()}
                />
              </div>
            </div>
          </TabComponent>
          <TabComponent value={value} index={1}>
            <div className="w-full flex flex-col gap-10">
              <TextField
                label="Description"
                multiline
                rows={10}
                placeholder="Description..."
                fullWidth
                value={model.description}
                onChange={(e) =>
                  handleOnchangeInput("description", e.target.value)
                }
                disabled={disable()}
              />
            </div>
          </TabComponent>
          <TabComponent value={value} index={2}>
            <ViewDocumentComponent url={model.url_download} />
          </TabComponent>
        </Box>
      </DialogContent>
      <DialogActions>
        <div className="flex flex-row gap-5">
          <button
            className="border bg-blue-500 hover:bg-blue-300 px-5 py-2 text-white "
            onClick={handleApproveDocument}
          >
            Approve
          </button>
          <button
            className="border px-5 py-2 text-white bg-red-500 hover:bg-red-300"
            onClick={props.handleClose}
          >
            {" "}
            Cancel{" "}
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

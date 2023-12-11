import UploadIcon from "@mui/icons-material/Upload";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import TabComponent from "../../../../AdminApp/Components/TabComponent/TabComponent";
import { a11yProps } from "../../../../utils/format";
import {
  CreateDocumentRequest,
  ExceptionResponse,
} from "../../../../interface";
import { StatusEnum } from "../../../../utils";
import StatusSelectComponent from "../../../../AdminApp/Components/StatusSelectComponent/StatusSelectComponent";
import CategorySelect from "../../../../AdminApp/Categories/Components/CategorySelect";
import CollectionSelect from "../../../../AdminApp/Collections/Components/CollectionSelect";
import FileUploadComponent from "../../../../AdminApp/Components/FileUploadComponent/FileUploadComponent";
import DialogActions from "@mui/material/DialogActions";
import { DocumentService } from "../../../../Service";
import { AppContext } from "../../../../AppContext";

type TAction = "ADD" | "EDIT" | "DELETE";
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
export default function () {
  const { handleCloseBackDrop, handleOpenBackDrop, handleOpenNotify } =
    useContext(AppContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [model, setModel] = useState<CreateDocumentRequest>({
    description: "",
    price: 0,
    theme_image: "",
    title: "",
    total_page: 0,
    url_download: "",
    status: StatusEnum.Active,
  });
  const [action, setAction] = useState<TAction>("ADD");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpenModal = (action: TAction) => {
    setAction("ADD");
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setAction("ADD");
    setOpenModal(false);
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
  const handleSubmit = () => {
    if (action === "ADD") {
      createDocument();
    }
  };
  const createDocument = () => {
    handleOpenBackDrop();
    DocumentService.create(model)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Upload success");
          handleCloseModal();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  return (
    <div>
      <button
        className="bg-green-500 py-1 px-3"
        onClick={() => handleOpenModal("ADD")}
      >
        <UploadIcon /> Upload
      </button>

      <Dialog
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
        open={openModal}
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
          Upload new Document
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
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
                />
                <TextField
                  label="Total page"
                  variant="outlined"
                  placeholder="Total page"
                  type="text"
                  value={model.total_page}
                  onChange={(e) =>
                    handleOnchangeInput("total_page", e.target.value)
                  }
                />
                <TextField
                  label="Theme Image"
                  variant="outlined"
                  placeholder="Theme Image"
                  value={model.theme_image}
                  onChange={(e) =>
                    handleOnchangeInput("theme_image", e.target.value)
                  }
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  placeholder="Price"
                  value={model.price}
                  onChange={(e) => handleOnchangeInput("price", e.target.value)}
                />

                <div className="flex flex-row justify-between gap-10">
                  <StatusSelectComponent
                    key={"status_select"}
                    value={model.status}
                    onchange={handleOnchangeInput}
                  />
                  <CategorySelect
                    value={model.category_id || ""}
                    onchange={handleOnchangeInput}
                  />
                  <CollectionSelect
                    value={model.collection_id || ""}
                    onchange={handleOnchangeInput}
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
                />
              </div>
            </TabComponent>
            <TabComponent value={value} index={2}>
              <div className="w-full flex flex-col gap-10">
                <TextField
                  label="Url Download"
                  placeholder="Url Download"
                  value={model.url_download}
                  disabled
                />
                <FileUploadComponent
                  url={model.url_download}
                  handleAfterUpload={(url) =>
                    handleOnchangeInput("url_download", url)
                  }
                />
              </div>
            </TabComponent>
          </Box>
        </DialogContent>

        <DialogActions>
          <div className="flex flex-row gap-5">
            <button
              className="border bg-blue-500 hover:bg-blue-300 px-5 py-2 text-white "
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="border px-5 py-2 text-white bg-red-500 hover:bg-red-300"
              onClick={handleCloseModal}
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

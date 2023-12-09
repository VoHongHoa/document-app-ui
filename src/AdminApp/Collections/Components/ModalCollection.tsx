import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField } from "@mui/material";
import React, { useContext } from "react";
import StatusSelectComponent from "../../Components/StatusSelectComponent/StatusSelectComponent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabComponent from "../../Components/TabComponent/TabComponent";
import { a11yProps } from "../../../utils/format";
import { CollectionsContext } from "../CollectionsContext";

export default function ModalCollection() {
  const {
    isOpenModal,
    action,
    model,

    handleCloseModal,
    handleOnChangeInput,
    handleSubmit,
  } = useContext(CollectionsContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={isOpenModal}
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
        {action === "ADD"
          ? "Add New Collection"
          : action === "EDIT"
          ? "Edit Collection"
          : "View Collection"}
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
                onChange={(e) => handleOnChangeInput("title", e.target.value)}
              />
              <TextField
                label="Theme Image"
                variant="outlined"
                placeholder="Theme Image"
                value={model.theme_image}
                onChange={(e) =>
                  handleOnChangeInput("theme_image", e.target.value)
                }
              />
              <div className="flex flex-row justify-between gap-10">
                <StatusSelectComponent
                  key={"status_select"}
                  value={model.status}
                  onchange={handleOnChangeInput}
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
                  handleOnChangeInput("description", e.target.value)
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
  );
}

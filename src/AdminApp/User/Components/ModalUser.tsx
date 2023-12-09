import { useContext } from "react";
import { UserContext } from "../UserContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import StatusSelectComponent from "../../Components/StatusSelectComponent/StatusSelectComponent";
import RoleSelectComponent from "../../Components/RoleSelectComponent/RoleSelectComponent";

export default function ModalUser() {
  const {
    handleCloseModal,
    isOpenModal,
    handleOnChangeInput,
    action,
    handleSubmit,
    model,
  } = useContext(UserContext);
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
          ? "Add new User"
          : action === "EDIT"
          ? "Edit User"
          : "View User"}
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
        <div className="w-full flex flex-col gap-10">
          <TextField
            label="Email"
            variant="outlined"
            placeholder="Email"
            disabled={action === "EDIT" ? true : false}
            type="text"
            value={model.email}
            onChange={(e) => handleOnChangeInput("email", e.target.value)}
          />
          <TextField
            label="Username"
            variant="outlined"
            placeholder="Username"
            disabled={action === "EDIT" ? true : false}
            type="text"
            value={model.username}
            onChange={(e) => handleOnChangeInput("username", e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            placeholder="Password"
            disabled={action === "EDIT" ? true : false}
            value={model.password}
            type="password"
            onChange={(e) => handleOnChangeInput("password", e.target.value)}
          />
          <TextField
            label="Display Name"
            variant="outlined"
            placeholder="Display Name"
            value={model.display_name}
            onChange={(e) =>
              handleOnChangeInput("display_name", e.target.value)
            }
          />
          <TextField
            label="Avatar"
            variant="outlined"
            placeholder="Avatar"
            value={model.avatar}
            onChange={(e) => handleOnChangeInput("avatar", e.target.value)}
          />
          <div className="flex flex-row justify-between gap-10">
            <RoleSelectComponent
              key={"role_select"}
              value={model.role}
              onchange={handleOnChangeInput}
            />
            <StatusSelectComponent
              key={"status_select"}
              value={model.status}
              onchange={handleOnChangeInput}
            />
          </div>
        </div>
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

import { useContext } from "react";
import { TextField } from "@mui/material";

import Button from "@mui/material/Button";
import { UserProfilePageContext } from "./UserProfilePageContext";
import RoleSelectComponent from "../../AdminApp/Components/RoleSelectComponent/RoleSelectComponent";
import { formatDate } from "../../utils/format";

export default function UserProfilePageContent() {
  const { action, model, handleOnchangeInput, handleChangeMode, handleSubmit } =
    useContext(UserProfilePageContext);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="flex flex-col flex-wrap gap-5">
        <TextField
          label="Id"
          variant="outlined"
          placeholder="Id"
          disabled
          type="text"
          value={model._id}
        />
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Email"
          disabled
          type="text"
          value={model.email}
        />
        <TextField
          label="Username"
          variant="outlined"
          placeholder="Username"
          disabled
          type="text"
          value={model.username}
        />
        <TextField
          label="Display Name"
          variant="outlined"
          placeholder="Display Name"
          disabled={action === "VIEW" ? true : false}
          type="text"
          value={model.display_name}
          onChange={(e) => handleOnchangeInput("display_name", e.target.value)}
        />
        <TextField
          label="Avatar"
          variant="outlined"
          placeholder="Avatar"
          disabled={action === "VIEW" ? true : false}
          type="text"
          value={model.avatar}
          onChange={(e) => handleOnchangeInput("avatar", e.target.value)}
        />
        <RoleSelectComponent value={model.role} disable={true} />
        <TextField
          label="Your E-point"
          variant="outlined"
          placeholder="Your E-point"
          disabled
          type="number"
          value={model.e_point}
        />

        <TextField
          label="Create At"
          variant="outlined"
          placeholder="Create At"
          disabled
          type="text"
          value={formatDate(model.createdAt || new Date())}
        />
      </div>

      <div className="mt-4 space-x-2">
        {action === "VIEW" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleChangeMode("EDIT")}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex flex-row flex-wrap gap-2">
            <Button variant="outlined" color="success" onClick={handleSubmit}>
              Save change
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleChangeMode("VIEW")}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

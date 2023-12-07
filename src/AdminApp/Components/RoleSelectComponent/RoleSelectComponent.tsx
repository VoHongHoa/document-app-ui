import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { RoleEnum } from "../../../utils";
type TKeyInput = "role";
interface IPropsStatusSelect {
  value: string;
  onchange?: (keyInput: TKeyInput, value: string) => void;
  disable?: boolean;
}
export default function RoleSelectComponent(props: IPropsStatusSelect) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Role</InputLabel>
      <Select
        className=""
        value={props.value}
        label="Role"
        disabled={props.disable ? props.disable : false}
        onChange={(e) =>
          props.onchange && props.onchange("role", e.target.value)
        }
      >
        <MenuItem value={RoleEnum.ADMIN}>{RoleEnum.ADMIN}</MenuItem>
        <MenuItem value={RoleEnum.USER}>{RoleEnum.USER}</MenuItem>
      </Select>
    </FormControl>
  );
}

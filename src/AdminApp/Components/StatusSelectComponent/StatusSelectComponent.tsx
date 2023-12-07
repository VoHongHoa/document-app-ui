import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { StatusEnum } from "../../../utils";
type TKeyInput = "status";
interface IPropsStatusSelect {
  value: string;
  onchange?: (keyInput: TKeyInput, value: string) => void;
  disable?: boolean;
}
export default function StatusSelectComponent(props: IPropsStatusSelect) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        className=""
        value={props.value}
        label="Status"
        disabled={props.disable ? props.disable : false}
        onChange={(e) =>
          props.onchange && props.onchange("status", e.target.value)
        }
      >
        <MenuItem value={StatusEnum.Active}>{StatusEnum.Active}</MenuItem>
        <MenuItem value={StatusEnum.Inactive}>{StatusEnum.Inactive}</MenuItem>
      </Select>
    </FormControl>
  );
}

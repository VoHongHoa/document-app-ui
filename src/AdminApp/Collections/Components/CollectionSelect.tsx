import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { StatusEnum } from "../../../utils";
import { useContext, useEffect, useState } from "react";
import { Category, ExceptionResponse } from "../../../interface";
import { CollectionService } from "../../../Service";
import { AppContext } from "../../../AppContext";
type TKeyInput = "collection_id";
interface IPropsStatusSelect {
  value: string;
  onchange?: (keyInput: TKeyInput, value: string) => void;
  disable?: boolean;
}
export default function CollectionSelect(props: IPropsStatusSelect) {
  const { handleOpenNotify } = useContext(AppContext);
  const [data, setData] = useState<Category[]>([]);
  const fetchData = () => {
    CollectionService.getDataSelect(StatusEnum.Active)
      .then((response) => {
        if (response) {
          setData(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };

  useEffect(() => {
    return fetchData();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">Collection</InputLabel>
      <Select
        className=""
        value={props.value}
        label="Collection"
        disabled={props.disable ? props.disable : false}
        onChange={(e) =>
          props.onchange && props.onchange("collection_id", e.target.value)
        }
      >
        {data.map((item, index) => {
          return (
            <MenuItem key={`${item._id}_${item.title}`} value={item._id}>
              {item.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

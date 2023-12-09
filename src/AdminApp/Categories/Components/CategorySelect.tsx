import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Category, ExceptionResponse } from "../../../interface";
import { CategoryService } from "../../../Service";
import { AppContext } from "../../../AppContext";
type TKeyInput = "category_id";
interface IPropsStatusSelect {
  value: string;
  onchange?: (keyInput: TKeyInput, value: string) => void;
  disable?: boolean;
  status?: string;
}
export default function CategorySelect(props: IPropsStatusSelect) {
  const { handleOpenNotify } = useContext(AppContext);
  const [data, setData] = useState<Category[]>([]);
  const fetchCategoryData = () => {
    CategoryService.getDataSelect(props.status || "")
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
    return fetchCategoryData();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        className=""
        value={props.value}
        label="Category"
        disabled={props.disable ? props.disable : false}
        onChange={(e) =>
          props.onchange && props.onchange("category_id", e.target.value)
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

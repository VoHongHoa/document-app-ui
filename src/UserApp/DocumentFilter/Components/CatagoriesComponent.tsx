import { useContext, useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AppContext } from "../../../AppContext";
import { Category, ExceptionResponse } from "../../../interface";
import { CategoryService } from "../../../Service";
import { StatusEnum } from "../../../utils";
import { DocumentFilterContext } from "../DocumentFilterContext";

export default function CatagoriesComponent() {
  const { handleOpenNotify } = useContext(AppContext);
  const { handleOnchangeSearchModel, searchModel } = useContext(
    DocumentFilterContext
  );
  const [data, setData] = useState<Category[]>([]);
  const fetchData = () => {
    CategoryService.getDataSelect(StatusEnum.Active)
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
  const handleChangeCategories = (item: Category) => {
    handleOnchangeSearchModel("category_id", item._id);
  };

  const handleViewAll = () => {
    handleOnchangeSearchModel("category_id", "");
  };

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="Category Document"
      subheader={
        <ListSubheader
          component="div"
          id="Category Document"
          sx={{ fontSize: "18px" }}
        >
          Category Document
        </ListSubheader>
      }
    >
      <ListItemButton
        key={`all-category`}
        onClick={() => handleViewAll()}
        sx={{
          backgroundColor: `${searchModel.category_id === "" ? "blue" : ""}`,
          color: `${searchModel.category_id === "" ? "white" : "black"}`,
        }}
      >
        <ListItemText primary="Tất cả" />
      </ListItemButton>
      {data &&
        data.map((item, index) => {
          return (
            <ListItemButton
              key={`${item._id}`}
              onClick={() => handleChangeCategories(item)}
              sx={{
                backgroundColor: `${
                  searchModel.category_id === item._id ? "blue" : ""
                }`,
                color: `${
                  searchModel.category_id === item._id ? "white" : "black"
                }`,
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
    </List>
  );
}

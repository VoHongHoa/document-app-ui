import { useContext, useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AppContext } from "../../../AppContext";
import { Collection, ExceptionResponse } from "../../../interface";
import { CollectionService } from "../../../Service";
import { StatusEnum } from "../../../utils";
import { DocumentFilterContext } from "../../DocumentFilter/DocumentFilterContext";
import { DocumentByCollectionContext } from "../DocumentByCollectionContext";
import { useNavigate } from "react-router-dom";

export default function CollectionComponent() {
  const { handleOpenNotify } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useContext(DocumentByCollectionContext);
  const [data, setData] = useState<Collection[]>([]);
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
  const handleOnchangeCollection = (collectionId: string) => {
    navigate(`/document-collection/${collectionId}`);
  };

  useEffect(() => {
    return fetchData();
  }, []);

  return (
    <List
      sx={{
        width: "100%",
      }}
      component="nav"
      aria-labelledby="Category Document"
      subheader={
        <ListSubheader
          component="div"
          id="Category Document"
          sx={{ fontSize: "18px" }}
        >
          Collection Document
        </ListSubheader>
      }
    >
      {data &&
        data.map((item, index) => {
          return (
            <ListItemButton
              key={`${item._id}`}
              onClick={() => handleOnchangeCollection(item._id)}
              sx={{
                backgroundColor: `${id === item._id ? "blue" : ""}`,
                color: `${id === item._id ? "white" : "black"}`,
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
    </List>
  );
}

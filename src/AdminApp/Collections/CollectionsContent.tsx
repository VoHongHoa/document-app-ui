import { useContext } from "react";
import { Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "../Components/TableComponent/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { StatusEnum } from "../../utils";
import { CollectionsContext } from "./CollectionsContext";
import ModalCollection from "./Components/ModalCollection";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    renderCell(params) {
      return (
        <div
          className={
            params.value === StatusEnum.Active
              ? "text-green-600 border p-2 bg-green-200 font-bold"
              : "text-red-600 border p-2 bg-red-200 font-bold"
          }
        >
          {params.value}
        </div>
      );
    },
  },
  {
    field: "theme_image",
    headerName: "Theme Image",
    width: 250,
    renderCell(params) {
      return <Avatar src={params.value} />;
    },
  },
];
export default function CollectionsContent() {
  const {
    handleOpenModal,
    handleDelete,
    handleEdit,
    handleView,
    processDataTable,
  } = useContext(CollectionsContext);
  return (
    <div className="flex flex-col flex-wrap p-10">
      <div className="flex flex-row flex-wrap justify-between">
        <span className="font-bold text-2xl"> Collections </span>

        <Button
          variant="contained"
          component="span"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal("ADD")}
        >
          New Collection
        </Button>
        <ModalCollection />
      </div>

      <div className=" flex flex-col gap-5 w-full">
        <div></div>
        <DataTable
          columns={columns}
          rows={processDataTable}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
        />
      </div>
    </div>
  );
}

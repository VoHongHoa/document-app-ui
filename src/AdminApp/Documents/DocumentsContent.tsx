import React, { useContext } from "react";
import { DocumentsContext } from "./DocumentContext";
import DataTable from "../Components/TableComponent/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { StatusEnum } from "../../utils";
import ModalDocument from "./Components/ModalDocument";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "title", headerName: "Title", width: 150 },
  { field: "total_page", headerName: "Total Page", width: 120 },
  { field: "price", headerName: "Price", width: 120 },
  { field: "total_view", headerName: "Total View", width: 120 },
  { field: "total_download", headerName: "Total Download", width: 120 },
  {
    field: "url_download",
    headerName: "Download",
    width: 100,
    renderCell(params) {
      return (
        <a className="" href={params.value} target="_blank">
          <DownloadIcon />
        </a>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
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
    field: "theme_image ",
    headerName: "Theme Image",
    width: 150,
    renderCell(params) {
      return <Avatar src={params.value} />;
    },
  },
];
export default function DocumentsContent() {
  const {
    handleOpenModal,
    handleDelete,
    handleEdit,
    handleView,
    processDataTable,
  } = useContext(DocumentsContext);
  return (
    <div className="flex flex-col flex-wrap p-10">
      <div className="flex flex-row flex-wrap justify-between">
        <span className="font-bold text-2xl"> Documents </span>

        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          onClick={() => handleOpenModal("ADD")}
        >
          Upload Document
        </Button>
        <ModalDocument />
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

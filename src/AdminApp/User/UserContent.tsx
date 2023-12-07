import React, { useContext, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "./UserContext";
import DataTable from "../Components/TableComponent/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import ModalUser from "./Components/ModalUser";
import { StatusEnum } from "../../utils";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "display_name", headerName: "Display Name", width: 150 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 150,
    renderCell(params) {
      return <Avatar src={params.value} />;
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
  { field: "role", headerName: "Role", width: 150 },
];

export default function UserContent() {
  const {
    handleDelete,
    handleEdit,
    handleView,
    processDataTable,
    handleOpenModal,
  } = useContext(UserContext);

  return (
    <div className="flex flex-col flex-wrap p-10">
      <div className="flex flex-row flex-wrap justify-between">
        <span className="font-bold text-2xl"> Users </span>
        <button
          className="border p-2 items-center bg-blue-500 text-white"
          onClick={() => handleOpenModal("ADD")}
        >
          New User
        </button>
        <ModalUser />
      </div>
      <div className=" flex flex-col gap-5">
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

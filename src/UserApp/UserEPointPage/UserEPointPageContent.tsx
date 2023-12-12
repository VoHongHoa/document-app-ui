import { useContext } from "react";
import { UserEPointPageContext } from "./UserEPointPageContext";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../AdminApp/Components/TableComponent/TableComponent";
export default function UserEPointPageContent() {
  const { processData } = useContext(UserEPointPageContext);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "document_title", headerName: "Document", width: 200 },
    { field: "value", headerName: "EPoint", width: 200 },
    { field: "source", headerName: "Source", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
  ];
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User EPoint History</h2>
      <div className="">
        <DataTable
          key={"user_document_datatable"}
          showAction={false}
          columns={columns}
          rows={processData}
          showCheckbox={false}
          showIdColum={false}
        />
      </div>
    </div>
  );
}

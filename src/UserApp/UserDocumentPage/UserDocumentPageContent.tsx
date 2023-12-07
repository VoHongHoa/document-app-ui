import DataTable from "../../AdminApp/Components/TableComponent/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
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
];
export default function UserDocumentPageContent() {
  const rows: never[] = [];
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="">
        <DataTable
          key={"user_document_datatable"}
          showAction={false}
          columns={columns}
          rows={rows}
        />
      </div>
    </div>
  );
}

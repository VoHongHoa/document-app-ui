import DataTable from "../../AdminApp/Components/TableComponent/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { Document } from "../../interface";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModalViewDocumentComponent from "../Components/ModalViewDocumentComponent/ModalViewDocumentComponent";
import { UserDocumentUploadPageContext } from "./UserDocumentUploadPageContext";

export default function UserDocumentDownloadPageContent() {
  const {
    processDataTable,
    handleCloseModal,
    handleOpenMdal,
    isOpenModal,
    urlQuickView,
  } = useContext(UserDocumentUploadPageContext);
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
          <span
            className="cursor-pointer"
            onClick={() => handleDownload(params.value)}
          >
            <DownloadIcon />
          </span>
        );
      },
    },
    {
      field: "theme_image",
      headerName: "Theme Image",
      width: 100,
      renderCell(params) {
        return (
          <Avatar
            alt="theme_image"
            src={params.value}
            className="cursor-pointer relative"
          />
        );
      },
    },
    {
      field: "quick_view_link",
      headerName: "Quick View",
      width: 100,
      renderCell(params) {
        return (
          <RemoveRedEyeIcon
            className="cursor-pointer"
            onClick={() => handleOpenQuickView(params.value)}
          />
        );
      },
    },
  ];
  const handleOpenQuickView = (url: string) => {
    handleOpenMdal(url);
  };
  const handleDownload = async (item: Document) => {
    try {
      const response = await fetch(item.url_download);
      if (!response.ok) {
        throw new Error(`Failed to fetch the file. Status: ${response.status}`);
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloadedFile.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", (error as Error).message);
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Documents</h2>
      <div className="">
        <DataTable
          key={"user_document_datatable"}
          showAction={false}
          columns={columns}
          rows={processDataTable}
          showIdColum={false}
          showCheckbox={false}
        />
        <ModalViewDocumentComponent
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
          url={urlQuickView}
        />
      </div>
    </div>
  );
}

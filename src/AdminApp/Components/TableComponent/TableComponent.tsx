import * as React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Button, Popover, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

export interface IDatatableProps {
  columns: GridColDef[];
  rows: any;
  showAction?: boolean;
  showIdColum?: boolean;
  showCheckbox?: boolean;
  handleView?: (id: string) => void;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& ::-webkit-scrollbar": {
    height: "8px",
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#f5f5f5",
  },
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: "inset 0 0 1px rgba(0,0,0,.3)",
    backgroundColor: "grey",
  },
}));

export default function DataTable(props: IDatatableProps) {
  const renderDefaulColum = () => {
    const defaultColum: GridColDef[] = [
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 80,
        renderCell: (params: GridCellParams) => (
          <div className="z-50">
            <IconButton
              aria-label="actions"
              onClick={(e) => handleActionsClick(e, params.row.id)}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        ),
      },
    ];
    if (props.showAction === false) {
      return [];
    }

    return defaultColum;
  };

  const columns = props.columns.concat(renderDefaulColum());
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  const handleSelectionModelChange = (
    newSelectionModel: GridRowSelectionModel
  ) => {
    setSelectionModel(newSelectionModel);
  };

  const handleActionsClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    // Implement your view logic here
    if (selectedRowId !== null && props.handleView) {
      props.handleView(selectedRowId);
    }

    handleClose();
  };

  const handleEdit = () => {
    // Implement your edit logic here
    if (selectedRowId !== null && props.handleEdit) {
      props.handleEdit(selectedRowId);
    }

    handleClose();
  };

  const handleDelete = () => {
    // Implement your delete logic here
    if (selectedRowId !== null && props.handleDelete) {
      props.handleDelete(selectedRowId);
    }
    handleClose();
  };

  return (
    <div className="h-[600px] w-[100%] custom-scrollbar ">
      <StyledDataGrid
        className="custom-scrollbar"
        rows={props.rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
          columns: {
            columnVisibilityModel: {
              id: props.showIdColum === false ? props.showIdColum : true,
            },
          },
        }}
        rowHeight={60}
        checkboxSelection={
          props.showCheckbox === false ? props.showCheckbox : true
        }
        disableRowSelectionOnClick
        editMode="cell"
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionModelChange}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
      >
        <div className="w-40">
          <div
            className="pr-2 cursor-pointer flex flex-row items-center hover:bg-slate-300"
            onClick={handleView}
          >
            <IconButton aria-label="actions">
              <VisibilityIcon fontSize="small" className="text-black" />
            </IconButton>
            <span>View</span>
          </div>
          <div
            className="pr-2 cursor-pointer flex flex-row items-center hover:bg-slate-300"
            onClick={handleEdit}
          >
            <IconButton aria-label="actions">
              <EditIcon fontSize="small" className="text-black" />
            </IconButton>
            <span>Edit</span>
          </div>
          <div
            className="pr-2 cursor-pointer flex flex-row items-center text-red-600 hover:bg-slate-300"
            onClick={handleDelete}
          >
            <IconButton aria-label="actions">
              <DeleteIcon fontSize="small" className="text-red-600" />
            </IconButton>
            <span>Delete</span>
          </div>
        </div>
      </Popover>
    </div>
  );
}

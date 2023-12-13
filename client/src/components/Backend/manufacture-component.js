import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AuthService from "../../services/auth.service";
import { useState, useEffect } from "react";
import PostManufactureComponent from "./postManufacture-component";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import ManufactureService from "../../services/manufacture.service";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const id = "";
  const handleClick = () => {
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        MAN_NAME: "",
        PHO_NUM: "",
        MAN_LIAISON: "",
        CITY: "",
        DISTRICT: "",
        ROAD: "",
        NUM: "",
        FLOOR: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        <p>新增廠商</p>
      </Button>
    </GridToolbarContainer>
  );
}

export default function ManufactureComponent({ currentUser, setCurrentUser }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const columnGroupingModel = [
    {
      groupId: "廠商地址",
      children: [
        { field: "CITY" },
        { field: "DISTRICT" },
        { field: "ROAD" },
        { field: "NUM" },
        { field: "FLOOR" },
      ],
    },
  ];

  const columns = [
    { field: "id", headerName: "id", flex: 0.5, editable: true },
    {
      field: "MAN_NAME",
      headerName: "廠商名稱",
      flex: 1,
      editable: true,
    },
    {
      field: "PHO_NUM",
      headerName: "聯絡電話",
      flex: 1,
      editable: true,
    },
    {
      field: "MAN_LIAISON",
      headerName: "聯絡人",
      flex: 1,
      editable: true,
    },
    { field: "CITY", headerName: "縣市", editable: true, flex: 0.5 },
    { field: "DISTRICT", headerName: "區", editable: true, flex: 0.5 },
    { field: "ROAD", headerName: "路/街", editable: true, flex: 0.5 },
    { field: "NUM", headerName: "號", editable: true, flex: 0.5 },
    { field: "FLOOR", headerName: "樓層", editable: true, flex: 0.5 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [manufactureData, setManufactureData] = useState(null);
  useEffect(() => {
    ManufactureService.get()
      .then((data) => {
        // console.log(data);
        setManufactureData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (manufactureData) {
      const mappedRows = manufactureData.map((manufacture) => ({
        id: manufacture.id,
        MAN_NAME: manufacture.MAN_NAME,
        PHO_NUM: manufacture.PHO_NUM,
        MAN_LIAISON: manufacture.MAN_LIAISON,
        CITY: manufacture.CITY,
        DISTRICT: manufacture.DISTRICT,
        ROAD: manufacture.ROAD,
        NUM: manufacture.NUM,
        FLOOR: manufacture.FLOOR,
      }));
      setRows(mappedRows);
    }
  }, [manufactureData]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    console.log(id);
    ManufactureService.delete(id)
      .then((res) => {
        console.log("刪除成功");
        window.location.reload(); // 刷新頁面，以取得database最新資料
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleGetUser = () => {
    console.log(AuthService.getAllUsers());
  };

  const processRowUpdate = (newRow) => {
    try {
      console.log(newRow);
      console.log(newRow.id);
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      if (!newRow.isNew) {
        console.log("我在axios.patch");
        ManufactureService.patch(newRow.id, updatedRow).then((response) => {
          console.log("更新成功:", response.data);
          // window.location.reload(); // 刷新頁面，以取得database最新資料
        });
      } else {
        console.log("我在axios.post");
        const postData = {
          id: updatedRow.id,
          MAN_NAME: updatedRow.MAN_NAME,
          PHO_NUM: updatedRow.PHO_NUM,
          MAN_LIAISON: updatedRow.MAN_LIAISON,
          CITY: updatedRow.CITY,
          DISTRICT: updatedRow.DISTRICT,
          ROAD: updatedRow.ROAD,
          NUM: updatedRow.NUM,
          FLOOR: updatedRow.FLOOR,
          isNew: updatedRow.isNew,
        };
        ManufactureService.post(postData).then((response) => {
          console.log("新增成功:", response.data);
          window.location.reload(); // 刷新頁面，以取得database最新資料
        });
      }
      return updatedRow;
    } catch (e) {
      console.log("這裡有問題");
      return e;
    }
  };

  return (
    <>
      <Button onClick={handleGetUser}>click to get all users</Button>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Button onClick={handleClickOpen}>
          <p>新增廠商</p>
        </Button>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.id}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error)}
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>

      {/* 新增廠商 */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ height: "fit-content" }}
      >
        <div>
          <DialogTitle
            sx={{ m: 0, p: 2, zIndex: 1 }}
            id="customized-dialog-title"
          >
            <p>新增廠商</p>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* 使用一个容器来包装DialogContent */}
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <DialogContent
            dividers
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PostManufactureComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </DialogContent>
        </div>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            <p>取消</p>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

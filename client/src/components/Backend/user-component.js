import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EmployeeService from "../../services/employee.service";
import { useState, useEffect } from "react";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const email = "";
  const handleClick = () => {
    setRows((oldRows) => [
      ...oldRows,
      {
        username:"",
        email,
        password: "",
        role: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [email]: { mode: GridRowModes.Edit, fieldToFocus: "email" },
    }));
  };
  
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        <p>新增帳號</p>
      </Button>
    </GridToolbarContainer>
  );
}

export default function UserComponent() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const columns = [
    { field: "username", headerName: "username", flex: 1, editable: true },
    {
      field: "email",
      headerName: "email",
      flex: 1,
      editable: true,
    },
    {
      field: "password",
      headerName: "password",
      flex: 1,
      editable: true,
    },
    {
      field: "role",
      headerName: "role",
      flex: 1,
      editable: true,

      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
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

  const [authData, setAuthData] = useState(null);
  useEffect(() => {
    EmployeeService.getAllUsers()
      .then((data) => {
        // console.log(data);
        setAuthData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (authData) {
      const mappedRows = authData.map((user) => ({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      }));
      setRows(mappedRows);
    }
  }, [authData]);

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
    setRows(rows.filter((row) => row.email !== id));
    EmployeeService.delete(id).then((res) => {
      console.log("刪除成功")
      window.location.reload(); // 刷新頁面，以取得database最新資料
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.email === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.email !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

 

  const processRowUpdate = (newRow) => {
    try {
      console.log(newRow);
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.email === newRow.id ? updatedRow : row)));
      if (!newRow.isNew) {
        console.log("我在axios.patch")
        EmployeeService.patch(newRow.email, newRow).then((response) => {
          console.log("更新成功:", response.data);
        });
      } else {
        console.log("我在axios.post")
        EmployeeService.register(
          updatedRow.username,
          updatedRow.email,
          updatedRow.password,
          updatedRow.role,
          updatedRow.isNew,
        ).then((response) => {
          console.log("新增成功:", response.data);
          window.location.reload(); // 刷新頁面，以取得database最新資料
        });
      }
      return updatedRow;
    } catch (e) {
      console.log("這裡有問題");
    }
  };

  return (
    <>
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
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.email}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error)}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </>
  );
}

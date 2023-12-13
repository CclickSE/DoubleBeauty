import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AuthService from "../../services/auth.service";
import CustomerService from "../../services/customer.service";
import { useState, useEffect } from "react";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import ProductService from "../../services/product.service";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const id = "";
  const handleClick = () => {
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        productname: "",
        manufacture: "",
        price: "",
        count: "",
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
        <p>新增商品</p>
      </Button>
    </GridToolbarContainer>
  );
}

export default function TestPage() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const columns = [
    { field: "id", headerName: "ID", flex: 1, editable: true },
    {
      field: "productname",
      headerName: "product name",
      flex: 2,
      editable: true,
    },
    {
      field: "manufacture",
      headerName: "manufacture",
      flex: 2,
      editable: true,
    },
    {
      field: "price",
      headerName: "price",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "count",
      headerName: "count",
      sortable: false,
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

  const [productData, setProductData] = useState(null);
  useEffect(() => {
    ProductService.get()
      .then((data) => {
        console.log(data);
        setProductData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (productData) {
      const mappedRows = productData.map((product) => ({
        id: product.id,
        productname: product.productname,
        manufacture: product.manufacture,
        price: product.price,
        count: product.count,
      }));
      setRows(mappedRows);
    }
  }, [productData]);

  // const handleDelete = () => {
  //   CustomerService.deleteAll()
  //     .then(console.log("已全部刪除"))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

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
    ProductService.delete(id).then((res) => {
      console.log("刪除成功");
      window.location.reload(); // 刷新頁面，以取得database最新資料
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
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      if (!newRow.isNew) {
        console.log("我在axios.patch");
        ProductService.patch(newRow.id, newRow).then((response) => {
          console.log("更新成功:", response.data);
        });
      } else {
        console.log("我在axios.post");
        ProductService.post(
          updatedRow.id,
          updatedRow.productname,
          updatedRow.manufacture,
          updatedRow.price,
          updatedRow.count,
          updatedRow.isNew
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
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.id}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
      {/* <Button onClick={handleDelete}>
        <p>刪除所有客戶資料</p>
      </Button> */}
    </>
  );
}

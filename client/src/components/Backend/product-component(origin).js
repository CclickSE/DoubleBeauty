import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ProductService from "../../services/product.service";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "productName",
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
    flex: 1, // valueGetter: (params) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const ProductComponent = () => {
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    console.log("我準備要get product了")
    ProductService.get()
      .then((data) => {
        // console.log(data);
        setProductData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (productData) {
      const mappedRows = productData.map((product) => ({
        id: product.id,
        productName: product.productname,
        manufacture: product.manufacture,
        price: product.price,
        count: product.count,
      }));
      setRows(mappedRows);
    }
  }, [productData]);

  const [editedRows, setEditedRows] = React.useState({});

  const handleEditCellChange = (params) => {
    console.log("I'm here")
    const updatedRow = { ...editedRows[params.id], [params.field]: params.props.value };
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [params.id]: updatedRow,
    }));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "100%",
        // marginTop: "5rem"
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        onEditCellChange={handleEditCellChange}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          // 在這裡處理錯誤，可以打印錯誤訊息或進行其他操作
          console.error('Error while processing row update:', error);
        }}
        editMode="cell"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ProductComponent;

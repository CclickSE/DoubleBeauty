import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProductDialogComponent = ({ dialogOpen, setDialogOpen, productName, productPrice, productManu, productCount }) => {

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          <h2>{productName}</h2>
        </DialogTitle>
        <DialogContent style={{width: "30rem", padding: "2rem"}}>
          <DialogContentText id="alert-dialog-description">
            <p>{productPrice}</p>
            <p>{productManu}</p>
            <p>{productCount}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}><p>取消</p></Button>
          <Button onClick={handleClose} autoFocus>
            <p>加入購物車</p>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDialogComponent;

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  styled,
} from "@mui/material";
import React from "react";

const DialogWrap = styled(Dialog)({
  h2: {
    fontFamily: "Poppins",
  },
  button: {
    fontFamily: "Poppins",
  },
});

function ConfirmationBox({ open, title, handleClose, handleDelete }) {
  return (
    <>
      <DialogWrap
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title || "Are you sure you want to delete!!!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </DialogWrap>
    </>
  );
}

export default ConfirmationBox;

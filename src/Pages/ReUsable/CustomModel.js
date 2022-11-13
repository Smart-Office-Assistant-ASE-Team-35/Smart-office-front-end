import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";

const ModelWrapper = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  borderRadius: "10px",
  padding: "30px",
  background: "#fff",
  h3: {
    marginBottom: "20px",
  },
});

function CustomModel({
  open,
  onClose,
  modelTitle,
  children,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModelWrapper>
        <h3>{modelTitle}</h3>
          {children}
      </ModelWrapper>
    </Modal>
  );
}

export default CustomModel;

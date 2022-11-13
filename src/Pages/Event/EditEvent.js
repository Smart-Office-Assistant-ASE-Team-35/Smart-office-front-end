import React, { useState } from "react";
import { Box, styled, Tooltip } from "@mui/material";
import ConfirmationBox from "../ReUsable/ConfirmationBox";
import { ReactComponent as Edit } from "../../Assets/svg/Edit.svg";
import { ReactComponent as ClockSvg } from "../../Assets/svg/ClockSvg.svg";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EventWrap = styled(Box)({
  border: "1px solid #E7E7E7",
  padding: "16px",
  borderRadius: "4px",
  ".title-wrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
    ".edit-delete-wrap": {
      display: "flex",
      alignItems: "center",
      div: {
        display: "flex",
        alignItems: "center",
        marginLeft: "10px",
      },
      ".delete-wrap ": {
        path: {
          stroke: "none",
          fill: "#DD1B00",
        },
      },
    },
    svg: {
      cursor: "pointer",
      height: "24px",
      width: "24px",
      path: {
        stroke: "#5030E5",
      },
    },
  },
  ".time-wrap": {
    display: "flex",
    alignItems: "center",
    background: "#EDE9FF",
    maxWidth: "275px",
    width: "100%",
    padding: "10px 8px",
    borderRadius: "4px",
    svg: {
      marginRight: "4px",
    },
  },
});

function EditEvent({ title, time, handleEdit, handleDelete }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <EventWrap>
      <ConfirmationBox
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <div className="title-wrapper">
        <h4>{title || "Project Signate"}</h4>
        <div className="edit-delete-wrap">
          <div className="edit-wrap" onClick={handleEdit}>
            <Tooltip title="Edit" placement="top">
              <Edit />
            </Tooltip>
          </div>
          <div className="delete-wrap" onClick={handleClickOpen}>
            <Tooltip title="Delete" placement="top">
              <DeleteOutlineOutlinedIcon />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="time-wrap">
        <ClockSvg />
        <p>{time || "3:00PM - 4:00PM, 12 Oct 2022"}</p>
      </div>
    </EventWrap>
  );
}

export default React.memo(EditEvent);

import React, { useState } from "react";
import { ReactComponent as NotifyIcon } from "../../Assets/svg/NotificationBing.svg";
import { ReactComponent as Edit } from "../../Assets/svg/Edit.svg";
import { ReactComponent as Timer } from "../../Assets/svg/Timer.svg";
import { styled, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import ConfirmationBox from "../ReUsable/ConfirmationBox";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

export const EditTaskWrap = styled(Box)({
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
      ".done-wrap": {
        path: {
          stroke: "none",
          fill: "#7056ea",
        },
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
  ".text-wrapper": {
    marginBottom: "16px",
    p: {
      height: "46px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  ".time-wrap": {
    display: "flex",
    alignItems: "center",
    background: "#EDE9FF",
    maxWidth: "200px",
    width: "100%",
    padding: "10px 8px",
    borderRadius: "4px",
    svg: {
      marginRight: "4px",
    },
  },
  ".notify-wrap": {
    marginTop: "15px",
    borderTop: "1px solid #E7E7E7",
    paddingTop: "15px",
    display: "flex",
    alignItems: "center",
    svg: {
      marginRight: "12px",
    },
    p: {
      color: "#DD1B00",
    },
  },
});

function EditTask({
  title,
  time,
  notify,
  paragraph,
  handleDone,
  handleEdit,
  handleDelete,
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <EditTaskWrap>
      <ConfirmationBox
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleDelete={handleDelete}
      />
      <ConfirmationBox
        open={done}
        title={"Are you sure you completed this Task"}
        handleClose={() => {
          setDone(false);
        }}
        handleDelete={handleDone}
      />
      <div className="title-wrapper">
        <h4>{title || "Project Sign"}</h4>
        <div className="edit-delete-wrap">
          {handleDone && (
            <div
              className="done-wrap"
              onClick={() => {
                setDone(true);
              }}
            >
              <Tooltip title="Complete" placement="top">
                <AssignmentTurnedInOutlinedIcon />
              </Tooltip>
            </div>
          )}
          {handleEdit && (
            <div className="edit-wrap" onClick={handleEdit}>
              <Tooltip title="Edit" placement="top">
                <Edit />
              </Tooltip>
            </div>
          )}
          {handleDelete && (
            <div
              className="delete-wrap"
              onClick={() => {
                setOpen(true);
              }}
            >
              <Tooltip title="Delete" placement="top">
                <DeleteOutlineOutlinedIcon />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <div className="text-wrapper">
        <p>
          {paragraph ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ad, amet possimus nostrum similique optio eligendi tenetur qui ut officia, a, est reprehenderit fugiat recusandae!"}
        </p>
      </div>
      <div className="time-wrap">
        <Timer />
        <p>{time || "3:00PM, 12 Oct 2022"}</p>
      </div>
      {handleEdit && notify && (
        <div className="notify-wrap">
          <NotifyIcon />
          <p>
            Notified you{" "}
            {notify === "1 hour"
              ? "Every Hour"
              : notify === "1 day"
              ? "Every Day"
              : notify === "2 day"
              ? "Every 2 Days"
              : notify === "3 day"
              ? "Every 3 Days"
              : "Never"}
          </p>
        </div>
      )}
    </EditTaskWrap>
  );
}

export default EditTask;

import React, { useEffect, useState } from "react";
import TitleWButton from "../ReUsable/TitleWButton";
import EditTask from "./EditTask";
import { ReactComponent as AddSvg } from "../../Assets/svg/AddSvg.svg";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import moment from "moment";
import styled from "styled-components";
import DeadlineModel from "./DeadlineModel";
import CustomModel from "../ReUsable/CustomModel";
import {
  getAllTask,
  createEventApi,
  deleteEventById,
  getEventById,
  updateEventById,
} from "../../Services/service.dashboard";
import CustomLoader from "../ReUsable/CustomLoader";

export const TabWrap = styled("div")({
  position: "relative",
  border: "1px solid #E7E7E7",
  borderRadius: "10px",
  padding: "0 24px",
  height: "62vh",
  ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
    color: "#363537",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "30px",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    padding: "10px 20px 10px",
    marginTop: "15px",
  },
  ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
    color: "#5030E5",
  },
  ".css-1aquho2-MuiTabs-indicator": {
    background: "#5030E5",
    height: "3px",
    borderRadius: "15px",
  },
  ".css-1gsv261": {
    borderColor: "#E7E7E7",
  },
  ".css-19kzrtu": {
    padding: "20px 0",
  },
  ".tabWrapper": {
    padding: "20px 0",
    height: "calc(100% - 90px)",
    overflow: "auto",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      width: "0.5em",
      marginRight: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(181,188,194,0.7)",
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: "rgba(181,188,194,0.9)",
      },
    },
  },
  ".css-8atqhb": {
    height: "100%",
  },
});

let deadlinePayload = {
  summary: "My first event!",
  location: "Hyderabad,India",
  description: "First event with nodeJS!",
  start: {
    dateTime: "2022-11-04T09:00:00-07:00",
    timeZone: "Asia/Kolkata",
  },
  end: {
    dateTime: "2022-11-05T17:00:00-07:00",
    timeZone: "Asia/Kolkata",
  },
  attendees: [],
  reminders: {
    useDefault: false,
    overrides: [
      {
        method: "email",
        minutes: 24,
      },
      {
        method: "popup",
        minutes: 10,
      },
    ],
  },
  event_type: "Deadline",
  event_status: "Pending",
  notified: "none",
};

export const TextInfo = ({ msg }) => {
  return (
    <>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h3>{msg}</h3>
      </Grid>
    </>
  );
};

export const getTime = (time) => {
  return `${moment(time).format("h:mmA").toString()}, ${moment(time)
    .format("D MMM YYYY")
    .toString()}`;
};

function Deadline() {
  const date = moment().toString();
  const _eventForm = {
    eventName: "",
    startTime: date,
    endTime: date,
    eventDate: date,
    notifyTime: "none",
  };
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [loader, setLoader] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [validation, setValidation] = useState(false);
  const [eventForm, setEventForm] = useState({ ..._eventForm });

  useEffect(() => {
    document.title = "Deadline";
    setLoader(true);
    getTaskData();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className="tabWrapper"
      >
        {value === index && (
          <Grid container spacing={3} style={{ height: "100%" }}>
            {children}
          </Grid>
        )}
      </div>
    );
  }

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handelChange = (name, value) => {
    setEventForm({
      ...eventForm,
      [name]: value,
    });
  };

  const getTaskData = async () => {
    let response = await getAllTask();
    let _allEvents = response?.data?.filter(
      (data) => data?.event_type === "Deadline"
    );
    setAllEvents(_allEvents);
    setLoader(false);
  };

  const handleEdit = async (id) => {
    let response = await getEventById(id);
    if (response?.status === 200) {
      const event = response.data.event;
      setEditId(event._id);
      setEventForm({
        ...eventForm,
        eventName: event.summary,
        startTime: event.start.dateTime,
        endTime: event.end.dateTime,
        eventDate: moment(event.start.dateTime)?.format("L"),
        notifyTime: event.notified,
      });
      if (event.event_status === "Delay") {
        deadlinePayload = {
          ...deadlinePayload,
          event_status: event.event_status,
        };
      }
      handelOpen();
    }
  };

  const handelSubmit = async () => {
    if (eventForm.eventName === "") {
      setValidation(true);
    } else {
      setLoader(true);
      let startTime = moment(eventForm.startTime).format("h:mm a").toString();
      let endTime = moment(eventForm.endTime).format("h:mm a").toString();
      let eventDate = moment(eventForm.eventDate).format("L").toString();
      const _deadlinePayload = {
        ...deadlinePayload,
        summary: eventForm.eventName,
        description: eventForm.eventName,
        start: {
          dateTime: moment(startTime + " " + eventDate).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          ),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: moment(endTime + " " + eventDate).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          ),
          timeZone: "Asia/Kolkata",
        },
        notified: eventForm.notifyTime,
      };
      editId === ""
        ? await createEventApi({
            ..._deadlinePayload,
          })
        : await updateEventById(editId, {
            ..._deadlinePayload,
            id: editId,
          });
      setEditId("");
      handleClose();
      getTaskData();
    }
  };

  const handleDone = async (id) => {
    let response = await getEventById(id);
    if (response?.status === 200) {
      const event = response.data.event;
      await updateEventById(id, {
        ...deadlinePayload,
        id: id,
        summary: event.summary,
        description: event.description,
        start: {
          dateTime: event.start.dateTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: event.end.dateTime,
          timeZone: "Asia/Kolkata",
        },
        event_status: "Done",
      });
      getTaskData();
    }
  };

  const handleDelete = async (id) => {
    setLoader(true);
    await deleteEventById(id);
    getTaskData();
  };

  const handelOpen = () => {
    setOpen(true);
  };

  const handelReset = () => {
    setEventForm({ ..._eventForm });
  };

  const handleClose = () => {
    handelReset();
    setOpen(false);
  };

  return (
    <>
      <CustomModel open={open} onClose={handleClose} modelTitle={"Deadlines"}>
        <DeadlineModel
          handelChange={handelChange}
          handelSubmit={handelSubmit}
          handleClose={handleClose}
          validation={validation}
          eventForm={eventForm}
        />
      </CustomModel>

      <TitleWButton
        title="Deadlines"
        btnIcon={<AddSvg />}
        btnText="Create"
        handelOpen={handelOpen}
      />
      <TabWrap>
        {loader ? <CustomLoader /> : ""}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Delay" {...a11yProps(1)} />
              <Tab label="Done" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {allEvents
              ?.filter((event) => event.event_status === "Pending")
              ?.map((event, index) => (
                <Grid item xs={4} key={index}>
                  <EditTask
                    title={event.summary}
                    notify={event.notified}
                    time={getTime(event.end.dateTime)}
                    handleDone={() => handleDone(event._id)}
                    handleEdit={() => handleEdit(event._id)}
                    handleDelete={() => handleDelete(event._id)}
                  />
                </Grid>
              ))}
            {allEvents?.length &&
            !allEvents?.filter((event) => event.event_status === "Pending")
              ?.length ? (
              <TextInfo msg={"No Task Check In Delay"} />
            ) : (
              ""
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {allEvents
              ?.filter((event) => event.event_status === "Delay")
              ?.map((event, index) => (
                <Grid item xs={4} key={index}>
                  <EditTask
                    title={event.summary}
                    notify={event.notified}
                    time={getTime(event.end.dateTime)}
                    handleDone={() => handleDone(event._id)}
                    handleEdit={() => handleEdit(event._id)}
                    handleDelete={() => handleDelete(event._id)}
                  />
                </Grid>
              ))}
            {allEvents?.length &&
            !allEvents?.filter((event) => event.event_status === "Delay")
              ?.length ? (
              <TextInfo msg={"No Task"} />
            ) : (
              ""
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {allEvents
              ?.filter((event) => event.event_status === "Done")
              ?.map((event, index) => (
                <Grid item xs={4} key={index}>
                  <EditTask
                    title={event.summary}
                    time={getTime(event.end.dateTime)}
                    handleDelete={() => handleDelete(event._id)}
                  />
                </Grid>
              ))}
            {allEvents?.length &&
            !allEvents?.filter((event) => event.event_status === "Done")
              ?.length ? (
              <TextInfo msg={"No Task"} />
            ) : (
              ""
            )}
          </TabPanel>
        </Box>
      </TabWrap>
    </>
  );
}

export default Deadline;

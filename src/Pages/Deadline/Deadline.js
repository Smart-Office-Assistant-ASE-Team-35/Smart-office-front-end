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

const TabWrap = styled("div")({
  border: "1px solid #E7E7E7",
  borderRadius: "10px",
  padding: "0 24px",
  height: "70vh",
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
  },
  ".css-8atqhb": {
    height: "100%",
  },
});

const deadlinePayload = {
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
};

function Deadline() {
  const date = moment().toString();
  const _eventForm = {
    eventName: "",
    startTime: date,
    endTime: date,
    eventDate: date,
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [editId, setEditId] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ ..._eventForm });

  useEffect(() => {
    document.title = "Deadline";
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
          <Grid container spacing={3}>
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
    let _allEvents = response?.data?.events?.filter(
      (data) => data.event_type === "Deadline"
    );
    setAllEvents(_allEvents);
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
      });
      handelOpen();
    }
  };

  const handelSubmit = async () => {
    editId === ""
      ? await createEventApi({
          ...deadlinePayload,
          summary: eventForm.eventName,
          description: eventForm.eventName,
          start: {
            dateTime: eventForm.startTime,
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: eventForm.endTime,
            timeZone: "Asia/Kolkata",
          },
        })
      : await updateEventById(editId, {
          ...deadlinePayload,
          id: editId,
          summary: eventForm.eventName,
          description: eventForm.eventName,
          start: {
            dateTime: eventForm.startTime,
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: eventForm.endTime,
            timeZone: "Asia/Kolkata",
          },
        });
    handleClose();
    getTaskData();
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

  const getTime = (time) => {
    return `${moment(time).format("h:mmA").toString()}, ${moment(time)
      .format("D MMM YYYY")
      .toString()}`;
  };

  return (
    <>
      <CustomModel open={open} onClose={handleClose} modelTitle={"Deadlines"}>
        <DeadlineModel
          handelChange={handelChange}
          handelSubmit={handelSubmit}
          handleClose={handleClose}
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
                    time={getTime(event.start.dateTime)}
                    handleDone={() => handleDone(event._id)}
                    handleEdit={() => handleEdit(event._id)}
                    handleDelete={() => handleDelete(event._id)}
                  />
                </Grid>
              ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {allEvents
              ?.filter((event) => event.event_status === "Delay")
              ?.map((event, index) => (
                <Grid item xs={4} key={index}>
                  <EditTask
                    title={event.summary}
                    time={getTime(event.start.dateTime)}
                    handleDone={() => handleDone(event._id)}
                    handleEdit={() => handleEdit(event._id)}
                    handleDelete={() => handleDelete(event._id)}
                  />
                </Grid>
              ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {allEvents
              ?.filter((event) => event.event_status === "Done")
              ?.map((event, index) => (
                <Grid item xs={4} key={index}>
                  <EditTask
                    title={event.summary}
                    time={getTime(event.start.dateTime)}
                    handleDone={() => handleDone(event._id)}
                    handleEdit={() => handleEdit(event._id)}
                    handleDelete={() => handleDelete(event._id)}
                  />
                </Grid>
              ))}
          </TabPanel>
        </Box>
      </TabWrap>
    </>
  );
}

export default Deadline;

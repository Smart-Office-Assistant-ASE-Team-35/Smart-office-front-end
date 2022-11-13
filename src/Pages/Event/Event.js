import React, { Fragment, useEffect, useState } from "react";
import TitleWButton from "../ReUsable/TitleWButton";
import { ReactComponent as AddSvg } from "../../Assets/svg/AddSvg.svg";
import styled from "styled-components";
import moment from "moment";
import EditEvent from "./EditEvent";
import { Grid } from "@mui/material";
import EventModel from "./EventModel";
import CustomModel from "../ReUsable/CustomModel";
import { ReactComponent as ClockSvg } from "../../Assets/svg/ClockSvg.svg";
import {
  createEventApi,
  deleteEventById,
  getAllTask,
  getEventById,
  updateEventById,
} from "../../Services/service.dashboard";

const EventWrap = styled("div")({
  border: "1px solid #E7E7E7",
  borderRadius: "10px",
  padding: "24px",
  height: "70vh",
  ".event-container": {
    height: "100%",
    overflow: "auto",
  },
  ".date-view": {
    display: "flex",
    alignItems: "center",
    background: "#EDE9FF",
    padding: "10px 15px",
    margin: "15px 0px",
    borderRadius: "5px",
    svg: {
      marginRight: "5px",
    },
  },
});

const eventPayload = {
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
  event_type: "TempararyEvent",
};

function Event() {
  const date = moment().toString();
  const _eventForm = {
    eventName: "",
    startTime: date,
    endTime: date,
    eventDate: date,
    repeatFor: "",
    repeatTil: date,
    type: "",
  };
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [dateView, setDateView] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ ..._eventForm });

  useEffect(() => {
    document.title = "Event";
    getTaskData();
  }, []);

  const handelChange = (name, value) => {
    setEventForm({
      ...eventForm,
      [name]: value,
    });
  };

  const getTaskData = async () => {
    let response = await getAllTask();
    let _allEvents = response?.data?.events?.filter(
      (data) =>
        data.event_type === "TempararyEvent" ||
        data.event_type === "DailyRoutine"
    );
    setAllEvents(_allEvents);
    let _dateView = _allEvents
      .map((event) => moment(event.start.dateTime).format("L"))
      .sort();
    setDateView([...new Set(_dateView)]);
  };

  const handleEdit = async (id) => {
    let response = await getEventById(id);
    if (response?.status === 200) {
      const event = response.data.event;
      debugger;
      setEditId(event._id);
      setEventForm({
        ...eventForm,
        eventName: event.summary,
        startTime: event.start.dateTime,
        endTime: event.end.dateTime,
        type: event.event_type,
        eventDate: moment(event.start.dateTime)?.format("L"),
        repeatFor: event.recurrence[0]?.slice(
          event.recurrence[0]?.indexOf("=") + 1,
          event.recurrence[0]?.indexOf(";")
        ),
        repeatTil: moment(
          event.recurrence[0]?.slice(
            event.recurrence[0]?.lastIndexOf("=") + 1,
            event.recurrence[0]?.lastIndexOf("T")
          )
        ).toString(),
      });
      handelOpen();
    }
  };

  const handelSubmit = async () => {
    let startTime = moment(eventForm.startTime).format("h:mm").toString();
    let endTime = moment(eventForm.startTime).format("h:mm").toString();
    let eventDate = moment(eventForm.eventDate).format("L").toString();
    let _eventPayload = {
      ...eventPayload,
      summary: eventForm.eventName,
      description: eventForm.eventName,
      start: {
        dateTime: moment(startTime + " " + eventDate).format(
          "YYYY-MM-DDThh:mm:ssZ"
        ),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: moment(endTime + " " + eventDate).format(
          "YYYY-MM-DDThh:mm:ssZ"
        ),
        timeZone: "Asia/Kolkata",
      },
      event_type: eventForm.type,
    };
    _eventPayload =
      eventForm.type === "DailyRoutine"
        ? {
            ..._eventPayload,
            recurrence: [
              `RRULE:FREQ=${eventForm.repeatFor};UNTIL=${
                moment(eventForm.repeatTil).format("YYYYMMDDTHHmmss") + "Z"
              }`,
            ],
          }
        : {
            ..._eventPayload,
          };
    console.log(_eventPayload);
    debugger;
    editId === ""
      ? await createEventApi({
          ..._eventPayload,
        })
      : await updateEventById(editId, {
          ..._eventPayload,
          id: editId,
        });
    setEditId("");
    handleClose();
    getTaskData();
  };

  const handleDelete = async (id) => {
    await deleteEventById(id);
    getTaskData();
  };

  const handelOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handelReset();
    setOpen(false);
  };

  const handelReset = () => {
    setEventForm({ ..._eventForm });
  };

  const getTime = (start, end) => {
    return `${moment(start).format("h:mmA").toString()} - ${moment(end)
      .format("h:mmA")
      .toString()}, ${moment(start).format("D MMM YYYY").toString()}`;
  };

  return (
    <>
      <CustomModel open={open} onClose={handleClose} modelTitle={"Event"}>
        <EventModel
          handelChange={handelChange}
          handelSubmit={handelSubmit}
          handleClose={handleClose}
          eventForm={eventForm}
        />
      </CustomModel>
      <TitleWButton
        title="Event"
        btnIcon={<AddSvg />}
        btnText="Create"
        handelOpen={handelOpen}
      />
      <EventWrap>
        <div className="event-container">
          {dateView?.map((date, index) => (
            <Fragment key={index}>
              <div className="date-view">
                <ClockSvg />
                {date}
              </div>
              <Grid container spacing={3}>
                {allEvents
                  ?.filter(
                    (event) => date === moment(event.start.dateTime).format("L")
                  )
                  ?.map((event, index) => (
                    <Grid item xs={4} key={index}>
                      <EditEvent
                        title={event.summary}
                        handleEdit={() => handleEdit(event._id)}
                        handleDelete={() => handleDelete(event._id)}
                        time={getTime(event.start.dateTime, event.end.dateTime)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Fragment>
          ))}
        </div>
      </EventWrap>
    </>
  );
}

export default Event;

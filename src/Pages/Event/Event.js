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
import CustomLoader from "../ReUsable/CustomLoader";
import ConfirmationBox from "../ReUsable/ConfirmationBox";

const EventWrap = styled("div")({
  position: "relative",
  border: "1px solid #E7E7E7",
  borderRadius: "10px",
  padding: "24px",
  height: "62vh",
  ".event-container": {
    height: "100%",
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

export const getStartEndTime = (start, end) => {
  return `${moment(start).format("h:mmA").toString()} - ${moment(end)
    .format("h:mmA")
    .toString()}, ${moment(start).format("D MMM YYYY").toString()}`;
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
  const [event, setEvent] = useState({});
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [check, setCheck] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dateView, setDateView] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [validation, setValidation] = useState(false);
  const [eventForm, setEventForm] = useState({ ..._eventForm });
  useEffect(() => {
    document.title = "Event";
    setLoader(true);
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
    let _allEvents = response?.data?.filter((data) => !data.event_type);
    // _allEvents = _allEvents?.map((_event) => {
    //   if (_event.recurringEventId) {
    //     _event.event_type = "TempararyEvent";
    //   } else {
    //     _event.event_type = "DailyRoutine";
    //   }
    //   return _event;
    // });
    setAllEvents(_allEvents);
    let _dateView = _allEvents
      ?.map((event) => moment(event.start.dateTime).format("L"))
      ?.sort();
    setDateView([...new Set(_dateView)]);
    setLoader(false);
  };

  const handleEdit = async (id) => {
    let response = await getEventById(id);
    if (response?.status === 200) {
      const event = response.data.event;
      setEditId(event.id);
      setEventForm({
        ...eventForm,
        eventName: event.summary,
        startTime: event.start.dateTime,
        endTime: event.end.dateTime,
        type: event?.recurrence?.length ? "DailyRoutine" : "TempararyEvent",
        eventDate: moment(event.start.dateTime)?.format("L"),
        repeatFor: event?.recurrence?.[0]?.slice(
          event?.recurrence?.[0]?.indexOf("=") + 1,
          event?.recurrence?.[0]?.indexOf(";")
        ),
        repeatTil: moment(
          event?.recurrence?.[0]?.slice(
            event?.recurrence?.[0]?.lastIndexOf("=") + 1,
            event?.recurrence?.[0]?.lastIndexOf("T")
          )
        ).toString(),
      });
      handelOpen();
    }
  };

  const handelSubmit = async () => {
    let valid = true;
    if (eventForm.eventName === "") {
      valid = false;
    } else if (eventForm.type === "") {
      valid = false;
    } else if (
      eventForm.type === "DailyRoutine" &&
      eventForm.repeatFor === ""
    ) {
      valid = false;
    }
    if (!valid) {
      setValidation(!valid);
    } else {
      setLoader(true);
      let startTime = moment(eventForm.startTime).format("h:mm a").toString();
      let endTime = moment(eventForm.endTime).format("h:mm a").toString();
      let eventDate = moment(eventForm.eventDate).format("L").toString();
      let _eventPayload = {
        ...eventPayload,
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
        event_type: eventForm.type,
      };
      _eventPayload =
        eventForm.type === "DailyRoutine"
          ? {
              ..._eventPayload,
              recurrence: [
                `RRULE:FREQ=${eventForm.repeatFor};UNTIL=${
                  moment(eventForm.repeatTil).format("YYYYMMDDT")+"182959Z"
                }`,
              ],
            }
          : {
              ..._eventPayload,
            };
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
    }
  };

  const handleDelete = async (_id) => {
    setLoader(true);
    deleteAll
      ? await deleteEventById(event.recurringEventId)
      : await deleteEventById(_id || event.id);
    setCheck(false);
    setEvent({});
    getTaskData();
    setDeleteAll(false);
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

  const deleteAllEvent = (_deleteAll) => {
    setCheck(true);
    setDeleteAll(_deleteAll);
  };

  return (
    <>
      <ConfirmationBox
        open={check}
        handleClose={() => setCheck(false)}
        handleDelete={() => handleDelete()}
      />
      <CustomModel open={open} onClose={handleClose} modelTitle={"Event"}>
        <EventModel
          handelChange={handelChange}
          handelSubmit={handelSubmit}
          handleClose={handleClose}
          validation={validation}
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
        {loader ? <CustomLoader /> : ""}
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
                    (event) => date.toString() === moment(event.start.dateTime).format("L").toString()
                  )
                  ?.map((event, index) => (
                    <Grid item xs={4} key={index}>
                      <EditEvent
                        id={event.id}
                        title={event.summary}
                        handleEdit={() => {
                          handleEdit(event.recurringEventId || event.id);
                        }}
                        handleDelete={(_deleteAll) => {
                          setEvent(event);
                          _deleteAll !== undefined
                            ? deleteAllEvent(_deleteAll)
                            : handleDelete(event.id);
                        }}
                        time={getStartEndTime(
                          event.start.dateTime,
                          event.end.dateTime
                        )}
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

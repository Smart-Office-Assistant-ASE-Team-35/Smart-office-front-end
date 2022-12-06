import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const RoutineWrap = styled("div")({
  height: "calc(100% - 63px)",
  overflow: "auto",
  ul: {
    listStyle: "none",
    li: {
      padding: "15px 0",
      borderBottom: "1px dashed #DADADA",
      display: "flex",
      ".time": {
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        marginRight: "10px",
      },
      p: {
        textTransform: "capitalize",
        padding: "8px 12px",
        background: "#ECECEC",
        borderRadius: "4px",
      },
    },
    ".past-time": {
      ".time": {
        color: "#A5A5A5",
      },
    },
    ".current-time": {
      borderColor: "#009306",
      ".time": {
        color: "#009306",
      },
      p: {
        background: "#E7FFE8",
        borderLeft: "2px solid #009306",
      },
    },
    ".future-time": {
      ".time": {
        color: "#5030E5",
      },
      p: {
        background: "#EDE9FF",
        borderLeft: "2px solid #5030E5",
      },
    },
  },
  ".rbc-time-header": {
    display: "none",
  },
  ".rbc-time-content": {
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
  ".rbc-time-view": {
    border: "none",
    ".rbc-time-content": {
      border: "none",
      "> * + * > *": {
        border: "none",
      },
      ".rbc-timeslot-group": {
        borderBottom: "1px dashed #DADADA",
        minHeight: "70px",
        padding: "16px 0",
      },
      ".rbc-day-slot": {
        background: "transparent",
        ".rbc-timeslot-group": {
          borderBottom: "1px dashed #DADADA",
          minHeight: "70px",
          padding: "16px 0",
          ".rbc-time-slot": {
            border: "none",
          },
        },
      },
    },
  },
  ".rbc-event": {
    background: "#ECECEC",
    border: "none",
    padding: "8px 12px",
    minHeight: "40px !important",
    ".rbc-event-label": {
      display: "none",
    },
    ".rbc-event-content": {
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24px",
      textTransform: "capitalize",
      color: "#363537",
    },
  },
  // ".rbc-current-time-indicator": {
  //   display: "none",
  // },
});

const localizer = momentLocalizer(moment);
let formats = {
  timeGutterFormat: "H:mm",
};

function RoutineSection({ allEvents }) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (allEvents?.length) {
      let _allEvents = allEvents?.map((event) => {
          return {
            end: new Date(Date.parse(event.end.dateTime)),
            start: new Date(Date.parse(event.start.dateTime)),
            title: event.summary,
          };
        });
      setEvents(_allEvents);
    }
  }, [allEvents]);

  const Toolbar = () => {
    <></>;
  };

  const eventPropGetter = (event) => {
    const style =
      parseInt(moment(event.start.toISOString()).format("H")) <=
        parseInt(moment().format("H")) &&
      parseInt(moment(event.end.toISOString()).format("H")) >=
        parseInt(moment().format("H"))
        ? {
            background: "#E7FFE8",
            borderLeft: "2px solid #009306",
          }
        : parseInt(moment(event.start.toISOString()).format("H")) >
          parseInt(moment().format("H"))
        ? {
            background: "#EDE9FF",
            borderLeft: "2px solid #5030E5",
          }
        : {
            background: "#ECECEC",
          };
    return {
      style: style,
    };
  };

  return (
    <>
      <RoutineWrap>
        {events && (
          <Calendar
            localizer={localizer}
            defaultDate={moment().toString()}
            defaultView="day"
            events={events}
            step={30}
            formats={formats}
            views={["day"]}
            eventPropGetter={eventPropGetter}
            components={{
              toolbar: Toolbar,
            }}
          />
        )}
      </RoutineWrap>
    </>
  );
}

export default React.memo(RoutineSection);

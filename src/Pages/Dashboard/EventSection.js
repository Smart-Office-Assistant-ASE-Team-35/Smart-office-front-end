import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import EditEvent from "../Event/EditEvent";
import { getStartEndTime } from "../Event/Event";

const EventWrap = styled("div")({
  height: "calc(100% - 435px)",
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
});

function EventSection({ allEvents }) {
  return (
    <>
      <EventWrap>
        {allEvents?.map((event, index) => (
          <Grid item xs={12} key={index} style={{ marginBottom: "10px" }}>
            <EditEvent
              title={event.summary}
              time={getStartEndTime(event.start.dateTime, event.end.dateTime)}
            />
          </Grid>
        ))}
      </EventWrap>
    </>
  );
}

export default React.memo(EventSection);

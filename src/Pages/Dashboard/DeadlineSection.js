import React, { useState } from "react";
import { getTime, TextInfo } from "../Deadline/Deadline";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import EditTask from "../Deadline/EditTask";
import styled from "styled-components";

const TabWrap = styled("div")({
  height: "calc(100% - 63px)",
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
  
  ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
    color: "#363537",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
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
    marginBottom: "16px",
    position: "sticky",
    background: "#fff",
    top: "0",
  },
  ".css-19kzrtu": {
    padding: "20px 0",
  },
});

function DeadlineSection({ allEvents }) {
  const [tab, setTab] = useState(1);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
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
          <Grid container spacing={2} style={{ height: "100%" }}>
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
  return (
    <>
      <TabWrap>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Pending" {...a11yProps(0)} />
            <Tab label="Delay" {...a11yProps(1)} />
            <Tab label="Done" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {allEvents
            ?.filter((event) => event.event_status === "Pending")
            ?.map((event, index) => (
              <Grid item xs={12} key={index}>
                <EditTask
                  title={event.summary}
                  time={getTime(event.start.dateTime)}
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
        <TabPanel value={tab} index={1}>
          {allEvents
            ?.filter((event) => event.event_status === "Delay")
            ?.map((event, index) => (
              <Grid item xs={12} key={index}>
                <EditTask
                  title={event.summary}
                  time={getTime(event.start.dateTime)}
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
        <TabPanel value={tab} index={2}>
          {allEvents
            ?.filter((event) => event.event_status === "Done")
            ?.map((event, index) => (
              <Grid item xs={12} key={index}>
                <EditTask
                  title={event.summary}
                  time={getTime(event.start.dateTime)}
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
      </TabWrap>
    </>
  );
}

export default React.memo(DeadlineSection);

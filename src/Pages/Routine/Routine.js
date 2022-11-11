import React, { useEffect, useState } from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { FormControl, Grid,  TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Box } from "@mui/system";
import {CustomLabel} from "../ReUsable/CustomFormControl";
// const _routine = [
//   { event: "Assign task to junior employees" },
//   { event: "Check my work" },
//   { event: "Working on my task to given by john smith" },
//   { event: "Take a lunch" },
//   { event: "Check Junior’s Work status" },
//   { event: "Working on my task to given by john smith" },
//   { event: "Submit Daily Report" },
//   { event: "Submit Daily Report" },
// ];
function Routine() {
  const date = moment().toString();

  const [routineFilter, setRoutineFilter] = useState({
    startTime: date,
    endTime: date,
  });

  useEffect(() => {
    document.title = "Routine";
  }, []);

  const handelChange = (name, value) => {
    setRoutineFilter({
      ...routineFilter,
      [name]: value,
    });
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <h3>Daily Routine</h3>
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomLabel htmlFor="start-time" label={"From:"}/>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    id="start-time"
                    name="startTime"
                    value={routineFilter.startTime}
                    onChange={(value) => {
                      handelChange("startTime", value);
                    }}
                    variant="outlined"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <CustomLabel htmlFor="end-time" label={"To:"}/>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    id={"end-time"}
                    name="endTime"
                    value={routineFilter.endTime}
                    onChange={(value) => {
                      handelChange("endTime", value);
                    }}
                    variant="outlined"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Routine;

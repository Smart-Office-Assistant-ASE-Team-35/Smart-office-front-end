import React from "react";
import {
  LocalizationProvider,
  TimePicker,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import { FormControl, Grid, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CustomButton from "../ReUsable/CustomButton";
import styled from "styled-components";
import { Box } from "@mui/system";
import { CustomInput, CustomLabel } from "../ReUsable/CustomFormControl";

export const ModelContainer = styled(Box)({
  // ".css-9npbnl-MuiFormLabel-root-MuiInputLabel-root": {
  //   fontStyle: "normal",
  //   fontWeight: "400",
  //   fontSize: "20px",
  //   lineHeight: "30px",
  //   color: "#363537",
  //   fontFamily: '"Poppins", sans-serif',
  //   marginBottom: "12px",
  // },
  // ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
  //   border: "1px solid #A5A5A5",
  //   borderRadius: "6px",
  //   fontFamily: '"Poppins", sans-serif',
  // },
});

function DeadlineModel({ handelChange, handelSubmit, handleClose, eventForm }) {
  return (
    <ModelContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomLabel htmlFor="event-title" label={"Event Title"} />
          <FormControl fullWidth>
            <CustomInput
              id="event-title"
              name="eventName"
              variant="outlined"
              value={eventForm.eventName}
              onChange={(e) => {
                handelChange("eventName", e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <CustomLabel htmlFor="start-time" label={"From:"} />
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                id="start-time"
                name="startTime"
                value={eventForm.startTime}
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
          <CustomLabel htmlFor="end-time" label={"To:"} />
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                id="end-time"
                name="endTime"
                value={eventForm.endTime}
                onChange={(value) => {
                  handelChange("endTime", value);
                }}
                variant="outlined"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <CustomLabel htmlFor="event-date" label={"Date"} />
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                id="event-date"
                variant="outlined"
                name="eventDate"
                value={eventForm.eventDate}
                placeholder="Choose date"
                inputFormat="MM/DD/YYYY"
                onChange={(value) => {
                  handelChange("eventDate", value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomButton
                variant={"contained"}
                text={"Add"}
                onClick={() => {
                  handelSubmit();
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomButton
                variant={"text"}
                text={"Cancel"}
                onClick={() => {
                  handleClose();
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModelContainer>
  );
}

export default DeadlineModel;

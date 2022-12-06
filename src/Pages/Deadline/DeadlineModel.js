import React from "react";
import {
  LocalizationProvider,
  TimePicker,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CustomButton from "../ReUsable/CustomButton";
import styled from "styled-components";
import { Box } from "@mui/system";
import { CustomInput, CustomLabel } from "../ReUsable/CustomFormControl";
import moment from "moment";

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

export const errorCss = {
  color: "red",
  position: "absolute",
  bottom: "-20px",
};

function DeadlineModel({
  handelChange,
  handelSubmit,
  handleClose,
  validation,
  eventForm,
}) {
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
            {eventForm.eventName === "" && validation && (
              <FormHelperText style={errorCss}>
                This is required!
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
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
        </Grid> */}
        <Grid item xs={12}>
          <CustomLabel htmlFor="end-time" label={"Time"} />
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                id="end-time"
                name="endTime"
                value={eventForm.endTime}
                minDate={moment().toString()}
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
                minDate={moment().toString()}
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
        <Grid item xs={12}>
          <CustomLabel htmlFor="notify-time" label={"Notify me"} />
          <FormControl fullWidth>
            <Select
              id="notify-time"
              name="notifyTime"
              value={eventForm.notifyTime}
              onChange={(e) => {
                handelChange("notifyTime", e.target.value);
              }}
            >
              <MenuItem value={"none"}>Repeat Never</MenuItem>
              <MenuItem value={"1 hour"}>Repeat Every Hour</MenuItem>
              <MenuItem value={"1 day"}>Repeat Every Day</MenuItem>
              <MenuItem value={"2 day"}>Repeat Every Two Day</MenuItem>
              <MenuItem value={"3 day"}>Repeat Every Three Day</MenuItem>
            </Select>
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

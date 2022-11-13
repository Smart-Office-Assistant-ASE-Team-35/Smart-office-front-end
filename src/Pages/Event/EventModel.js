import React from "react";
import {
  LocalizationProvider,
  TimePicker,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CustomButton from "../ReUsable/CustomButton";
import { ModelContainer } from "../Deadline/DeadlineModel";
import { CustomInput, CustomLabel } from "../ReUsable/CustomFormControl";

function EventModel({ handelChange, handelSubmit, handleClose, eventForm }) {
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
        <Grid item xs={12}>
          <CustomLabel htmlFor="event-type" label={"Event Type"} />
          <FormControl fullWidth>
            <Select
              id="event-type"
              name="type"
              value={eventForm.type}
              onChange={(e) => {
                handelChange("type", e.target.value);
              }}
            >
              <MenuItem value={"DailyRoutine"}>Daily Routine</MenuItem>
              <MenuItem value={"TempararyEvent"}>Temparary Event</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {eventForm.type === "DailyRoutine" ? (
          <Grid item xs={12}>
            <CustomLabel htmlFor="event-repeat" label={"Repeat Task"} />
            <FormControl fullWidth>
              <Select
                id="event-repeat"
                name="repeatFor"
                value={eventForm.repeatFor}
                onChange={(e) => {
                  handelChange("repeatFor", e.target.value);
                }}
              >
                <MenuItem value={"YEARLY"}>YEARLY</MenuItem>
                <MenuItem value={"MONTHLY"}>MONTHLY</MenuItem>
                <MenuItem value={"WEEKLY"}>WEEKLY</MenuItem>
                <MenuItem value={"DAILY"}>DAILY</MenuItem>
                <MenuItem value={"HOURLY"}>HOURLY</MenuItem>
                <MenuItem value={"MINUTELY"}>MINUTELY</MenuItem>
                <MenuItem value={"SECONDLY"}>SECONDLY</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
        {eventForm.type === "DailyRoutine" ? (
          <Grid item xs={12}>
            <CustomLabel htmlFor="repeat-until" label={"Repeat Until"} />
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  id="repeat-until"
                  variant="outlined"
                  name="repeatTil"
                  value={eventForm.repeatTil}
                  placeholder="Choose date"
                  inputFormat="MM/DD/YYYY"
                  onChange={(value) => {
                    handelChange("repeatTil", value);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
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

export default React.memo(EventModel);

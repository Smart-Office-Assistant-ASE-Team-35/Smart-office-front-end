import React, { useEffect, useState } from "react";
import {
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import styled from "styled-components";
import TitleWButton from "../ReUsable/TitleWButton";
import {CustomLabel} from "../ReUsable/CustomFormControl";

const MotiveWrap = styled("div")({
  border: "1px solid #E7E7E7",
  borderRadius: "10px",
  padding: "24px",
  height: "70vh",
  ".category-wrap": {
    marginBottom: "16px",
    ".css-1q5nkkt-MuiButtonBase-root-MuiChip-root": {
      background: "#F0F0F0",
      border: "1px solid #BCBCBC",
      borderRadius: "8px",
      height: "38px",
      span: {
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#363537",
      },
    },
    ".css-1q5nkkt-MuiButtonBase-root-MuiChip-root:not(:last-of-type)": {
      marginRight: "10px",
    },
    ".css-1q5nkkt-MuiButtonBase-root-MuiChip-root.active": {
      background: "#EDE9FF",
      border: "1px solid #5030E5",
      span: {
        color: "#5030E5",
      },
    },
  },
  p: {
    span: {
      color: "#DD1B00",
    },
  },
});

function Motivation() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [motiveTags, setMotiveTags] = useState([
    { tagName: "Reward-based", active: true },
    { tagName: "Attitude", active: true },
    { tagName: "Fear-based", active: true },
    { tagName: "Creative", active: false },
    { tagName: "Competence", active: false },
    { tagName: "Power", active: false },
    { tagName: "Incentive", active: false },
  ]);

  useEffect(() => {
    document.title = "Motivation";
  }, []);

  useEffect(() => {
    setSelectedCategory(motiveTags?.filter((tags) => tags.active).length);
  }, [motiveTags]);

  const handleClick = (index) => {
    let _motiveTags = JSON.parse(JSON.stringify(motiveTags));
    let isActive = _motiveTags[index].active;
    _motiveTags[index].active = isActive
      ? false
      : selectedCategory < 5
      ? true
      : false;
    setMotiveTags(_motiveTags);
  };

  const handleDelete = (e) => {
    console.log(e);
  };
  return (
    <>
      <TitleWButton title="Positive Motivation" />
      <MotiveWrap>
        <div className="category-wrap">
          {motiveTags?.map((tag, index) => (
            <Chip
              className={tag.active ? "active" : ""}
              key={index}
              label={tag.tagName}
              onClick={() => handleClick(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
        <p>
          *Yor are selected <span>{selectedCategory}</span> out of 5 categories.
        </p>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <CustomLabel htmlFor="notification-time" label={"Notification Time"}/>
            <FormControl fullWidth>
              <Select id="notification-time">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MotiveWrap>
    </>
  );
}

export default Motivation;

import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import styled from "styled-components";
import TitleWButton from "../ReUsable/TitleWButton";
// import { CustomLabel } from "../ReUsable/CustomFormControl";
// import { getMotivationQuote } from "../../Services/service.dashboard";
// import { useDispatch } from "react-redux";
// import { setMotiveQuotes } from "../../Redux/Action/systemAction";
// import moment from "moment";

const MotiveWrap = styled("div")({
  border: "1px solid #E7E7E7",
  borderRadius: "10px",
  padding: "24px",
  height: "62vh",
  ".category-wrap": {
    marginBottom: "16px",
    ".css-1q5nkkt-MuiButtonBase-root-MuiChip-root, .css-nz3zgg-MuiButtonBase-root-MuiChip-root":
      {
        background: "#F0F0F0",
        border: "1px solid #BCBCBC",
        borderRadius: "8px",
        height: "38px",
        textTransform: "capitalize",
        span: {
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#363537",
        },
        marginBottom: "10px",
      },
    ".css-1q5nkkt-MuiButtonBase-root-MuiChip-root:not(:last-of-type), .css-nz3zgg-MuiButtonBase-root-MuiChip-root:not(:last-of-type)":
      {
        marginRight: "10px",
      },
    ".css-1q5nkkt-MuiButtonBase-root-MuiChip-root.active": {
      background: "#EDE9FF",
      border: "1px solid #5030E5",
      span: {
        color: "#5030E5",
      },
      path: {
        color: "#5030E5",
      },
    },
  },
  p: {
    marginBottom: "30px",
    // span: {
    //   color: "#DD1B00",
    // },
  },
});

function Motivation({ motiveTags, setMotiveTags }) {
  // const dispatch = useDispatch();
  // const [motiveTime, setMotiveTime] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(0);

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
  /*
  const handleChange = async (e) => {
    const { value } = e.target;
    setMotiveTime(value);
    let time = value * 3600000 + value * 60000;
    console.log(time);
    // let response = await getMotivationQuote({
    //   categories: motiveTags,
    // });
    // dispatch(setMotiveQuotes(response?.data?.[0]?.text))
  };
*/
  return (
    <>
      <TitleWButton title="Positive Motivation" />
      <MotiveWrap>
        <div className="category-wrap">
          {motiveTags?.map((tag, index) =>
            tag.active ? (
              <Chip
                className={tag.active ? "active" : ""}
                key={index}
                label={tag.tagName}
                onClick={() => handleClick(index)}
                onDelete={() => handleDelete(index)}
              />
            ) : (
              <Chip
                className={tag.active ? "active" : ""}
                key={index}
                label={tag.tagName}
                onClick={() => handleClick(index)}
              />
            )
          )}
        </div>
        <p>
          *Yor are selected{" "}
          <span
            style={{ color: selectedCategory === 5 ? "#DD1B00" : "#363537" }}
          >
            {selectedCategory}
          </span>{" "}
          out of 5 categories.
        </p>
        {/* <Grid container spacing={3}>
          <Grid item xs={6}>
            <CustomLabel
              htmlFor="notification-time"
              label={"Notification Time"}
            />
            <FormControl fullWidth>
              <Select
                id="notification-time"
                name="motiveTime"
                value={motiveTime}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value={1}>Every Hour</MenuItem>
                <MenuItem value={12}>Every 12 Hour</MenuItem>
                <MenuItem value={24}>Every Day</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid> */}
      </MotiveWrap>
    </>
  );
}

export default Motivation;

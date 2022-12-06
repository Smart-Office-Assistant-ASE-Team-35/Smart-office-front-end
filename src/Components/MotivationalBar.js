import React from "react";
function MotivationalBar({ quote }) {
  const style = {
    background: "#5030E5",
    padding: "15px 10px",
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "500",
    fontSize:
      quote.length <= 50 ? "32px" : 50 < quote.length && quote.length <= 100 ? "22px" : "16px",
    lineHeight: "normal",
    color: "#FFFFFF",
  };
  return (
    <>
      <div style={style}>“{quote}”</div>
    </>
  );
}

export default MotivationalBar;

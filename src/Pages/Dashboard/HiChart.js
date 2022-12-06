import React from "react";
import ReactHighcharts from "react-highcharts";

function HiChart({ config }) {
  return (
    <>
      <ReactHighcharts style={{ width: "100%" }} config={config} />
    </>
  );
}

export default React.memo(HiChart);

import React from "react";

const BarGraph = ({ regularAmounts }) => {
  return (
    <div className="bar-graph">
      {regularAmounts.map((value, index) => (
        <div
          key={index}
          className="bar"
          style={{
            height: `${value * 3}px`,
            border: "1px solid #333",
            margin: "0 4px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default BarGraph;

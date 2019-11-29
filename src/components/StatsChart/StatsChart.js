import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import T from "prop-types";

const StatsChart = ({ name, data }) => (
  <div>
    <h3>{name}</h3>
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
    >
      <XAxis dataKey="date" stroke="#d5d5d5" />
      <CartesianGrid vertical={false} stroke="#d5d5d5" />
      <YAxis stroke="#d5d5d5" />
      <Line
        type="monotone"
        dataKey="number"
        stroke="#3A80BA"
        dot={false}
        strokeWidth={3}
      />
    </LineChart>
  </div>
);

StatsChart.propTypes = {
  name: T.string.isRequired,
  data: T.arrayOf(T.shape()).isRequired
};

export default StatsChart;

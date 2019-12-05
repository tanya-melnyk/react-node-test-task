import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import T from "prop-types";

const StatsChart = ({ name, data }) => (
  <div className="stats-chart__wrapper">
    <h3>{name}</h3>
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis
          dataKey="date"
          stroke="#d5d5d5"
          tickLine={false}
        />
        <CartesianGrid vertical={false} stroke="#d5d5d5" />
        <YAxis stroke="#d5d5d5" axisLine={false} />
        <Line
          type="monotone"
          dataKey="number"
          stroke="#3A80BA"
          dot={false}
          strokeWidth={3}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

StatsChart.propTypes = {
  name: T.string.isRequired,
  data: T.arrayOf(T.shape()).isRequired
};

export default StatsChart;

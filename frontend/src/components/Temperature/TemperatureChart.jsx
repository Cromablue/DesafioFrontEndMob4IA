import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import TemperatureTooltip from './TemperatureTooltip';

export default function TemperatureChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestampStr" tick={{ fontSize: 12 }} />
        <YAxis unit="°C" />
        <Tooltip content={<TemperatureTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="temp_bat" stroke="#ff7300" name="Temp. Bateria" dot={false} />
        <Line type="monotone" dataKey="temp_front" stroke="#387908" name="Temp. Frontal" dot={false} />
        <Line type="monotone" dataKey="temp_back" stroke="#8884d8" name="Temp. Traseira" dot={false} />
        <Line type="monotone" dataKey="temp_cpu" stroke="#82ca9d" name="Temp. CPU" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

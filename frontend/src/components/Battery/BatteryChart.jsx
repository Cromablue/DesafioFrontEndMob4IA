// src/components/Battery/BatteryChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import BatteryTooltip from './BatteryTooltip';

export default function BatteryChart({ data, selectedIndex, onBarClick }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={(e) => {
          if (e && e.activeTooltipIndex !== undefined) {
            onBarClick(e.activeTooltipIndex);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestampStr" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip content={<BatteryTooltip />} />
        <Bar dataKey="battery_level" fill="#3b82f6" name="Nível da Bateria">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === selectedIndex ? '#1e40af' : '#3b82f6'}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

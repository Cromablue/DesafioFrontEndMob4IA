// src/components/BatteryLevel/BatteryLevel.jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import GenericTooltip from '../shared/GenericTooltip';
import './BatteryLevel.css';

export default function BatteryLevel({ data, onSelect, height }) {
  if (!data || data.length === 0) return <p>Sem dados disponíveis</p>;

  return (
    <div className="battery-level-container">
      <h2 className="battery-level-title">Nível da Bateria</h2>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 15, right: 15, left: 15, bottom: 5 }}
          onMouseMove={e => {
            if (e && e.activePayload && e.activePayload.length > 0) {
              const dataPoint = e.activePayload[0].payload; // objeto completo
              onSelect(dataPoint);
            }
          }}
          onMouseLeave={() => onSelect(null)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestampStr"
            tick={false} // remove os ticks e labels
            axisLine={false} // remove a linha do eixo
          />
          <YAxis 
            unit="%" 
            tick={{ fontSize: 12 }} 
            label={{ value: 'Bateria (%)', angle: -90, position: 'insideLeft', fontSize: 14 }} 
          />
          <Tooltip content={<GenericTooltip />} />
          <Bar
            dataKey="battery_level"
            fill="#8884d8"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

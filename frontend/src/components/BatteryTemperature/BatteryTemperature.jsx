// src/components/BatteryTemperature/BatteryTemperature.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import GenericTooltip from '../shared/GenericTooltip';
import './BatteryTemperature.css';

export default function BatteryTemperature({ data, onSelect, selectedIndex, height }) {
  return (
    <div className="battery-temperature-container">
      <h2 className="battery-temperature-title">Temperatura da Bateria</h2>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
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
            unit="°C" 
            domain={['auto', 'auto']} 
            tick={{ fontSize: 12 }} 
            label={{ 
              value: 'Temperatura (°C)', 
              angle: -90, 
              position: 'insideLeft', 
              dy: 20,       
              dx: 0,        
              style: { fontSize: 14, textAnchor: 'middle' } 
            }}
          />
          <Tooltip content={<GenericTooltip />} />
          <Line
            type="monotone"
            dataKey="temp_bat_c"
            stroke="#ff7300"
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// src/components/CpuTemperature/CpuTemperature.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import GenericTooltip from '../shared/GenericTooltip';
import './CpuTemperature.css';

export default function CpuTemperature({ data, onSelect, selectedIndex, height }) {
  return (
    <div className="cpu-temperature-container">
      <h2 className="cpu-temperature-title">Temperatura da CPU</h2>
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
            dataKey="temp_cpu_c" 
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

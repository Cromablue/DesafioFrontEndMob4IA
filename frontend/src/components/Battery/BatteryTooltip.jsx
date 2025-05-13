// src/components/Battery/BatteryTooltip.jsx
import React from 'react';

export default function BatteryTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 12,
        color: '#222',
        maxWidth: 250,
      }}>
        <p><strong>Timestamp:</strong> {data.timestampStr}</p>
        <p><strong>Nível da Bateria:</strong> {data.battery_level}%</p>
        <p><strong>Tensão:</strong> {data.voltage} mV</p>
        <p><strong>Tipo de Conexão:</strong> {data.plug_type_str}</p>
        <p><strong>Status da Bateria:</strong> {data.battery_status_str}</p>
        <p><strong>Corrente Instântanea:</strong> {data.inst_curr} mA</p>
      </div>
    );
  }
  return null;
}

import React from 'react';

function TemperatureTooltip({ active, payload, label }) {
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
        maxWidth: 280,
      }}>
        <p><strong>Data:</strong> {label}</p>
        <p><strong>Temperatura da Bateria:</strong> {(data.temp_bat / 1000).toFixed(2)} °C</p>
        <p><strong>Temperatura Frontal:</strong> {(data.temp_front / 1000).toFixed(2)} °C</p>
        <p><strong>Temperatura Traseira:</strong> {(data.temp_back / 1000).toFixed(2)} °C</p>
        <p><strong>Temperatura da CPU:</strong> {(data.temp_cpu / 1000).toFixed(2)} °C</p>
      </div>
    );
  }
  return null;
}

export default TemperatureTooltip;

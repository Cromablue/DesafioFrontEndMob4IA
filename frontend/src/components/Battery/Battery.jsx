// src/components/Battery/Battery.jsx
import React, { useEffect, useState } from 'react';
import BatteryChart from './BatteryChart';

// Mapas para tradução dos campos conforme PDF
const plugTypeMap = {
  0: 'Unplugged',
  1: 'AC',
  2: 'USB',
  3: 'Wireless',
};

const batteryStatusMap = {
  1: 'Unknown',
  2: 'Charging',
  3: 'Discharging',
  4: 'Not Charging',
  5: 'Full',
  6: 'Wireless',
};

export default function Battery() {
  const [batteryData, setBatteryData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [error, setError] = useState(null);

  const fetchBatteryData = async () => {
    try {
      const response = await fetch('http://localhost:8080/battery');
      if (!response.ok) throw new Error(`Erro ao buscar dados da bateria: ${response.status}`);

      const rawData = await response.json();

      if (!Array.isArray(rawData) || rawData.length === 0) {
        setBatteryData([]);
        setSelectedIndex(null);
        return;
      }

      const formattedData = rawData.map((item) => ({
        ...item,
        timestampStr: new Date(item.timestamp).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        plug_type_str: plugTypeMap[item.plug_type] || 'Desconhecido',
        battery_status_str: batteryStatusMap[item.battery_status] || 'Desconhecido',
      }));

      setBatteryData(formattedData);
      setSelectedIndex(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      setBatteryData([]);
      setSelectedIndex(null);
    }
  };

  useEffect(() => {
    fetchBatteryData();
    const interval = setInterval(fetchBatteryData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBarClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Nível de Bateria</h3>

      {error && (
        <div style={{ color: '#333', backgroundColor: '#fdd', padding: 10, borderRadius: 5 }}>
          Erro: {error}
        </div>
      )}

      {batteryData.length === 0 && !error ? (
        <p>🔎 Aguardando dados...</p>
      ) : (
        <BatteryChart
          data={batteryData}
          selectedIndex={selectedIndex}
          onBarClick={handleBarClick}
        />
      )}
    </div>
  );
}

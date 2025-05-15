import React, { useEffect, useState } from 'react';
import TemperatureChart from './TemperatureChart';

export default function Temperature() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [error, setError] = useState(null);

  const fetchTemperatureData = async () => {
    try {
      const response = await fetch('http://localhost:8080/temperature');
      if (!response.ok) throw new Error(`Erro ao buscar dados de temperatura: ${response.status}`);

      const rawData = await response.json();

      if (!Array.isArray(rawData) || rawData.length === 0) {
        setTemperatureData([]);
        return;
      }

      const formattedData = rawData.map(item => ({
        ...item,
        timestampStr: new Date(item.timestamp).toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
        }),
        // Ajuste as temperaturas para graus Celsius dividindo por 1000 (exemplo)
        temp_bat_c: item.temp_bat / 1000,
        temp_front_c: item.temp_front / 1000,
        temp_back_c: item.temp_back / 1000,
        temp_cpu_c: item.temp_cpu / 1000,
      }));

      setTemperatureData(formattedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTemperatureData([]);
    }
  };

  useEffect(() => {
    fetchTemperatureData();
    const interval = setInterval(fetchTemperatureData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Temperaturas</h3>
      {error && (
        <div style={{ color: '#333', backgroundColor: '#fdd', padding: 10, borderRadius: 5 }}>
          Erro: {error}
        </div>
      )}
      {temperatureData.length === 0 && !error ? (
        <p>🔎 Aguardando dados...</p>
      ) : (
        <TemperatureChart data={temperatureData} />
      )}
    </div>
  );
}

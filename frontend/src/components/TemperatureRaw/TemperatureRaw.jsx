import React, { useEffect, useState } from 'react';

function TemperatureRaw() {
  const [temperatureData, setTemperatureData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await fetch('http://localhost:8080/temperature');
        if (!response.ok) throw new Error('Erro ao buscar dados de temperatura');
        const data = await response.json();
        setTemperatureData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTemperatureData();

    // Atualizar a cada 2 segundos
    const interval = setInterval(fetchTemperatureData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (error) return (
    <div style={{ color: '#333', backgroundColor: '#fdd', padding: 10, borderRadius: 5 }}>
      Erro: {error}
    </div>
  );

  return (
    <div
      style={{
        whiteSpace: 'pre-wrap',
        background: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        color: '#222',
        fontFamily: 'monospace',
        fontSize: 14,
      }}
    >
      <h3 style={{ color: '#111' }}>Dados crus de temperatura (JSON):</h3>
      {temperatureData ? JSON.stringify(temperatureData, null, 2) : 'Carregando...'}
    </div>
  );
}

export default TemperatureRaw;

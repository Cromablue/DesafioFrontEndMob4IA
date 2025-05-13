import React, { useEffect, useState } from 'react';

function BatteryRaw() {
  const [batteryData, setBatteryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const response = await fetch('http://localhost:8080/battery');
        if (!response.ok) throw new Error('Erro ao buscar dados da bateria');
        const data = await response.json();
        setBatteryData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBatteryData();

    // Atualizar a cada 2 segundos
    const interval = setInterval(fetchBatteryData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (error) return (
    <div style={{ color: '#333', backgroundColor: '#fdd' }}>
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
      <h3 style={{ color: '#111' }}>Dados crus da bateria (JSON):</h3>
      {batteryData ? JSON.stringify(batteryData, null, 2) : 'Carregando...'}
    </div>
  );
}

export default BatteryRaw;

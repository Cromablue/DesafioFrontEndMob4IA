// frontend\src\components\Dashboard\hooks\useDashboardData.js
import { useState, useEffect, useCallback } from 'react';

export default function useDashboardData() {
  const [batteryData, setBatteryData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [mergedData, setMergedData] = useState([]); // merge original (interseção)
  const [fullMergeData, setFullMergeData] = useState([]); // merge bateria + temperatura (todos bateria)
  const [inverseMergeData, setInverseMergeData] = useState([]); // merge temperatura + bateria (todos temperatura)
  const [selectedData, setSelectedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Contadores separados para cada merge 
  const [instanceCount, setInstanceCount] = useState(0);
  const [fullMergeCount, setFullMergeCount] = useState(0);
  const [inverseMergeCount, setInverseMergeCount] = useState(0);

  const DATA_SLICE_LIMIT = 100000;

  // Converte timestamp em string legível pt-BR
  const formatTimestamp = useCallback((timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, []);

  // Formata e normaliza dados de temperatura
  const normalizeTemperatureData = useCallback((raw) => {
    if (!Array.isArray(raw)) return [];

    return raw.slice(0, DATA_SLICE_LIMIT).map(item => {
      const formatValue = (val) => {
        if (val === undefined || val === null) return null;
        const num = val / 1000;
        return num.toString().slice(0, 4);
      };

      return {
        timestamp: item.timestamp,
        timestampStr: formatTimestamp(item.timestamp),
        temp_bat_c: formatValue(item.temp_bat),
        temp_front_c: formatValue(item.temp_front),
        temp_back_c: formatValue(item.temp_back),
        temp_cpu_c: formatValue(item.temp_cpu),
      };
    });
  }, [formatTimestamp]);

  // Merge original: bateria + temperatura (interseção)
  const mergeByTimestamp = useCallback((batteryArray, temperatureArray) => {
    const tempMap = new Map(temperatureArray.map(item => [item.timestamp, item]));
    
    return batteryArray
      .map(bat => {
        const temp = tempMap.get(bat.timestamp);
        if (!temp) return null; // Remove itens sem dado de temperatura
        return {
          ...bat,
          ...temp,
          timestampStr: formatTimestamp(bat.timestamp),
        };
      })
      .filter(item => item !== null)
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [formatTimestamp]);

  // Merge completo: todos os itens de bateria, temperatura opcional (null se não existir)
  const fullMergeBatteryTemperature = useCallback((batteryArray, temperatureArray) => {
    const tempMap = new Map(temperatureArray.map(item => [item.timestamp, item]));
    
    return batteryArray
      .map(bat => {
        const temp = tempMap.get(bat.timestamp) || {
          temp_bat_c: null,
          temp_front_c: null,
          temp_back_c: null,
          temp_cpu_c: null,
          timestamp: bat.timestamp,
          timestampStr: formatTimestamp(bat.timestamp),
        };
        return {
          ...bat,
          ...temp,
          timestampStr: formatTimestamp(bat.timestamp),
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [formatTimestamp]);

  // Merge inverso: todos os itens de temperatura, bateria opcional (null se não existir)
  const inverseMergeTemperatureBattery = useCallback((temperatureArray, batteryArray) => {
    const batMap = new Map(batteryArray.map(item => [item.timestamp, item]));
    
    return temperatureArray
      .map(temp => {
        const bat = batMap.get(temp.timestamp) || {
          voltage: null,
          inst_curr: null,
          plug_type: null,
          battery_status: null,
          timestamp: temp.timestamp,
          timestampStr: formatTimestamp(temp.timestamp),
        };
        return {
          ...bat,
          ...temp,
          timestampStr: formatTimestamp(temp.timestamp),
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [formatTimestamp]);

  // Carrega dados das rotas
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [batteryRes, temperatureRes] = await Promise.all([
        fetch('http://localhost:8080/battery'),
        fetch('http://localhost:8080/temperature'),
      ]);

      if (!batteryRes.ok || !temperatureRes.ok) {
        throw new Error(`Erro na requisição: ${batteryRes.status}, ${temperatureRes.status}`);
      }

      const batteryRaw = await batteryRes.json();
      const temperatureRaw = await temperatureRes.json();

      const batteryLimited = Array.isArray(batteryRaw) ? batteryRaw.slice(0, DATA_SLICE_LIMIT) : [];
      const temperatureLimited = Array.isArray(temperatureRaw) ? temperatureRaw.slice(0, DATA_SLICE_LIMIT) : [];
      const temperatureNormalized = normalizeTemperatureData(temperatureLimited);

      // Merge original (interseção)
      const merged = mergeByTimestamp(batteryLimited, temperatureNormalized);
      setMergedData(merged);
      setInstanceCount(merged.length);
      console.log(`Total de instâncias mescladas (interseção): ${merged.length}`);

      // Merge completo (todos bateria)
      const fullMerge = fullMergeBatteryTemperature(batteryLimited, temperatureNormalized);
      setFullMergeData(fullMerge);
      setFullMergeCount(fullMerge.length);
      console.log(`Total de instâncias mescladas (todos bateria): ${fullMerge.length}`);

      // Merge inverso (todos temperatura)
      const inverseMerge = inverseMergeTemperatureBattery(temperatureNormalized, batteryLimited);
      setInverseMergeData(inverseMerge);
      setInverseMergeCount(inverseMerge.length);
      console.log(`Total de instâncias mescladas (todos temperatura): ${inverseMerge.length}`);

      setBatteryData(batteryLimited);
      setTemperatureData(temperatureNormalized);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [
    normalizeTemperatureData,
    mergeByTimestamp,
    fullMergeBatteryTemperature,
    inverseMergeTemperatureBattery,
  ]);

  // Efeito inicial para carregar dados
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Ajuste do handleSelect para receber o objeto completo ou null
  const handleSelect = useCallback((dataPoint) => {
    if (!dataPoint) {
      setSelectedData(null);
      return;
    }
    setSelectedData(dataPoint);
  }, []);

  return {
    batteryData,
    temperatureData,
    mergedData,       // interseção
    fullMergeData,    // todos bateria
    inverseMergeData, // todos temperatura
    selectedData,
    error,
    loading,
    handleSelect,
    instanceCount,
    fullMergeCount,
    inverseMergeCount,
  };
}

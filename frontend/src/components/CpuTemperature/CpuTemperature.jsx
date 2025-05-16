import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

function formatNumber(value, decimals = 1) {
  if (value === null || value === undefined) return 'N/A';
  return Number(value).toFixed(decimals);
}

const temperatureFields = {
  temp_cpu_c: 'Temperatura CPU',
  temp_bat_c: 'Temperatura Bateria',
  temp_front_c: 'Temperatura Frontal',
  temp_back_c: 'Temperatura Traseira',
};

export default function CpuTemperature({ data, onSelect, height }) {
  const [showAllTemps, setShowAllTemps] = useState(false);

  const fieldsToShow = showAllTemps ? Object.keys(temperatureFields) : ['temp_cpu_c'];

  const series = useMemo(() => {
    if (!data) return [];
    return fieldsToShow.map(field => ({
      name: temperatureFields[field],
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: data.map(d => {
        const val = d[field];
        return val !== null && val !== undefined ? Number(val) : null;
      }),
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2 },
      emphasis: {
        focus: 'series',
        lineStyle: { width: 3 },
        symbolSize: 8,
      },
    }));
  }, [fieldsToShow, data]);

  if (!data || data.length === 0) {
    return <p style={{ color: '#ccc', textAlign: 'center', padding: 20 }}>Sem dados disponíveis</p>;
  }

  const xData = data.map(d => d.timestampStr);

  const option = {
    animation: false,
    backgroundColor: 'transparent',
    title: {
      text: 'Temperaturas Empilhadas',
      left: 'center',
      textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f3f4f6', // cinza claro
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(30, 41, 59, 0.9)', // azul escuro translúcido
      textStyle: {
        color: '#f9fafb', // branco claro
        fontSize: 13,
      },
      formatter: params => {
        if (!params || !params.length) return '';
        const idx = params[0].dataIndex;
        const point = data[idx];
        if (!point) return '';

        const label = point.timestampStr || 'Sem data';

        let tooltipHtml = `<div style="text-align: left; min-width: 180px;"><p><strong>Data:</strong> ${label}</p>`;
        fieldsToShow.forEach(field => {
          const val = point[field];
          tooltipHtml += `<p><strong>${temperatureFields[field]}:</strong> ${
            val !== undefined && val !== null ? formatNumber(val) + ' °C' : 'N/A'
          }</p>`;
        });
        tooltipHtml += '</div>';
        return tooltipHtml;
      },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: fieldsToShow.map(field => temperatureFields[field]),
      top: 50,
      textStyle: {
        fontSize: 14,
        color: '#e0e0e0',
      },
      itemGap: 20,
    },
    grid: { left: 60, right: 40, bottom: 60, top: 90 },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: { alignWithLabel: true },
      axisLine: { lineStyle: { color: '#374151' } }, // cinza escuro
      axisLabel: { show: false, },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'Temperatura (°C)',
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: { fontSize: 13, color: '#9ca3af' },
      axisLine: { lineStyle: { color: '#374151' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#4b5563' } }, // linhas pontilhadas cinza
    },
    series,
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <label
        style={{
          display: 'block',
          marginBottom: 12,
          userSelect: 'none',
          cursor: 'pointer',
          color: '#e5e7eb',
          fontWeight: '600',
          fontSize: 14,
        }}
      >
        <input
          type="checkbox"
          checked={showAllTemps}
          onChange={() => setShowAllTemps(prev => !prev)}
          style={{ marginRight: 10, cursor: 'pointer', width: 18, height: 18 }}
        />
        Exibir todas as temperaturas
      </label>

      <div
        className="cpu-temperature-container"
        style={{
          height,
          background:
            'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          color: '#f3f4f6',
        }}
      >
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          onEvents={{
            mouseover: (params) => {
              if (params && params.dataIndex !== undefined) {
                const selectedPoint = data[params.dataIndex];
                onSelect(selectedPoint);
              }
            },
            globalout: () => {
              onSelect(null);
            },
          }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
}

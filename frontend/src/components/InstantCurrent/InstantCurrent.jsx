import React, { memo } from 'react';
import ReactECharts from 'echarts-for-react';

function formatNumber(value, decimals = 1) {
  if (value === null || value === undefined) return 'N/A';
  return Number(value).toFixed(decimals);
}

function InstantCurrent({ data, onSelect, height }) {
  if (!data || data.length === 0) {
    return (
      <p style={{ color: '#ccc', textAlign: 'center', padding: 20 }}>
        Sem dados disponíveis
      </p>
    );
  }

  const xData = data.map(d => d.timestampStr);
  const yData = data.map(d =>
    d.inst_curr !== null && d.inst_curr !== undefined ? Number(d.inst_curr) : null
  );

  const option = {
    animation: false,
    backgroundColor: 'transparent',
    title: {
      text: 'Corrente Instantânea',
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

        return `
          <div style="text-align: left; min-width: 180px;">
            <p><strong>Data:</strong> ${label}</p>
            <p><strong>Corrente Instantânea:</strong> ${
              point.inst_curr !== undefined && point.inst_curr !== null
                ? point.inst_curr + ' mAh'
                : 'N/A'
            }</p>
            <p><strong>Capacidade:</strong> ${
              point.battery_level !== undefined && point.battery_level !== null
                ? point.battery_level + '%'
                : 'N/A'
            }</p>
            <p><strong>Temperatura Bateria:</strong> ${
              point.temp_bat_c !== undefined && point.temp_bat_c !== null
                ? formatNumber(point.temp_bat_c) + ' °C'
                : 'N/A'
            }</p>
            <p><strong>Temperatura CPU:</strong> ${
              point.temp_cpu_c !== undefined && point.temp_cpu_c !== null
                ? formatNumber(point.temp_cpu_c) + ' °C'
                : 'N/A'
            }</p>
          </div>
        `;
      },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      show: false,
    },
    grid: { left: 60, right: 40, bottom: 60, top: 90 },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: { alignWithLabel: true },
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { show: false, },
      splitLine: { show: false },
      show: false,
    },
    yAxis: {
      type: 'value',
      name: 'Corrente (mAh)',
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: { fontSize: 13, color: '#9ca3af' },
      axisLine: { lineStyle: { color: '#374151' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#4b5563' } },
    },
    series: [
      {
        name: 'Corrente Instantânea',
        type: 'line',
        smooth: true,
        data: yData,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 2, color: '#8884d8' },
        emphasis: {
          focus: 'series',
          lineStyle: { width: 3 },
          symbolSize: 12,
        },
        animationDuration: 0,
        animation: false,
      },
    ],
  };

  const onEvents = {
    mouseover: params => {
      if (params && params.dataIndex !== undefined) {
        const selectedPoint = data[params.dataIndex];
        onSelect(selectedPoint);
      }
    },
    click: params => {
      if (params && params.dataIndex !== undefined) {
        const selectedPoint = data[params.dataIndex];
        onSelect(selectedPoint);
      }
    },
    globalout: () => {
      onSelect(null);
    },
  };

  return (
    <div
      className="instant-current-container"
      style={{
        height,
        background:
          'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
        padding: 20,
        borderRadius: 12,
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        color: '#f3f4f6',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        onEvents={onEvents}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}

export default memo(InstantCurrent);

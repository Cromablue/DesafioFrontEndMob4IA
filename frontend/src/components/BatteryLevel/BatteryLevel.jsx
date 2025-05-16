// Importação do React e do componente ReactECharts (wrapper do ECharts para React)
import React from 'react';
import ReactECharts from 'echarts-for-react';

// Função auxiliar para formatar números com casas decimais (útil para temperaturas)
function formatNumber(value, decimals = 1) {
  if (value === null || value === undefined) return 'N/A';
  return Number(value).toFixed(decimals);
}

// Componente principal que renderiza o gráfico de nível de bateria
export default function BatteryLevel({ data, onSelect, height }) {
  // Se não houver dados, exibe uma mensagem amigável
  if (!data || data.length === 0) {
    return (
      <p style={{ color: '#ccc', textAlign: 'center', padding: 20 }}>
        Sem dados disponíveis
      </p>
    );
  }

  // Preparação dos dados para o eixo X (timestamps) e Y (nível de bateria)
  const xData = data.map(d => d.timestampStr);
  const yData = data.map(d => (d.battery_level !== null ? Number(d.battery_level) : null));

  // Configurações do gráfico com ECharts
  const option = {
    animation: false, // Desativa animações para performance
    backgroundColor: 'transparent',
    title: {
      text: 'Nível da Bateria',
      left: 'center',
      textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f3f4f6', // Cor clara para fundo escuro
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(30, 41, 59, 0.9)', // Fundo escuro translúcido
      textStyle: {
        color: '#f9fafb', // Texto claro
        fontSize: 13,
      },
      // Tooltip customizado com várias informações
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
      show: false, // Oculta legenda para simplificar visual
    },
    grid: { left: 60, right: 40, bottom: 60, top: 90 }, // Espaçamento interno
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: { alignWithLabel: true },
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { show: false }, // Oculta labels do eixo X para evitar poluição visual
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'Bateria (%)',
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: { fontSize: 13, color: '#9ca3af' },
      axisLine: { lineStyle: { color: '#374151' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#4b5563' } },
      min: 0,
      max: 100,
    },
    series: [
      {
        name: 'Nível da Bateria',
        type: 'line',
        smooth: true, // Linha suavizada
        data: yData,
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          color: 'rgba(136, 132, 216, 0.3)', // Preenchimento da área abaixo da linha
        },
        itemStyle: {
          color: '#8884d8',
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: '#5555aa',
          },
        },
        animationDuration: 0,
        animation: false,
      },
    ],
  };

  // Eventos personalizados para interação com o gráfico
  const onEvents = {
    mouseover: params => {
      if (params && params.dataIndex !== undefined) {
        const selectedPoint = data[params.dataIndex];
        onSelect(selectedPoint); // Chama função passada por props ao passar o mouse
      }
    },
    globalout: () => {
      onSelect(null); // Reseta seleção ao sair do gráfico
    },
  };

  // Renderização do componente com estilos personalizados
  return (
    <div
      className="battery-level-container"
      style={{
        height,
        background:
          'linear-gradient(135deg, #111827 0%, #1f2937 100%)', // Gradiente escuro
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

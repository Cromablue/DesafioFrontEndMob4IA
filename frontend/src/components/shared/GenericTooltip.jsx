// Tooltip genérico usado nos gráficos do dashboard para mostrar informações detalhadas ao passar o mouse
export default function GenericTooltip({ active, payload, label }) {
  // Se o tooltip não estiver ativo ou não houver payload válido, não renderiza nada
  if (!active || !payload || !payload.length) return null;

  // Pega os dados reais do ponto onde o mouse está passando
  const data = payload[0].payload;

  // Função de segurança para formatar números: se não for número, retorna 'N/A'
  const formatNumber = (value) => {
    const num = Number(value);
    return !isNaN(num) ? num.toFixed(2) : 'N/A';
  };

  // Estilo do tooltip: simples e limpo, com fundo branco e bordas arredondadas
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
      {/* Mostra a data do ponto ou o label padrão se não tiver timestampStr */}
      <p><strong>Data:</strong> {data.timestampStr || label}</p>

      {/* Só mostra os dados se realmente existirem para evitar erros */}
      {data.inst_curr !== undefined && data.inst_curr !== null && (
        <p><strong>Corrente Instantânea:</strong> {data.inst_curr} mAh</p>
      )}
      {data.battery_level !== undefined && data.battery_level !== null && (
        <p><strong>Capacidade:</strong> {data.battery_level}%</p>
      )}
      {data.temp_bat_c !== undefined && data.temp_bat_c !== null && (
        <p><strong>Temperatura Bateria:</strong> {formatNumber(data.temp_bat_c)} °C</p>
      )}
      {data.temp_cpu_c !== undefined && data.temp_cpu_c !== null && (
        <p><strong>Temperatura CPU:</strong> {formatNumber(data.temp_cpu_c)} °C</p>
      )}
    </div>
  );
}

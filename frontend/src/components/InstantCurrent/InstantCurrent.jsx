// Importo os componentes principais do Recharts para montar o gráfico
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
// Importo meu tooltip genérico que eu mesmo criei pra reutilizar em vários gráficos
import GenericTooltip from '../shared/GenericTooltip';
// Importo o CSS específico para o componente de Corrente Instantânea
import './InstantCurrent.css';

// Esse componente exibe o gráfico de corrente instantânea
export default function InstantCurrent({ data, onSelect, selectedIndex, height }) {
  return (
    <div className="instant-current-container">
      {/* Título do gráfico */}
      <h2 className="instant-current-title">Corrente Instantânea</h2>

      {/* Container responsivo pra garantir que o gráfico se ajuste ao tamanho da tela */}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data} // Dados passados via props
          margin={{ top: 15, right: 15, left: 15, bottom: 5 }} // margem interna do gráfico

          // Quando o mouse se move sobre o gráfico, capturo o ponto e envio pro estado pai
          onMouseMove={e => {
            if (e && e.activePayload && e.activePayload.length > 0) {
              const dataPoint = e.activePayload[0].payload; // pego o ponto exato
              onSelect(dataPoint); // atualizo quem está selecionado
            }
          }}
          // Quando o mouse sai do gráfico, limpo a seleção
          onMouseLeave={() => onSelect(null)}
        >
          {/* Grid com traço pontilhado pro visual ficar mais limpo */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Eixo X com os timestamps, mas escondo os ticks e a linha pra deixar o layout mais limpo */}
          <XAxis
            dataKey="timestampStr"
            tick={false}
            axisLine={false}
          />

          {/* Eixo Y com unidade em mAh e label vertical à esquerda */}
          <YAxis 
            unit="mAh" 
            domain={['auto', 'auto']} 
            tick={{ fontSize: 12 }}
            label={{ 
              value: 'Corrente (mAh)', 
              angle: -90, 
              position: 'insideLeft',
              dy: 20,
              dx: 0,
              style: { fontSize: 14, textAnchor: 'middle' } 
            }}
          />

          {/* Tooltip customizado com o componente que eu criei */}
          <Tooltip content={<GenericTooltip />} />

          {/* Linha que representa a corrente instantânea */}
          <Line
            type="monotone" // suaviza as curvas
            dataKey="inst_curr" // chave dos dados que eu quero plotar
            stroke="#8884d8" // cor da linha
            dot={false} // não mostra os pontinhos em cada dado
            strokeWidth={2} // deixa a linha mais grossa
            activeDot={{ r: 6 }} // quando selecionado, mostra um ponto maior
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

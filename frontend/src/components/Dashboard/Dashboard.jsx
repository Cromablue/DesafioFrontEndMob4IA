// src/components/Dashboard/Dashboard.jsx

// Importo os hooks e componentes que vou usar na tela de dashboard
import { useState } from 'react';
import InstantCurrent from '../InstantCurrent/InstantCurrent';
import BatteryLevel from '../BatteryLevel/BatteryLevel';
import BatteryTemperature from '../BatteryTemperature/BatteryTemperature';
import CpuTemperature from '../CpuTemperature/CpuTemperature';
import JsonSample from './JsonSample';
import SelectedDetails from './SelectedDetails';
import useDashboardData from './hooks/useDashboardData';
import './Dashboard.css'; // Importo o CSS específico do dashboard

// Componente principal que monta os gráficos e a área lateral de detalhes
export default function Dashboard() {
  // Hook personalizado que fornece os dados dos gráficos, seleção e erros
  const {
    fullMergeData,
    inverseMergeData,
    mergedData,
    selectedData,
    error,
    handleSelect
  } = useDashboardData();

  // Estado pra alternar se os dados JSON devem aparecer abaixo dos gráficos
  const [showJson, setShowJson] = useState(false);

  // Altura padrão para todos os gráficos
  const altura = 150;

  return (
    <div className="dashboard-container">
      {/* Coluna principal com os gráficos */}
      <div className="charts-column">

        <div>
          {/* Corrente instantânea usa dados sincronizados */}
          <InstantCurrent
            data={mergedData}
            onSelect={timestamp => handleSelect(timestamp, 'merged')}
            height={altura}
          />
          {/* Exibe JSON abaixo se a opção estiver marcada */}
          {showJson && <JsonSample data={mergedData} title="Dados de Corrente Instantânea" />}
        </div>

        <div>
          {/* Gráfico de nível de bateria usa dados full merge */}
          <BatteryLevel
            data={fullMergeData}
            onSelect={timestamp => handleSelect(timestamp, 'fullMerge')}
            height={altura}
          />
          {showJson && <JsonSample data={fullMergeData} title="Dados de Nível de Bateria (Full Merge)" />}
        </div>

        <div>
          {/* Gráfico de temperatura da bateria usa os dados inverseMerge */}
          <BatteryTemperature
            data={inverseMergeData}
            onSelect={timestamp => handleSelect(timestamp, 'inverseMerge')}
            height={altura}
          />
          {showJson && <JsonSample data={inverseMergeData} title="Dados de Temperatura da Bateria (Inverse Merge)" />}
        </div>

        <div>
          {/* Gráfico de temperatura da CPU também usa inverseMerge */}
          <CpuTemperature
            data={inverseMergeData}
            onSelect={timestamp => handleSelect(timestamp, 'inverseMerge')}
            height={altura}
          />
          {showJson && <JsonSample data={inverseMergeData} title="Dados de Temperatura da CPU (Inverse Merge)" />}
        </div>
      </div>

      {/* Coluna lateral fixa onde mostro os detalhes do ponto selecionado */}
      <div className="sidebar-column">
        <div className="selected-details-sticky">
          <SelectedDetails selectedData={selectedData} />
        </div>
      </div>

      {/* Caso ocorra erro no carregamento dos dados, mostro aqui */}
      {error && (
        <div className="col-span-full text-red-500 font-semibold">
          {error}
        </div>
      )}

      {/* Checkbox pra alternar exibição dos dados JSON abaixo de cada gráfico */}
      <label className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          checked={showJson}
          onChange={() => setShowJson(prev => !prev)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span>Exibir dados JSON</span>
      </label>
    </div>
  );
}

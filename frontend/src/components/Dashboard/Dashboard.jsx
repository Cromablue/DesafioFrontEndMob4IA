import { useState, useCallback } from 'react';
import InstantCurrent from '../InstantCurrent/InstantCurrent';
import BatteryLevel from '../BatteryLevel/BatteryLevel';
import BatteryTemperature from '../BatteryTemperature/BatteryTemperature';
import CpuTemperature from '../CpuTemperature/CpuTemperature';
import JsonSample from './JsonSample';
import SelectedDetails from './SelectedDetails';
import useDashboardData from './hooks/useDashboardData';
import './Dashboard.css';

export default function Dashboard() {
  const {
    fullMergeData,
    inverseMergeData,
    mergedData,
    selectedData,
    error,
    handleSelect: handleSelectFromHook
  } = useDashboardData();

  const [selectedDataState, setSelectedDataState] = useState(null);
  
  const handleSelect = useCallback((data) => {
    setSelectedDataState(data);
  }, []);

  const [showJson, setShowJson] = useState(false);
  const altura = 300;

  return (
    <div className="dashboard-container">
      <div className="charts-column">
        <div>
          <InstantCurrent
            data={fullMergeData}
            onSelect={handleSelect}
            height={altura}
          />
          {showJson && <JsonSample data={fullMergeData} title="Dados de Corrente Instantânea" />}
        </div>

        <div>
          <BatteryLevel
            data={fullMergeData}
            onSelect={handleSelect}
            height={altura}
          />
          {showJson && <JsonSample data={fullMergeData} title="Dados de Nível de Bateria (Full Merge)" />}
        </div>

        <div>
          <BatteryTemperature
            data={inverseMergeData}
            onSelect={handleSelect}
            height={altura}
          />
          {showJson && <JsonSample data={inverseMergeData} title="Dados de Temperatura da Bateria (Inverse Merge)" />}
        </div>

        <div>
          <CpuTemperature
            data={inverseMergeData}
            onSelect={handleSelect}
            height={altura}
          />
          {showJson && <JsonSample data={inverseMergeData} title="Dados de Temperatura da CPU (Inverse Merge)" />}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <label className="json-toggle-label">
          <input
            type="checkbox"
            checked={showJson}
            onChange={() => setShowJson(prev => !prev)}
            className="form-checkbox"
          />
          <span>Exibir dados JSON</span>
        </label>
      </div>

      <div className="sidebar-column">
        <SelectedDetails selectedData={selectedDataState} />
      </div>
    </div>
  );
}

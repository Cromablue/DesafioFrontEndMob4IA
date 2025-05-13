import { useState } from 'react';
import Battery from './components/Battery/Battery.jsx';
import BatteryRaw from './components/BatteryRaw/BatteryRaw.jsx';
import Temperature from './components/Temperature/Temperature.jsx';
import TemperatureRaw from './components/TemperatureRaw/TemperatureRaw.jsx';

export default function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <header className="bg-blue-700 p-4 shadow-md">
        <h1 className="text-3xl font-bold">MOB4AI Dashboard</h1>
        <p className="text-sm">Inteligência Artificial Avançada para Sistemas Móveis Neuromórficos</p>
      </header>

      <main className="flex-grow p-6 overflow-y-auto">
        {page === 'dashboard' && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Análise de Bateria e Temperatura</h2>
            {/* <Battery /> */}
            <Temperature />
            {/* Ex: <Temperature /> <CpuTemperature /> */}
            <TemperatureRaw />
          </section>
        )}
      </main>

      <footer className="bg-slate-800 text-slate-400 text-center text-sm py-4">
        Itacoatiara - AM | Maio 2025 | MOB4AI
      </footer>
    </div>
  );
}

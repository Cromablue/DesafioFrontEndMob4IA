// src/App.jsx
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <header className="bg-white transparency-75 p-4 shadow-md fixed top-0 left-0 right-0 z-50 h-20">
        <h1 className="text-3xl font-bold text-slate-900">MOB4AI Dashboard</h1>
        <p className="text-sm text-slate-700">Inteligência Artificial Avançada para Sistemas Móveis Neuromórficos</p>
      </header>

      <main className="flex-grow overflow-y-auto mt-20 px-6"> 
        <Dashboard />
      </main>

      <footer className="bg-slate-800 text-slate-400 text-center text-sm py-4">
        Itacoatiara - AM | Maio 2025 | MOB4AI
      </footer>
    </div>
  );
}

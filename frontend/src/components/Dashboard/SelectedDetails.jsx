export default function SelectedDetails({ selectedData }) {
  if (!selectedData) {
    return (
      <aside
        className="selected-details-sticky col-span-full p-4 bg-gray-800 text-white rounded shadow-md"
        aria-live="polite"
        aria-atomic="true"
      >
        <h3 className="text-xl font-semibold mb-2">Detalhes Selecionados</h3>
        <p>Selecione um ponto no gráfico para ver detalhes aqui.</p>
      </aside>
    );
  }

  const plugTypeMap = {
    0: "Unplugged",
    1: "AC",
    2: "USB",
    3: "Wireless",
  };

  const batteryStatusMap = {
    1: "Unknown",
    2: "Charging",
    3: "Discharging",
    4: "Not Charging",
    5: "Full",
    6: "Wireless",
  };

  const displayValue = (value, unit = '') => {
    if (value === undefined || value === null || value === '') return 'N/A';
    return `${value}${unit}`;
  };

  // Desestrutura com fallback para undefined para evitar erros
  const {
    timestampStr,
    plug_type,
    battery_status,
    voltage,
    inst_curr,
    temp_bat_c,
    temp_cpu_c,
    temp_front_c,
    temp_back_c,
    battery_level, // pode existir em algumas bases
  } = selectedData;

  // Aplica tradução, cuidando de valores nulos/undefined
  const plugTypeText = plug_type !== null && plug_type !== undefined ? (plugTypeMap[plug_type] || 'N/A') : 'N/A';
  const batteryStatusText = battery_status !== null && battery_status !== undefined ? (batteryStatusMap[battery_status] || 'N/A') : 'N/A';

  return (
    <aside
      className="selected-details-sticky col-span-full p-4 bg-gray-800 text-white rounded shadow-md"
      aria-live="polite"
      aria-atomic="true"
    >
      <h3 className="text-xl font-semibold mb-4">Detalhes Selecionados</h3>

      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Data</th>
            <td className="py-2">{displayValue(timestampStr)}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Plug Type</th>
            <td className="py-2">{plugTypeText}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Battery Status</th>
            <td className="py-2">{batteryStatusText}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Voltage</th>
            <td className="py-2">{displayValue(voltage, ' mV')}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Instant Current</th>
            <td className="py-2">{displayValue(inst_curr, ' mAh')}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Battery Level</th>
            <td className="py-2">{displayValue(battery_level, ' %')}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Temperatura Bateria</th>
            <td className="py-2">{displayValue(temp_bat_c, ' °C')}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Temperatura CPU</th>
            <td className="py-2">{displayValue(temp_cpu_c, ' °C')}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 font-semibold">Temperatura Frontal</th>
            <td className="py-2">{displayValue(temp_front_c, ' °C')}</td>
          </tr>
          <tr>
            <th className="py-2 pr-4 font-semibold">Temperatura Traseira</th>
            <td className="py-2">{displayValue(temp_back_c, ' °C')}</td>
          </tr>
        </tbody>
      </table>
    </aside>
  );
}

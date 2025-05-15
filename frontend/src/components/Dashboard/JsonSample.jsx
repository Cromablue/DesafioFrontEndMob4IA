// frontend\src\components\Dashboard\JsonSample.jsx
export default function JsonSample({ data, title }) {
  // Se não tiver dados ou o array estiver vazio, nem renderizo nada.
  if (!data || data.length === 0) return null;

  // Pego só os 3 primeiros itens dos dados pra mostrar como amostra.
  const sample = data.slice(0, 3);

  // Retorno a caixinha estilizada com Tailwind pra exibir o JSON.
  return (
    <div className="bg-gray-900 text-gray-200 rounded p-3 mt-2 font-mono text-xs overflow-auto max-h-48">
      {/* Título da amostra, vindo por props */}
      <h4 className="font-semibold mb-1">{title} (amostra):</h4>

      {/* Exibo o JSON formatado de forma legível (identado com 2 espaços) */}
      <pre>{JSON.stringify(sample, null, 2)}</pre>
    </div>
  );
}

import { ChevronUp, ChevronDown } from 'lucide-react';

export default function DataTable({ columns, data, keyField = 'id' }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#13151a] border border-white/10 rounded-xl p-8 text-center text-gray-400">
        No data available.
      </div>
    );
  }

  return (
    <div className="bg-[#13151a] border border-white/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#0a0b0e] border-b border-white/10 text-gray-400 font-medium">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row) => (
              <tr key={row[keyField]} className="hover:bg-white/5 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

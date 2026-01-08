import { useState } from "react";

type Record = {
  doc_id: string;
  type: string;
  counterparty: string;
  project: string | null;
  expiry_date: string | null;
  amount: number | string | null;
};

type Props = {
  data: Record[];
  onChange: (updated: Record[]) => void;
};

export default function CleanedTable({ data, onChange }: Props) {
  const [records, setRecords] = useState(data);

  const handleEdit = (index: number, field: keyof Record, value: any) => {
    const updated = [...records];
    updated[index][field] = value;
    setRecords(updated);
    onChange(updated);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Doc ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Counterparty
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Project
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((rec, i) => (
            <tr
              key={rec.doc_id + i}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {rec.doc_id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {rec.type}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {rec.counterparty}
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={rec.project || ""}
                  onChange={(e) => handleEdit(i, "project", e.target.value)}
                  placeholder="Enter project"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="date"
                  className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={rec.expiry_date || ""}
                  onChange={(e) => handleEdit(i, "expiry_date", e.target.value)}
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={rec.amount || ""}
                  onChange={(e) => handleEdit(i, "amount", e.target.value)}
                  placeholder="0.00"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
    <table className="table-auto w-full border">
      <thead>
        <tr className="bg-black">
          <th className="p-2 border">Doc ID</th>
          <th className="p-2 border">Type</th>
          <th className="p-2 border">Counterparty</th>
          <th className="p-2 border">Project</th>
          <th className="p-2 border">Expiry Date</th>
          <th className="p-2 border">Amount</th>
        </tr>
      </thead>
      <tbody>
        {records.map((rec, i) => (
          <tr key={rec.doc_id + i} className="text-center">
            <td className="border p-1">{rec.doc_id}</td>
            <td className="border p-1">{rec.type}</td>
            <td className="border p-1">{rec.counterparty}</td>
            <td className="border p-1">
              <input
                className="border p-1 w-full"
                value={rec.project || ""}
                onChange={(e) => handleEdit(i, "project", e.target.value)}
              />
            </td>
            <td className="border p-1">
              <input
                type="date"
                className="border p-1 w-full"
                value={rec.expiry_date || ""}
                onChange={(e) => handleEdit(i, "expiry_date", e.target.value)}
              />
            </td>
            <td className="border p-1">
              <input
                type="number"
                className="border p-1 w-full"
                value={rec.amount || ""}
                onChange={(e) => handleEdit(i, "amount", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

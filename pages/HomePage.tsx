"use client";

import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { fetchCleanedData, submitCleanedData } from "@/src/lib/api";
import CleanedTable from "@/src/components/CleanedTable";

export const HomePage = () => {
  const { data, error, isLoading } = useSWR("/cleaned-1", () =>
    fetchCleanedData(1)
  );
  const [editedData, setEditedData] = useState<any[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data</p>;
  if (!data) return <p>No data</p>;

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      const payload = {
        batch_id: "batch-1-1767856760", // replace with real batch_id from backend if needed
        cleaned_items: editedData.length ? editedData : data,
      };
      const res = await submitCleanedData(payload);
      toast.success(res.message || "Data submitted successfully");
    } catch (err) {
      console.error(err);
    }
    setLoadingSubmit(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">LumiCore Data Cleaner</h1>
      <CleanedTable data={data} onChange={setEditedData} />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loadingSubmit}
      >
        {loadingSubmit ? "Submitting..." : "Submit Cleaned Data"}
      </button>
    </div>
  );
};

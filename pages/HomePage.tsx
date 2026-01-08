"use client";

import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { fetchCleanedData, submitCleanedData } from "@/src/lib/api";
import CleanedTable from "@/src/components/CleanedTable";
// import { CheckCircle } from "lucide-react";

export const HomePage = () => {
  const { data, error, isLoading } = useSWR("/cleaned-1", () =>
    fetchCleanedData(1)
  );
  const [editedData, setEditedData] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<number | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-lg text-red-600">Failed to load data</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">No data</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setIsSubmitted(false);

    try {
      const payload = {
        batch_id: "batch-1-1767856760",
        cleaned_items: editedData.length ? editedData : data,
      };
      const res = await submitCleanedData(payload);
      setResponseData(res?.validation?.score);
      setIsSubmitted(true);
      toast.success(res.message || "Data submitted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit data");
    }

    setLoadingSubmit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            LumiCore Data Cleaner
          </h1>
          <p className="text-gray-600">
            Review and edit your data before submission
          </p>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Data Records
          </h2>
          <CleanedTable data={data} onChange={setEditedData} />

          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={handleSubmit}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Cleaned Data"
              )}
            </button>
          </div>
        </div>

        {/* Score Display - Only shown after submission */}
        {isSubmitted && responseData !== null && (
          <div className="bg-white rounded-lg shadow-md p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-4">
              {/* <CheckCircle className="text-green-500 w-6 h-6" /> */}
              <h2 className="text-xl font-semibold text-gray-800">
                Validation Score
              </h2>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Data Quality Score</p>
                  <p className="text-5xl font-bold text-green-600">
                    {responseData}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Out of 100</p>
                  <div className="mt-2 w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${responseData}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {responseData >= 90 && (
                <p className="mt-4 text-sm text-green-700 font-medium">
                  Excellent! Your data quality is outstanding.
                </p>
              )}
              {responseData >= 70 && responseData < 90 && (
                <p className="mt-4 text-sm text-yellow-700 font-medium">
                  Good job! Minor improvements could enhance data quality.
                </p>
              )}
              {responseData < 70 && (
                <p className="mt-4 text-sm text-orange-700 font-medium">
                  Consider reviewing your data for potential improvements.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

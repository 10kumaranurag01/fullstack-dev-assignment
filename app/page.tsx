"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [sheetData, setSheetData] = useState([]);
  const [sheetView, setSheetView] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setResult(data.text);
      handleGetSheetData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSheetData = async () => {
    try {
      const response = await fetch("/api/get-sheet-data");

      const data = await response.json();
      setSheetData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSheetView = () => {
    setSheetView(!sheetView);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md m-4 w-full h-auto">
        <input
          type="text"
          value={prompt}
          onChange={handleChange}
          placeholder="Enter your prompt"
          className="border p-2 rounded w-full text-black"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Generating..." : "Generate Post"}
          </button>
          <button
            onClick={handleSheetView}
            disabled={loading}
            className="mt-4 bg-white text-blue-500 border border-blue-500 p-2 rounded"
          >
            {sheetView ? "Hide Sheet Data" : "Show Sheet Data"}
          </button>
        </div>
        {result && (
          <div className="text-black mt-4">
            <h2 className="font-bold">Generated Post:</h2>
            <p>{result}</p>
          </div>
        )}
        {sheetData.length > 0 && sheetView ? (
          <div className="mt-4">
            <h2 className="font-bold text-black">Sheet Data:</h2>
            <div className="overflow-auto max-h-64 my-2">
              <table className="min-w-full border-collapse border border-gray-400 text-black">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Timestamp</th>
                    <th className="border border-gray-300 p-2">Prompt</th>
                    <th className="border border-gray-300 p-2">Post</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.slice(1).map((row: string[], index: number) => (
                    <tr key={index}>
                      {row.map((cell: string, cellIndex: number) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 p-2"
                        >
                          {cellIndex === 0
                            ? new Date(cell).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })
                            : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          "Sheet Data is empty"
        )}
      </div>
    </div>
  );
}

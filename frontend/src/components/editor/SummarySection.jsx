export default function SummarySection({
  summary,
  onChange,
  onGenerate,
  loading,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Professional Summary
        </h2>

        <button
          onClick={onGenerate}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate AI Summary"}
        </button>
      </div>

      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a professional summary..."
        rows={5}
        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )
}
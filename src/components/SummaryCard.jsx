export default function SummaryCard() {
  return (
    <div className="h-[190px] bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">

      <div>
        <h3 className="text-lg font-semibold text-slate-700">
          Quick Summary
        </h3>

        <div className="mt-4 space-y-3 text-sm">

          {/* Top Focus */}
          <div>
            <p className="text-slate-500 font-medium">Top Focus</p>
            <p className="text-slate-800 font-semibold">
              Physical 💪
            </p>
          </div>

          {/* Needs Attention */}
          <div>
            <p className="text-slate-500 font-medium">Needs Attention</p>
            <p className="text-slate-800 font-semibold">
              Mental 🧠
            </p>
          </div>

        </div>
      </div>

      {/* Tip Section */}
      <p className="text-sm text-indigo-600 font-medium">
        Tip: Complete 1 more habit to reach 80%
      </p>

    </div>
  );
}
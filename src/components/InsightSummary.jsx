import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const CATEGORY_ICONS = {
  Hydration: "💧",
  Physical: "🏃",
  Mental: "🧘",
  Sleep: "😴",
  Nutrition: "🍎",
};

export default function InsightSummary() {
  const { habits } = useContext(HabitContext);

  const categoryMap = {};
  habits.forEach((habit) => {
    if (!habit.category) return;
    if (!categoryMap[habit.category]) {
      categoryMap[habit.category] = { total: 0, completed: 0 };
    }
    categoryMap[habit.category].total += 1;
    if (habit.completed) categoryMap[habit.category].completed += 1;
  });

  const sorted = Object.entries(categoryMap)
    .map(([name, data]) => ({
      name,
      rate: data.total === 0 ? 0 : Math.round((data.completed / data.total) * 100),
    }))
    .sort((a, b) => b.rate - a.rate);

  const strongest = sorted[0] ?? null;
  const weakest = sorted[sorted.length - 1] ?? null;
  const hasData = sorted.length > 0;

  const highPriorityPending = habits.filter(
    (h) => h.priority === "High" && !h.completed
  );

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-700">Insight Summary</h3>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">
            Strongest Category
          </p>
          <div className="text-2xl mb-0.5">{hasData ? CATEGORY_ICONS[strongest.name] ?? "🏆" : "—"}</div>
          <h4 className="text-lg font-bold text-slate-800">{hasData ? strongest.name : "N/A"}</h4>
          {hasData && <p className="text-sm text-emerald-600 font-medium mt-0.5">{strongest.rate}% done</p>}
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
          <p className="text-xs font-medium text-rose-500 uppercase tracking-wide mb-1">
            Needs Attention
          </p>
          <div className="text-2xl mb-0.5">{hasData && sorted.length > 1 ? CATEGORY_ICONS[weakest.name] ?? "⚠️" : "—"}</div>
          <h4 className="text-lg font-bold text-slate-800">{hasData && sorted.length > 1 ? weakest.name : "N/A"}</h4>
          {hasData && sorted.length > 1 && <p className="text-sm text-rose-500 font-medium mt-0.5">{weakest.rate}% done</p>}
        </div>

      </div>

      {highPriorityPending.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-3">
            🔥 High Priority — Not Yet Done
          </p>
          <ul className="space-y-1.5">
            {highPriorityPending.map((h) => (
              <li key={h.id} className="flex items-center gap-2 text-sm text-slate-700">
                <span>{h.icon}</span>
                <span>{h.name}</span>
                <span className="ml-auto text-xs text-slate-400">{h.category}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
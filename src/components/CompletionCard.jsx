import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

export default function CompletionCard() {
  const { habits } = useContext(HabitContext);

  const total = habits.length;
  const completed = habits.filter((h) => h.completed).length;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const getBarColor = (rate) => {
    if (rate >= 75) return "from-emerald-400 to-teal-500";
    if (rate >= 40) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-red-500";
  };

  const getLabel = (rate) => {
    if (total === 0) return "No habits added yet — start today!";
    if (rate >= 75) return "Great job! Keep it up 🎉";
    if (rate >= 40) return "Good progress, stay consistent 💪";
    return "Let's get moving! You can do it 🔥";
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">
      <p className="text-sm font-medium text-slate-400 mb-4">Completion Overview</p>

      <div className="flex items-end gap-4 mb-4">
        <span className="text-5xl font-bold text-white tracking-tight">{rate}%</span>
        <span className="text-slate-400 text-sm mb-2">{completed} of {total} habits done</span>
      </div>

      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full bg-gradient-to-r ${getBarColor(rate)} rounded-full transition-all duration-700`}
          style={{ width: `${rate}%` }}
        />
      </div>

      <p className="text-sm text-slate-400">{getLabel(rate)}</p>
    </div>
  );
}
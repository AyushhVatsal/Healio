import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

export default function HealthScoreCard() {
  const { habits } = useContext(HabitContext);

  // Calculate real health score from actual habits
  const total = habits.length;
  const completed = habits.filter((h) => h.completed).length;
  const score = total === 0 ? 0 : Math.round((completed / total) * 100);

  // High priority habits that are still pending
  const highPending = habits.filter(
    (h) => h.priority === "High" && !h.completed
  ).length;

  // Dynamic color based on score
  const getBarColor = () => {
    if (score >= 75) return "from-emerald-400 to-teal-500";
    if (score >= 40) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-red-500";
  };

  // Dynamic emoji based on score
  const getEmoji = () => {
    if (score === 100) return "🏆";
    if (score >= 75) return "🔥";
    if (score >= 40) return "💪";
    if (total === 0) return "🌱";
    return "⚡";
  };

  // Motivational message based on score
  const getMessage = () => {
    if (total === 0) return "Add your first habit to get started!";
    if (score === 100) return "Perfect day! All habits completed!";
    if (score >= 75) return "Amazing! You're crushing it today!";
    if (score >= 40) return `${total - completed} more habit${total - completed > 1 ? "s" : ""} to go — keep pushing!`;
    return `Stay focused! ${completed} of ${total} done so far.`;
  };

  return (
    <div className="rounded-2xl p-6 bg-slate-900 shadow-lg border border-slate-800">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-medium text-slate-400">Health Score</p>
        <span className="text-2xl">{getEmoji()}</span>
      </div>

      {/* Score Number */}
      <div className="flex items-end gap-2 mb-4">
        <span className="text-6xl font-bold text-white tracking-tight">
          {score}
        </span>
        <span className="text-2xl font-bold text-slate-500 mb-2">%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full bg-gradient-to-r ${getBarColor()} rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Completion count */}
      <p className="text-sm text-slate-400 mb-4">
        {completed} of {total} habits completed
      </p>

      {/* Divider */}
      <div className="border-t border-slate-800 pt-4">
        <p className="text-sm text-slate-300 font-medium">
          {getMessage()}
        </p>

        {/* High priority warning */}
        {highPending > 0 && (
          <p className="text-xs text-rose-400 mt-2 font-medium">
            ⚠️ {highPending} high priority habit{highPending > 1 ? "s" : ""} still pending
          </p>
        )}
      </div>

    </div>
  );
}
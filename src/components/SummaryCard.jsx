import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import { DropIcon, PersonSimpleRunIcon, BrainIcon, BedIcon, BowlFoodIcon } from "@phosphor-icons/react";

const CATEGORY_ICONS = {
  Hydration: DropIcon,
  Physical: PersonSimpleRunIcon,
  Mental: BrainIcon,
  Sleep: BedIcon,
  Nutrition: BowlFoodIcon,
};

const CATEGORY_COLORS = {
  Hydration: "text-sky-500",
  Physical: "text-orange-500",
  Mental: "text-violet-500",
  Sleep: "text-indigo-500",
  Nutrition: "text-green-500",
};

export default function SummaryCard() {
  const { habits } = useContext(HabitContext);

  const total = habits.length;
  const completed = habits.filter((h) => h.completed).length;
  const score = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Calculate per category completion rates
  const categoryMap = {};
  habits.forEach((h) => {
    if (!h.category) return;
    if (!categoryMap[h.category]) {
      categoryMap[h.category] = { total: 0, completed: 0 };
    }
    categoryMap[h.category].total += 1;
    if (h.completed) categoryMap[h.category].completed += 1;
  });

  const sorted = Object.entries(categoryMap)
    .map(([name, data]) => ({
      name,
      rate: data.total === 0 ? 0 : Math.round((data.completed / data.total) * 100),
    }))
    .sort((a, b) => b.rate - a.rate);

  const strongest = sorted[0] ?? null;
  const weakest = sorted.length > 1 ? sorted[sorted.length - 1] : null;

  // How many habits left to reach next milestone
  const nextMilestone = [25, 50, 75, 100].find((m) => m > score) ?? 100;
  const habitsNeeded = total === 0
    ? 0
    : Math.ceil(((nextMilestone / 100) * total) - completed);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-100 space-y-4">

      <h3 className="text-base font-bold text-slate-700">Quick Summary</h3>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">

        {/* Total habits */}
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-400 font-medium mb-1">Total Habits</p>
          <p className="text-2xl font-bold text-slate-700">{total}</p>
        </div>

        {/* Completed today */}
        <div className="bg-purple-50 rounded-xl p-3">
          <p className="text-xs text-purple-400 font-medium mb-1">Done Today</p>
          <p className="text-2xl font-bold text-purple-600">{completed}</p>
        </div>

      </div>

      {/* Strongest category */}
      {strongest && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Top Category</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {CATEGORY_ICONS[strongest.name] && (
                (() => {
                  const Icon = CATEGORY_ICONS[strongest.name];
                  return <Icon size={14} className={CATEGORY_COLORS[strongest.name]} />;
                })()
              )}
              <p className="text-sm font-bold text-slate-700">{strongest.name}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-emerald-500">{strongest.rate}%</span>
        </div>
      )}

      {/* Needs attention */}
      {weakest && weakest.name !== strongest?.name && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Needs Attention</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {CATEGORY_ICONS[weakest.name] && (
                (() => {
                  const Icon = CATEGORY_ICONS[weakest.name];
                  return <Icon size={14} className={CATEGORY_COLORS[weakest.name]} />;
                })()
              )}
              <p className="text-sm font-bold text-slate-700">{weakest.name}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-rose-400">{weakest.rate}%</span>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-slate-100 pt-3">
        {total === 0 ? (
          <p className="text-xs text-slate-400 font-medium">
            🌱 Add habits to see your summary
          </p>
        ) : score === 100 ? (
          <p className="text-xs text-emerald-500 font-bold">
            🏆 All habits done! Perfect day!
          </p>
        ) : (
          <p className="text-xs text-indigo-500 font-medium">
            💡 {habitsNeeded} more habit{habitsNeeded > 1 ? "s" : ""} to reach {nextMilestone}%
          </p>
        )}
      </div>

    </div>
  );
}
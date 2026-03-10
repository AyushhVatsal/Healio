import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CATEGORY_ICONS = {
  Hydration: "💧",
  Physical: "🏃",
  Mental: "🧘",
  Sleep: "😴",
  Nutrition: "🍎",
};

const CATEGORY_COLORS = {
  Hydration: "#38bdf8",
  Physical: "#fb923c",
  Mental: "#a78bfa",
  Sleep: "#818cf8",
  Nutrition: "#34d399",
};

export default function CategoryStats() {
  const { habits } = useContext(HabitContext);

  // Count habits per category
  const categoryMap = {};
  habits.forEach((habit) => {
    if (!habit.category) return;
    if (!categoryMap[habit.category]) {
      categoryMap[habit.category] = { total: 0, completed: 0 };
    }
    categoryMap[habit.category].total += 1;
    if (habit.completed) categoryMap[habit.category].completed += 1;
  });

  const pieData = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    value: data.total, // slice size = number of habits in that category
    completed: data.completed,
    total: data.total,
    rate: data.total === 0 ? 0 : Math.round((data.completed / data.total) * 100),
  }));

  // Custom tooltip that shows on hover
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-sm">
          <p className="font-semibold text-slate-700 mb-1">
            {CATEGORY_ICONS[d.name]} {d.name}
          </p>
          <p className="text-slate-500">{d.completed}/{d.total} completed</p>
          <p className="text-slate-500">{d.rate}% done</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend with icons
  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5 text-sm text-slate-600">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{CATEGORY_ICONS[entry.value]} {entry.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      <h3 className="text-base font-semibold text-slate-700 mb-1">
        Habits by Category
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Slice size = number of habits in each category
      </p>

      {pieData.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
          No habits yet. Add some to see the chart!
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={247}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] ?? "#94a3b8"}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}
import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import useGreeting from "../hooks/useGreeting";
import HealthScoreCard from "../components/HealthScoreCard";
import SummaryCard from "../components/SummaryCard";
import HabitList from "../components/HabitList";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

export default function Dashboard() {
  const greeting = useGreeting();
  const { habits, resetHabits } = useContext(HabitContext);
  const completed = habits.filter((h) => h.completed).length;

  return (
    <div className="px-10 pt-4 pb-2 bg-slate-100">

      <div className="grid grid-cols-12 gap-4 items-start">

        {/* Left Section */}
        <div className="col-span-8 space-y-4">

          {/* Greeting */}
          <h1 className="text-3xl font-extrabold text-slate-700">
            {greeting}! 👋
          </h1>

          {/* Subheader + Reset button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-600">
              Today's Habits
              <span className="ml-2 text-sm font-semibold text-purple-500">
                {completed}/{habits.length} done
              </span>
            </h2>

            {habits.length > 0 && (
              <button
                onClick={resetHabits}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-rose-500 border border-slate-200 hover:border-rose-300 bg-white px-3 py-1.5 rounded-xl transition"
              >
                <ArrowCounterClockwiseIcon size={14} />
                Reset All
              </button>
            )}
          </div>

          {/* Habit List */}
          <div className="min-h-[490px] bg-white rounded-2xl shadow-md p-5">
            <HabitList />
          </div>

        </div>

        {/* Right Section */}
        <div className="col-span-4 space-y-4">
          <HealthScoreCard />
          <SummaryCard />
        </div>

      </div>
    </div>
  );
}
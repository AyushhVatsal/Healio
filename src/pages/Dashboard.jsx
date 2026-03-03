import useGreeting from "../hooks/useGreeting";
import HealthScoreCard from "../components/HealthScoreCard";
import SummaryCard from "../components/SummaryCard";

export default function Dashboard() {
  const greeting = useGreeting();

  return (
    <div className="px-10 pt-4 pb-2 bg-slate-100 min-h-screen">

      <div className="grid grid-cols-12 gap-4 items-start">

        {/* ===== Left Section ===== */}
        <div className="col-span-8 space-y-4">

          {/* Greeting */}
          <h1 className="text-3xl font-semibold text-slate-700">
            {greeting}, 👋
          </h1>

          {/* Separate Header */}
          <h2 className="text-xl font-semibold text-slate-600">
            Your Daily Progress Overview
          </h2>

          {/* Habit List Placeholder */}
          <div className="h-[490px] bg-white rounded-2xl shadow-md p-6">
            <p className="text-slate-400 text-sm">
              Habit list will appear here.
            </p>
          </div>

        </div>

        {/* ===== Right Section ===== */}
        <div className="col-span-4 space-y-4">

          {/* Health Score */}
          <HealthScoreCard />

          {/* Quick Summary Section */}
          <SummaryCard />

        </div>

      </div>

    </div>
  );
}
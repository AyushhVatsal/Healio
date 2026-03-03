import React from "react";

const HealthScoreCard = () => {
  return (
    <div className="rounded-2xl p-10 bg-slate-900 shadow-lg border border-slate-800">
      
      <div className="space-y-6">
        
        {/* Title */}
        <h2 className="text-sm text-slate-400 font-medium">
          Health Score
        </h2>

        {/* Score */}
        <div className="text-5xl font-bold text-white tracking-tight">
          72%
        </div>

        {/* Gradient Progress Bar */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-[72%] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        </div>

        {/* Habit Completion Text */}
        <p className="text-sm text-slate-400">
          3 of 5 habits completed
        </p>

      </div>
    </div>
  );
};

export default HealthScoreCard;
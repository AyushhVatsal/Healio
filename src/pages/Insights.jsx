import CompletionCard from "../components/CompletionCard";
import CategoryStats from "../components/CategoryStats";
import InsightSummary from "../components/InsightSummary";

export default function Insights() {
  return (
    <div className="bg-slate-100 px-10 pt-4 pb-2">

      <div className="mb-3">
        <h1 className="text-3xl font-semibold text-slate-700">Insights</h1>
        <p className="text-slate-500 mt-1">Your habit performance overview</p>
      </div>

      <div className="mb-3">
        <CompletionCard />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <CategoryStats />
        </div>
        <div className="col-span-6">
          <InsightSummary />
        </div>
      </div>

    </div>
  );
}
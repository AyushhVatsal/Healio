import { useState, useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import { useNavigate } from "react-router-dom";
import { DropIcon, PersonSimpleRunIcon, BrainIcon, BedIcon, BowlFoodIcon } from "@phosphor-icons/react";

const categories = [
  { name: "Hydration", icon: DropIcon },
  { name: "Physical", icon: PersonSimpleRunIcon },
  { name: "Mental", icon: BrainIcon },
  { name: "Sleep", icon: BedIcon },
  { name: "Nutrition", icon: BowlFoodIcon },
];

export default function AddHabitForm() {
  const { addHabit } = useContext(HabitContext);
  const navigate = useNavigate();

  const [habit, setHabit] = useState({
    name: "",
    category: "",
    priority: null,
    frequency: "Daily",
    bestTime: "Morning",
  });

  const [error, setError] = useState("");
  const [isCustomFrequency, setIsCustomFrequency] = useState(false);
  const [customFrequency, setCustomFrequency] = useState("");

  // Resets the form back to default values
  const resetForm = () => {
    setHabit({
      name: "",
      category: "",
      priority: null,
      frequency: "Daily",
      bestTime: "Morning",
    });
    setIsCustomFrequency(false);
    setCustomFrequency("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "frequency" && value === "Custom") {
      setIsCustomFrequency(true);
      setHabit({ ...habit, frequency: "" });
      return;
    }

    if (name === "frequency") {
      setIsCustomFrequency(false);
      setCustomFrequency("");
    }

    setHabit({ ...habit, [name]: value });
  };

  const handleCustomFrequency = (e) => {
    setCustomFrequency(e.target.value);
    setHabit({ ...habit, frequency: e.target.value });
  };

  // redirectAfter = true  → save and go to dashboard
  // redirectAfter = false → save and stay, reset form
  const handleSubmit = (e, redirectAfter = true) => {
    e.preventDefault();

    if (!habit.category) { setError("Please select a category."); return; }
    if (!habit.priority) { setError("Please select a priority level."); return; }
    if (!habit.frequency) { setError("Please enter a custom frequency."); return; }

    setError("");
    addHabit(habit);

    if (redirectAfter) {
      navigate("/");
    } else {
      resetForm();
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, true)}
      className="grid grid-cols-[2fr_1fr] gap-y-6 gap-x-6"
    >

      {/* Habit Name */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Habit Name
        </label>
        <input
          type="text"
          name="name"
          value={habit.name}
          onChange={handleChange}
          placeholder="e.g. Drink 2L Water"
          className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />
      </div>

      {/* Frequency */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Frequency
        </label>

        <select
          name="frequency"
          value={isCustomFrequency ? "Custom" : habit.frequency}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition hover:border-purple-400"
        >
          <option>Daily</option>
          <option>3x per week</option>
          <option>Weekly</option>
          <option>Add Once</option>
          <option>Custom</option>
        </select>

        {/* Custom input — only visible when Custom is selected */}
        {isCustomFrequency && (
          <input
            type="text"
            value={customFrequency}
            onChange={handleCustomFrequency}
            placeholder="e.g. Every Monday & Thursday"
            className="w-full mt-2 border border-purple-300 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            autoFocus
          />
        )}

        {isCustomFrequency && (
          <p className="text-xs text-slate-400 mt-1 pl-1">
            Type any schedule that works for you
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Category
        </label>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = habit.category === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setHabit({ ...habit, category: cat.name })}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition
                  ${isSelected
                    ? "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "border-slate-200 text-slate-600 hover:border-purple-400 hover:bg-purple-50"
                  }`}
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Best Time */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Best Time of Day
        </label>
        <select
          name="bestTime"
          value={habit.bestTime}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition hover:border-purple-400"
        >
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Anytime</option>
        </select>
      </div>

      {/* Priority */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Priority Level
        </label>
        <div className="flex gap-3">
          {[
            { level: "Low", active: "bg-emerald-500 text-white border-emerald-500" },
            { level: "Medium", active: "bg-amber-500 text-white border-amber-500" },
            { level: "High", active: "bg-rose-500 text-white border-rose-500" },
          ].map(({ level, active }) => (
            <button
              key={level}
              type="button"
              onClick={() => setHabit({ ...habit, priority: level })}
              className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition
                ${habit.priority === level
                  ? active
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="col-span-2 text-sm text-rose-500 font-medium -mt-2">
          ⚠️ {error}
        </div>
      )}

      {/* Buttons */}
      <div className="col-span-2 flex justify-end gap-3 pt-2 border-t border-slate-100">

        {/* Cancel — go back without saving */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        {/* Save & Add Another — saves habit, clears form, stays on page */}
        <button
          type="button"
          onClick={(e) => handleSubmit(e, false)}
          className="px-5 py-2.5 border border-purple-300 text-purple-600 rounded-xl text-sm font-medium hover:bg-purple-50 transition"
        >
          Save & Add Another
        </button>

        {/* Save & Go to Dashboard — saves and redirects */}
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition shadow-md"
        >
          Save & Go to Dashboard
        </button>

      </div>

    </form>
  );
}
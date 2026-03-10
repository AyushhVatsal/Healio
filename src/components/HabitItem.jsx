import { useState, useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import {
  DropIcon, PersonSimpleRunIcon, BrainIcon, BedIcon, BowlFoodIcon,
  PencilSimpleIcon, TrashIcon, CheckCircleIcon, CircleIcon
} from "@phosphor-icons/react";

// Lookup object — maps category name to its icon component
const CATEGORY_ICONS = {
  Hydration: DropIcon,
  Physical: PersonSimpleRunIcon,
  Mental: BrainIcon,
  Sleep: BedIcon,
  Nutrition: BowlFoodIcon,
};

// Color styles for each priority level
const PRIORITY_STYLES = {
  High: "bg-rose-100 text-rose-600",
  Medium: "bg-amber-100 text-amber-600",
  Low: "bg-emerald-100 text-emerald-600",
};

// Background color for each category tag
const CATEGORY_COLORS = {
  Hydration: "bg-sky-100 text-sky-600",
  Physical: "bg-orange-100 text-orange-600",
  Mental: "bg-violet-100 text-violet-600",
  Sleep: "bg-indigo-100 text-indigo-600",
  Nutrition: "bg-green-100 text-green-600",
};

// Category list used in edit modal
const categories = [
  { name: "Hydration", icon: DropIcon },
  { name: "Physical", icon: PersonSimpleRunIcon },
  { name: "Mental", icon: BrainIcon },
  { name: "Sleep", icon: BedIcon },
  { name: "Nutrition", icon: BowlFoodIcon },
];

export default function HabitItem({ habit }) {
  // Get action functions from global context
  const { toggleHabit, deleteHabit, editHabit } = useContext(HabitContext);
  
  // Controls whether edit modal is open or closed
  const [showEdit, setShowEdit] = useState(false);
  
  // Pre-fills edit form with current habit values
  const [form, setForm] = useState({
    name: habit.name,
    category: habit.category,
    priority: habit.priority,
    frequency: habit.frequency,
    bestTime: habit.bestTime,
  });

  // Called when user clicks Save in edit modal
  const handleSave = () => {
    editHabit(habit.id, form); // update in global context
    setShowEdit(false); // close the modal
  };

  // Look up the correct icon for this habit's category
  const CategoryIcon = CATEGORY_ICONS[habit.category];

  return (
    <>
      {/* Main Habit Card */}
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group
          ${habit.completed
            ? "bg-purple-50 border-purple-200"  // completed style
            : "bg-white border-slate-100 hover:border-purple-300 hover:shadow-sm" // default style
          }`}
      >
        {/* Toggle Button — clicking marks habit complete or incomplete */}
        <div className="shrink-0 cursor-pointer" onClick={() => toggleHabit(habit.id)}>
          {habit.completed
            ? <CheckCircleIcon size={26} className="text-purple-500" weight="fill" />
            : <CircleIcon size={26} className="text-slate-300 group-hover:text-purple-400 transition" />
          }
        </div>

        {/* Habit Name and subtitle */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleHabit(habit.id)}>
          <p className={`font-semibold text-sm truncate transition
            ${habit.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
            {habit.name}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{habit.frequency} · {habit.bestTime}</p>
        </div>

        {/* Category and Priority Tags */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Category tag with icon */}
          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
            ${CATEGORY_COLORS[habit.category] ?? "bg-slate-100 text-slate-500"}`}>
            {CategoryIcon && <CategoryIcon size={12} />}
            {habit.category}
          </span>
          {/* Priority tag */}
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
            ${PRIORITY_STYLES[habit.priority] ?? "bg-slate-100 text-slate-500"}`}>
            {habit.priority}
          </span>
        </div>

        {/* Edit and Delete buttons — hidden by default, show on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
          <button
            onClick={() => setShowEdit(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-500 hover:bg-purple-50 transition"
          >
            <PencilSimpleIcon size={15} />
          </button>
          <button
            onClick={() => deleteHabit(habit.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
          >
            <TrashIcon size={15} />
          </button>
        </div>
      </div>

      {/* Edit Modal — only renders when showEdit is true */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-700">Edit Habit</h3>
              <button onClick={() => setShowEdit(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {/* Edit Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-1">Habit Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Edit Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-2">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat.name })}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-sm font-medium transition
                        ${form.category === cat.name
                          ? "bg-purple-600 text-white border-purple-600"
                          : "border-slate-200 text-slate-600 hover:border-purple-400 hover:bg-purple-50"
                        }`}
                    >
                      <Icon size={14} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Edit Priority */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-2">Priority</label>
              <div className="flex gap-2">
                {[
                  { level: "Low", active: "bg-emerald-500 text-white border-emerald-500" },
                  { level: "Medium", active: "bg-amber-500 text-white border-amber-500" },
                  { level: "High", active: "bg-rose-500 text-white border-rose-500" },
                ].map(({ level, active }) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setForm({ ...form, priority: level })}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition
                      ${form.priority === level ? active : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

// **Simple explanation:**
// `HabitItem` is like a **sticky note on the board**. It shows the habit name, category icon, priority tag. You can click it to tick it off, hover to see edit/delete buttons, and click edit to open a popup form to change it.

// ---

// ## How All 5 Files Connect
// ```
// main.jsx
//   └── wraps everything with HabitProvider
//         └── App.jsx (routing)
//               ├── AddHabitForm → writes to HabitContext via addHabit()
//               └── Dashboard
//                     └── HabitList → reads from HabitContext
//                           └── HabitItem (one per habit)
//                                 └── reads/writes HabitContext
//                                       (toggle, edit, delete)
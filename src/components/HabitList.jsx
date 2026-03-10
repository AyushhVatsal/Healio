import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import HabitItem from "./HabitItem";
import { ShootingStarIcon } from "@phosphor-icons/react";

export default function HabitList() {
  // Read habits array from global context
  const { habits } = useContext(HabitContext);

  // If no habits exist yet — show friendly empty state
  // This is called an "early return" — stops the rest of the code from running
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-3">
        <ShootingStarIcon size={36} className="text-purple-300" />
        <p className="text-slate-500 font-semibold text-base">No habits yet!</p>
        <p className="text-slate-400 text-sm">
          Hit <span className="text-purple-500 font-bold">+ Add Habit</span> to start your wellness journey 🌱
        </p>
      </div>
    );
  }

  // If habits exist — loop through and render one HabitItem per habit
  // key={habit.id} helps React track which item is which
  // habit={habit} passes the habit data down to HabitItem
  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
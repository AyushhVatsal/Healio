import { createContext, useState } from "react";

// Step 1: Create a context object — think of it as an empty container
export const HabitContext = createContext();

export function HabitProvider({ children }) {
  // Step 2: habits array is the single source of truth
  // All habits live here — starts empty
  const [habits, setHabits] = useState([]);

  // Step 3: Add a new habit to the list
  // ...prev means keep all existing habits, then add the new one at the end
  // completed: false means every new habit starts as not done
  const addHabit = (habit) => {
    setHabits((prev) => [
      ...prev,
      { id: Date.now(), ...habit, completed: false },
    ]);
  };

  // Step 4: Toggle a habit between completed and not completed
  // .map() loops through all habits
  // if the id matches, flip completed to opposite using !
  // if id doesn't match, return habit unchanged
  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  // Step 5: Delete a habit permanently
  // .filter() keeps only habits where id does NOT match
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // Step 6: Edit an existing habit
  // .map() loops through all habits
  // if id matches, merge old habit with new updated data using spread
  const editHabit = (id, updatedHabit) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updatedHabit } : h))
    );
  };

  // Step 7: Reset all habits back to uncompleted
  // useful at the start of a new day
  const resetHabits = () => {
    setHabits((prev) => prev.map((h) => ({ ...h, completed: false })));
  };

  // Step 8: Provide all habits and functions to every component in the app
  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabit, deleteHabit, editHabit, resetHabits }}>
      {children}
    </HabitContext.Provider>
  );
}
import AddHabitForm from "../components/AddHabitForm";

export default function AddHabit() {
  return (
    <div className="bg-slate-100 px-10 pt-4 pb-6">

      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-700">
          Add New Habit
        </h1>
        <p className="text-slate-500 mt-1">
          Create a new wellness goal
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <AddHabitForm />
      </div>

    </div>
  );
}
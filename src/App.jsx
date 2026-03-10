import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import Insights from "./pages/Insights";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome page — no sidebar */}
        <Route path="/" element={<Welcome />} />

        {/* App pages — with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddHabit />} />
          <Route path="/insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { House, PlusCircle, Sparkle } from "@phosphor-icons/react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: House },
  { label: "Add Habit", path: "/add", icon: PlusCircle },
  { label: "Insights", path: "/insights", icon: Sparkle },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-28 flex-col items-center border-r border-slate-200 bg-white">

      <div className="mt-0 mb-6 flex justify-center">
        <img src={logo} alt="Healio logo" className="h-26 w-28 object-contain" />
      </div>

      <nav className="flex flex-1 justify-center">
        <div className="flex flex-1 flex-col items-center justify-start pt-16">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-purple-50 px-3 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "bg-white text-slate-400 hover:bg-purple-100 hover:text-purple-600"
                    }`
                  }
                >
                  <Icon size={22} />
                  <span className="sr-only">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

    </aside>
  );
}
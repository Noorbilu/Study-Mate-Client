import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { LayoutGrid, BookUser, UserCircle, LogOut, Home } from "lucide-react";
import ThemeToggle from "../Components/ThemeToggle";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-fuchsia-50">
      
      <aside className="w-64 bg-white shadow-lg border-r border-fuchsia-100 hidden md:flex flex-col">
        <div className="p-6 border-b border-fuchsia-100">
          <h2 className="text-2xl font-bold text-fuchsia-900">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-fuchsia-100 text-fuchsia-900 font-semibold" : "text-gray-700 hover:bg-fuchsia-50"
              }`
            }
          >
            <LayoutGrid className="w-5 h-5" /> Overview
          </NavLink>

          <NavLink
            to="/dashboard/my-partners"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-fuchsia-100 text-fuchsia-900 font-semibold" : "text-gray-700 hover:bg-fuchsia-50"
              }`
            }
          >
            <BookUser className="w-5 h-5" /> My Partners
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-fuchsia-100 text-fuchsia-900 font-semibold" : "text-gray-700 hover:bg-fuchsia-50"
              }`
            }
          >
            <UserCircle className="w-5 h-5" /> Profile
          </NavLink>
            <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-fuchsia-100 text-fuchsia-900 font-semibold" : "text-gray-700 hover:bg-fuchsia-50"
              }`
            }
          >
            <Home className="w-5 h-5" /> Home
          </NavLink>
        </nav>

        <div className="p-4 border-t border-fuchsia-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-md hover:bg-fuchsia-100 transition text-gray-700"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-6 py-3 bg-fuchsia-100 border-b border-fuchsia-200">
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL || "https://i.ibb.co/2h0b7hN/user.png"}
              alt="avatar"
              className="w-9 h-9 rounded-full border"
            />
            <span className="font-medium text-fuchsia-800">{user?.displayName}</span>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
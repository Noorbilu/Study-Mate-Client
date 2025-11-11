import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error(err);
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold text-fuchsia-800" : "")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allMates" className={({ isActive }) => (isActive ? "font-bold text-fuchsia-800" : "")}>
          Find Partners
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/partnerProfile" className={({ isActive }) => (isActive ? "font-bold text-fuchsia-800" : "")}>
              Create Partner Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/connections" className={({ isActive }) => (isActive ? "font-bold text-fuchsia-800" : "")}>
              My Connections
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-purple-100 shadow-md px-4">
      {/* Mobile / Brand */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-fuchsia-200 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* Brand */}
        <Link to="/" className="text-fuchsia-950 font-bold text-xl ml-2">
          📚 StudyMate
        </Link>
      </div>

      {/* Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links}
        </ul>
      </div>
      <ThemeToggle />

      {/* Right side */}
      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <Link to="/auth/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="profile" src={user.photoURL || "https://i.ibb.co/2h0b7hN/user.png"} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="w-full text-left">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { use } from "react";
import { Link, NavLink } from "react-router"; 
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then()
            .catch()
    }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allMates">Find Partners</NavLink></li>
        {
            user && <>
                <li><NavLink to="/partnerProfile">Create Partner Profile</NavLink></li>
            </>
        }
        {
            user && <>
                <li><NavLink to="/connections">My Connections</NavLink></li>
            </>
        }
        
    </>

  return (
    <div className="navbar bg-purple-100 shadow-sm">
      <div className="navbar-start">
        
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-fuchsia-200 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* Brand */}
        <Link to="/" className="text-fuchsia-950 font-bold text-xl">
          📚 StudyMate
        </Link>
      </div>

      {/* Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

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
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="profile"
                  src={user.photoURL || "https://i.ibb.co/2h0b7hN/user.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

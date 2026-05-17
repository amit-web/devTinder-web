import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
  // Logic remains strictly untouched
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    /* Glassmorphic Container: Sticky with a subtle bottom border */
    <div className="navbar sticky top-0 z-[100] bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8">
      
      {/* Logo Section */}
      <div className="flex-1">
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-2xl font-black tracking-tighter"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👩‍💻</span>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            DevTinder
          </span>
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-4">
          {/* Welcome Text */}
          <div className="hidden sm:block">
            <span className="text-gray-400 text-sm font-medium">Welcome, </span>
            <span className="text-white font-bold">{user.firstName}</span>
          </div>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="group btn btn-ghost btn-circle avatar online transition-all duration-300 hover:ring-2 ring-purple-500/50 ring-offset-2 ring-offset-[#020617]"
            >
              <div className="w-10 rounded-full border border-white/10 overflow-hidden shadow-inner">
                <img 
                  alt="user Image" 
                  src={user.photoUrl || "https://ui-avatars.com/api/?name=" + user.firstName} 
                  className="group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Dropdown Menu - Styled to match Login Card */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#111827] border border-white/10 rounded-2xl z-[1] mt-4 w-56 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <li className="menu-title px-4 py-2 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                Account Settings
              </li>
              
              <li>
                <Link to="/profile" className="flex justify-between items-center py-3 rounded-xl hover:bg-white/5 active:bg-purple-600/20 text-gray-200">
                  Profile
                  <span className="badge badge-primary badge-sm border-none bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">New</span>
                </Link>
              </li>
              
              <li>
                <Link to="/connections" className="py-3 rounded-xl hover:bg-white/5 active:bg-purple-600/20 text-gray-200">
                  Connections
                </Link>
              </li>
              
              <li>
                <Link to="/requests" className="py-3 rounded-xl hover:bg-white/5 active:bg-purple-600/20 text-gray-200">
                  Requests
                </Link>
              </li>

              <div className="divider my-1 opacity-10"></div>
              
              <li>
                <a 
                  onClick={handleLogout}
                  className="py-3 rounded-xl hover:bg-red-500/10 text-red-400 font-semibold transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../../utils/connectionSlice";

const Connections = () => {
  // --- LOGIC: STRICTLY UNCHANGED ---
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const getConnectionData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getConnectionData();
  }, []);
  // --- LOGIC END ---

  if (!connections) return null;

  /* Premium Empty State */
  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="text-6xl opacity-20">🔌</div>
        <h1 className="text-2xl font-black text-white/50 tracking-tighter uppercase">No Connections Yet</h1>
        <p className="text-gray-500 text-xs font-bold max-w-xs">Start swiping on the feed to find your perfect dev match!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-150px)]">
      
      {/* 1. SECTION HEADING: Gradient text to match Navbar */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent inline-block">
          Your Connections
        </h2>
        <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-2 rounded-full opacity-50"></div>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-3 font-bold">You have {connections.length} successful matches</p>
      </div>

      {/* 2. CONNECTIONS LIST */}
      <div className="space-y-4">
        {connections.map((user) => {
          if (!user) return null;
          const { _id, firstName, lastName, photoUrl, age, about, gender } = user;
          
          return (
            /* CONNECTION CARD:
               - Glassmorphism: bg-white/[0.03] and backdrop-blur.
               - Hover effect: Scale and border glow.
            */
            <div 
              key={_id} 
              className="group relative flex items-center gap-4 md:gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/5 p-4 rounded-[2rem] transition-all duration-300 hover:bg-white/[0.06] hover:border-purple-500/30 hover:-translate-y-1 shadow-xl"
            >
              {/* Avatar with Glow Ring */}
              <div className="relative flex-shrink-0">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                  <img 
                    className="h-full w-full object-cover" 
                    src={photoUrl || "https://via.placeholder.com/150"} 
                    alt={firstName} 
                  />
                </div>
                {/* Online Indicator */}
                <div className="absolute bottom-1 right-1 h-4 w-4 bg-emerald-500 border-4 border-[#020617] rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg md:text-xl text-white truncate">
                    {firstName} {lastName}
                  </h3>
                  {age && (
                    <span className="text-gray-500 font-bold text-sm">{age}</span>
                  )}
                </div>
                
                <div className="flex gap-2 my-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                    {gender || "Developer"}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                    Matched
                  </span>
                </div>

                <p className="text-gray-400 text-xs line-clamp-1 mt-1 font-medium italic opacity-80">
                  "{about || "Ready to collaborate and build amazing things."}"
                </p>
              </div>

              {/* Action Buttons (UI Only) */}
              <div className="flex gap-2">
                <button className="p-3 bg-white/5 hover:bg-purple-500/20 rounded-2xl transition-all border border-white/5 hover:border-purple-500/30 group/btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover/btn:text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
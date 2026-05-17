import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestsSlice";
import { BASE_URL } from "../../utils/constant";

const Requests = () => {
  // --- LOGIC: STRICTLY UNCHANGED ---
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const getRequestData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRequestData();
  }, []);
  // --- LOGIC END ---

  if (!requests) return null;

  /* Premium Empty State */
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="text-6xl opacity-20">📬</div>
        <h1 className="text-2xl font-black text-white/50 tracking-tighter uppercase">No Pending Requests</h1>
        <p className="text-gray-500 text-xs font-bold max-w-xs">Looks like your inbox is clean for now!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-150px)]">
      
      {/* 1. SECTION HEADING: Stylish Gradient Text */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent inline-block">
          Pending Invitations
        </h2>
        <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-2 rounded-full opacity-50"></div>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-3 font-bold">You have {requests.length} people waiting to connect</p>
      </div>

      {/* 2. REQUESTS LIST */}
      <div className="space-y-4">
        {requests.map((user) => {
          const { _id, firstName, lastName, photoUrl, age, about, gender } = user.fromUserId;
          
          return (
            /* REQUEST CARD:
               - Glassmorphic look to match your app theme
               - Transition effects for professional feel
            */
            <div 
              key={_id} 
              className="group relative flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/5 p-5 rounded-[2.5rem] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10 shadow-2xl"
            >
              {/* Avatar with Ring */}
              <div className="relative flex-shrink-0">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <img 
                    className="h-full w-full object-cover" 
                    src={photoUrl || "https://via.placeholder.com/150"} 
                    alt={firstName} 
                  />
                </div>
              </div>

              {/* User Content */}
              <div className="flex-1 text-center md:text-left min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <h3 className="font-black text-xl text-white truncate">
                    {firstName} {lastName}
                  </h3>
                  {age && (
                    <span className="text-gray-500 font-bold text-sm">{age} • {gender}</span>
                  )}
                </div>
                <p className="text-gray-400 text-xs line-clamp-2 mt-2 font-medium leading-relaxed italic opacity-80">
                  "{about || "Hey, I'd love to connect and discuss some cool tech projects together!"}"
                </p>
              </div>

              {/* Action Buttons: Red and Gradient Purple to match branding */}
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                {/* REJECT BUTTON */}
                <button
                  className="px-6 py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-400 transition-all active:scale-95"
                  onClick={() => reviewRequest("rejected", user._id)}
                >
                  Reject
                </button>

                {/* ACCEPT BUTTON */}
                <button
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-95"
                  onClick={() => reviewRequest("accepted", user._id)}
                >
                  Accept
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
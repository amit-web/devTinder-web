import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/feedSlice";
import React from "react";

const FeedCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const choicesReview = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    /* Card Container: Height reduced to 400px for better fit */
    <div className="relative w-full max-w-[320px] h-[400px] m-auto group">
      
      {/* Main Card */}
      <div className="relative h-full w-full bg-white/[0.03] backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/20">
        
        {/* Image Area */}
        <div className="relative h-full w-full">
          <img 
            className="h-full w-full object-cover object-center" 
            src={photoUrl || "https://via.placeholder.com/400x600"} 
            alt={firstName} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent"></div>
        </div>

        {/* Content Section: Compact padding (pb-16) */}
        <div className="absolute bottom-0 w-full px-6 pb-16 space-y-1 z-10">
          <div className="flex items-end gap-2">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {firstName}
            </h2>
            {age && (
              <span className="text-lg font-medium text-white/80">{age}</span>
            )}
          </div>

          <div className="flex gap-2">
             <span className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-white uppercase tracking-widest">
               {gender || "Dev"}
             </span>
             <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-400/30 rounded-full text-[9px] font-bold text-purple-300 uppercase tracking-widest">
               Developer
             </span>
          </div>

          <p className="text-gray-200 text-[11px] line-clamp-2 leading-snug opacity-90">
            {about || "Code, Coffee, and Connections."}
          </p>
        </div>
      </div>

      {/* Floating Buttons: Sized down slightly (w-12 h-12) and moved up */}
      <div className="absolute -bottom-5 left-0 right-0 flex justify-center items-center gap-6 z-20">
        <button
          className="w-12 h-12 bg-[#0F172A] border border-red-500/50 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition-all shadow-lg"
          onClick={() => choicesReview("ignored", _id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg"
          onClick={() => choicesReview("intrested", _id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
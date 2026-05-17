import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { addFeed } from "../../utils/feedSlice";
import FeedCard from "./FeedCard";

export const Feed = () => {
  // --- LOGIC: STRICTLY UNCHANGED ---
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const gettingFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    gettingFeed();
  }, []);
  // --- LOGIC END ---

  if (!feed) return null;

  /* Premium "No New Users" State */
  if (feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center space-y-6 animate-in fade-in duration-700">
        <div className="relative">
          <div className="text-8xl opacity-20 filter grayscale">👨‍💻</div>
          <div className="absolute -bottom-2 -right-2 text-4xl animate-bounce">✨</div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white/50 tracking-tighter uppercase">
            No New Developers Found
          </h1>
          <p className="text-gray-500 text-xs font-bold max-w-xs mx-auto leading-relaxed">
            You've seen everyone in your area! Come back later for new talent or try updating your profile.
          </p>
        </div>
        <button 
          onClick={gettingFeed}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all active:scale-95"
        >
          Refresh Feed
        </button>
      </div>
    );
  }

  return (
    feed && (
      /* Main Container: 
         - Window size manage karne ke liye min-h set kiya hai
         - justify-center aur items-center card ko screen ke beech mein rakhenge.
      */
      <div className="relative w-full min-h-[calc(100vh-150px)] flex flex-col items-center justify-center p-4 overflow-hidden">
        
        {/* Background Decorative Glow (Matching Body.js theme) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* The Swipe Card with Entrance Animation */}
        <div className="relative z-10 w-full flex justify-center animate-in slide-in-from-bottom-10 fade-in duration-700 ease-out">
          <FeedCard user={feed[0]} />
        </div>

        {/* Small Navigation Hint */}
        <p className="absolute bottom-10 text-gray-600 text-[9px] font-black uppercase tracking-[0.4em] pointer-events-none animate-pulse">
          Next Developer Waiting
        </p>

      </div>
    )
  );
};
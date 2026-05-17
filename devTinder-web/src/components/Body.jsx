import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gettingLoggedInUser = async () => {
    try {
      const loggedInuUser = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(loggedInuUser.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    gettingLoggedInUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 relative overflow-hidden">
      
      {/* --- COOL BACKGROUND ELEMENTS START --- */}
      
      {/* 1. TECH GRID: Dots wala pattern jo depth deta hai */}
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{ 
          backgroundImage: `radial-gradient(#ffffff33 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }}
      ></div>

      {/* 2. AURORA GLOW: Moving colorful orbs jo app ko "Cool" banate hain */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Purple Orb */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        
        {/* Blue Orb (Moving) */}
        <div 
          className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-bounce" 
          style={{ animationDuration: '10s' }}
        ></div>
      </div>

      {/* --- COOL BACKGROUND ELEMENTS END --- */}

      <Navbar />

      {/* Content Area: Outlet ko hamesha center mein rakhta hai */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-10 w-full">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Body;
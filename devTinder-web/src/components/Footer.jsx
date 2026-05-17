import React from "react";

const Footer = () => {
  return (
    /* Background ko thoda aur transparent kiya hai taaki contrast achha mile */
    <footer className="fixed bottom-0 left-0 w-full bg-[#020617]/90 backdrop-blur-lg border-t border-white/10 py-3 px-6 md:px-12 flex flex-row items-center justify-between z-50">
      
      {/* Left side: White text with glow */}
      <div className="flex items-center gap-2">
        <span className="text-xl">👩‍💻</span>
        <p className="text-[11px] font-extrabold tracking-[0.15em] text-white">
          DEVTINDER <span className="mx-2 text-white/20">|</span> 
          <span className="text-white/70">© {new Date().getFullYear()}</span>
        </p>
      </div>

      {/* Right side: Bright links */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-[10px] font-black text-white hover:text-orange-400 transition-all uppercase tracking-widest cursor-pointer">
          Twitter
        </a>
        <a href="#" className="text-[10px] font-black text-white hover:text-pink-500 transition-all uppercase tracking-widest cursor-pointer">
          Github
        </a>
        <a href="#" className="text-[10px] font-black text-white hover:text-blue-400 transition-all uppercase tracking-widest cursor-pointer">
          LinkedIn
        </a>
      </div>

    </footer>
  );
};

export default Footer;
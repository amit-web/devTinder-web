import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  // --- LOGIC: STRICTLY UNCHANGED ---
  const data = useSelector((store) => store.user);
  // --- LOGIC END ---

  return (
    data && (
      /* 1. LAYOUT CONTAINER: 
         - Window fit ensure karne ke liye min-h-screen use kiya hai.
         - Relative & overflow-hidden background elements ke liye zaroori hai.
      */
      <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center p-2 md:p-6 relative overflow-hidden">
        
        {/* 2. BACKGROUND ELEMENTS: 
           - Tech Grid pattern to match your feed
           - Glowing Aurora Orb for that "Cool" depth
        */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(#ffffff33 0.5px, transparent 0.5px)`, 
            backgroundSize: '30px 30px' 
          }}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        {/* 3. CONTENT WRAPPER:
           - Entrance animation add ki hai taaki page load hote waqt card smooth dikhe.
        */}
        <div className="relative z-10 w-full animate-in fade-in zoom-in duration-500 ease-out">
          <EditProfile />
        </div>
        
      </div>
    )
  );
};

export default Profile;
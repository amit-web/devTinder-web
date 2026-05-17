import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("dhoni77@gmail.com");
  const [password, setPassword] = useState("Dhoni@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, SetError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    SetError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      setIsLogin(true);
      navigate("/");
    } catch (err) {
      SetError(err?.response?.data || "Something went wrong");
    } finally {
       setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    SetError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setIsLogin(true);
      navigate("/profile");
    } catch (err) {
      SetError(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Background Animation Styles
  const animationStyles = `
    @keyframes move {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
    .animate-blob {
      animation: move 8s infinite alternate ease-in-out;
    }
  `;

  return (
    /* Main Wrapper: Fixed height and hidden overflow to prevent scroll */
    <div className="relative flex flex-col flex-1 justify-center items-center bg-[#020617] overflow-hidden min-h-[calc(100vh-130px)] px-4">
      <style>{animationStyles}</style>

      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-blob" style={{animationDelay: '2s'}}></div>

      {/* Glass Card: Height reduced using p-8 and space-y-4 */}
      <div className="relative z-10 w-full max-w-[400px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 transition-all duration-500">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full opacity-80"></div>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="John"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Doe"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Email ID</label>
            <input
              type="text"
              value={emailId}
              placeholder="name@company.com"
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-xs text-center font-medium">{error}</p>
          </div>
        )}

        <button
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
          onClick={isLogin ? handleLogin : handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            isLogin ? "Sign In" : "Sign Up"
          )}
        </button>

        <p
          className="cursor-pointer text-center mt-6 text-gray-400 hover:text-white transition-colors text-xs font-medium"
          onClick={() => { if(!isLoading) { setIsLogin(!isLogin); SetError(""); } }}
        >
          {isLogin ? (
            <>New here? <span className="text-purple-400 font-bold">Create an account</span></>
          ) : (
            <>Already a member? <span className="text-purple-400 font-bold">Login Here</span></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
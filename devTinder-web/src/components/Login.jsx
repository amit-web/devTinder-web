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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data.user);
      dispatch(addUser(res?.data?.user));
      setIsLogin(true);
      return navigate("/");
    } catch (err) {
      SetError(err?.response?.data || "something Went wrong");
    }
  };
  const handleSignUp = async()=>{
    try{
        const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials: true})
        console.log(res.data.data)
        dispatch(addUser(res?.data?.data))
        setIsLogin(true)
        return navigate("/profile")
    }
    catch(err){
      SetError(err?.response?.data || "something Went Wrong")
    }
  }
  return (
    <div className="card bg-info w-96 shadow-xl m-auto my-4 ">
      <div className="card-body text">
        <h2 className="card-title justify-center">
          {isLogin ? "Login" : "SignUp"}
        </h2>
        {!isLogin && (
          <>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-white">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </>
        )}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">Email ID</span>
          </div>
          <input
            type="text"
            value={emailId}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs my-2">
          <div className="label">
            <span className="label-text text-white">Password</span>
          </div>
          <input
            type="password"
            value={password}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p className="text-red-600">{error}</p>

        <p></p>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary " onClick={isLogin?handleLogin:handleSignUp}>
            {isLogin ? "Login" : "SignUp"}
          </button>
        </div>
        <p
          className="cursor-pointer text-center py-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "New user? Signup Here" : "Existing user Login Here"}
        </p>
      </div>
    </div>
  );
};

export default Login;

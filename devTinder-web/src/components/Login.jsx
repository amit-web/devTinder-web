import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId,setEmailId] = useState("dhoni77@gmail.com")
  const [password,setPassword] = useState("Dhoni@123")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogin=async()=>{
     const Userdata = await axios.post(BASE_URL+'/login',{
        emailId,
        password
     },{withCredentials:true});
      console.log(Userdata.data.user);

    dispatch(addUser(Userdata.data.user));
    navigate("/feed")
  }
  return (
    <div className="card bg-info w-96 shadow-xl m-auto my-4 ">
      <div className="card-body text">
        <h2 className="card-title justify-center">Login</h2>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">Email ID</span>
          </div>
          <input
            type="text"
            value={emailId}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black"
            onChange={(e)=>setEmailId(e.target.value)}

          />
        </label>
        <label className="form-control w-full max-w-xs my-2">
          <div className="label">
            <span className="label-text text-white">Password</span>
          </div>
          <input
            type="text"
            value={password}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary " onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

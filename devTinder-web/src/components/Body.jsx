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
     // console.log(loggedInuUser.data)
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
  },[]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

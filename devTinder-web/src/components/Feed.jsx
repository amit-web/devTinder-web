import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { addFeed } from "../../utils/feedSlice";
import FeedCard from "./FeedCard";

export const Feed = () => {
  const feed = useSelector((store)=> store.feed);

  const dispatch = useDispatch();
  const gettingFeed = async () => {
    try {
      
      const feedData = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      //console.log(feedData?.data?.data);
      dispatch(addFeed(feedData?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    gettingFeed();
  }, []);

  return (
    feed&&(
      <div >
      <FeedCard user={feed[0]} />
    </div>
    )
   
  );
};

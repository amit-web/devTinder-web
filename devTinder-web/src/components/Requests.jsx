import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestsSlice";
import { BASE_URL } from "../../utils/constant";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const getRequestData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const url = BASE_URL + "/request/review/" + status + "/" + _id;
      console.log(url);
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getRequestData();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>NO REQUEST!!!</h1>;
  return (
    <div className="text-center">
      <h2 className="text-3xl text-slate-900 font-bold">Request</h2>
      <div className="my-4">
        {requests.map((user) => {
          const { _id, firstName, lastName, photoUrl, age, about, gender } =
            user.fromUserId;
          return (
            <div
              key={_id}
              className="bg-neutral text-white w-9/12 text-center flex justify-around items-center m-auto p-4 rounded-lg my-4"
            >
              <div className="h-20 w-20 ">
                <img
                  className="rounded-full"
                  src={photoUrl}
                  alt="user images"
                />
              </div>

              <div className="w-1/3">
                <h3 className="font-bold text-lg">
                  {firstName + " " + lastName}
                </h3>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>

              <div className="flex justify-evenly w-1/3">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected",user._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted",user._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

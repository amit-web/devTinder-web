import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const getConnectionData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getConnectionData();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections</h1>;
  return connections &&(
    <div className="text-center">
      <h2 className="text-3xl text-slate-900 font-bold">Connections</h2>

    
        {connections.map((user) => {
         if (!user) return 
          const {_id,firstName, lastName, photoUrl, age, about, gender } = user;
         // console.log(_id)
          return  (
          
            <div key={_id} className="bg-neutral text-white w-2/3 text-center flex justify-around items-center m-auto p-4 rounded-lg my-4">
              <div className="h-20 w-20 ">
                <img className="rounded-full" src={photoUrl} alt="user images" />
              </div>

              <div className="w-2/3">
                <h3 className="font-bold text-lg">{firstName + " " + lastName}</h3>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
          
          );
        })}
      </div>
  );
};

export default Connections;

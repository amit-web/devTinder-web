import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age||"");
  const [gender, setGender] = useState(user.gender||"");
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      //  dispatch(addUser(res.data.data))
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      },3000)
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div>
      <div className="flex justify-around m-9">
        <div className="card bg-info w-96 shadow-xl m-auto my-4">
          <div className="card-body text">
            <h2 className="card-title justify-center">Edit User</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">FirstName</span>
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
                <span className="label-text text-white">lastName</span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-white">photoUrl</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-white">Age</span>
              </div>
              <input
                type="text"
                value={age}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-white">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-white">About</span>
              </div>
              <input
                type="text"
                value={about}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            <p className="text-red-700 font-bold">{error}</p>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={saveProfile}>
                SAVE
              </button>
            </div>
          </div>
        </div>
        <div>
          <FeedCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

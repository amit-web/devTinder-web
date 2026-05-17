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
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      setError(""); // Error clear kar raha hoon save se pehle
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 p-4 w-full min-h-[calc(100vh-140px)]">
      
      <div className="w-full max-w-[360px] bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-5">
        <div className="text-center mb-4">
          <h2 className="text-xl font-black text-white tracking-tight">Edit Profile</h2>
          <p className="text-gray-500 text-[8px] uppercase tracking-widest font-bold">Update Identity</p>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label py-0.5"><span className="label-text text-gray-500 font-bold text-[8px] uppercase">First Name</span></label>
              <input type="text" value={firstName} className="input input-sm h-8 bg-black/40 border-white/5 text-white rounded-lg text-xs" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label py-0.5"><span className="label-text text-gray-500 font-bold text-[8px] uppercase">Last Name</span></label>
              <input type="text" value={lastName} className="input input-sm h-8 bg-black/40 border-white/5 text-white rounded-lg text-xs" onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-0.5"><span className="label-text text-gray-500 font-bold text-[8px] uppercase">Photo URL</span></label>
            <input type="text" value={photoUrl} className="input input-sm h-8 bg-black/40 border-white/5 text-white rounded-lg text-xs" onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label py-0.5"><span className="label-text text-gray-500 font-bold text-[8px] uppercase">Age</span></label>
              <input type="number" value={age} className="input input-sm h-8 bg-black/40 border-white/5 text-white rounded-lg text-xs" onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label py-0.5"><span className="label-text text-gray-500 font-bold text-[8px] uppercase">Gender</span></label>
              {/* Values are now lowercase to match backend validation */}
              <select value={gender} className="select select-sm h-8 bg-black/40 border-white/5 text-white rounded-lg text-xs min-h-0 py-0" onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label py-0.5"><span className="label-text text-gray-500 font-bold text-[8px] uppercase">About</span></label>
            <textarea value={about} className="textarea textarea-bordered bg-black/40 border-white/5 text-white rounded-lg h-14 text-xs leading-tight min-h-0" onChange={(e) => setAbout(e.target.value)} />
          </div>
        </div>

        {error && (
          <div className="mt-2 p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
             <p className="text-red-400 text-[9px] text-center font-bold break-words">{error}</p>
          </div>
        )}

        <button className="btn btn-sm h-9 min-h-0 w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white font-black text-[10px] tracking-widest rounded-xl shadow-lg" onClick={saveProfile}>
          SAVE CHANGES
        </button>
      </div>

      <div className="flex flex-col items-center justify-center lg:pt-2 flex-shrink-0">
        <p className="text-gray-500 text-[7px] font-black uppercase tracking-[0.3em] mb-2">Live Preview</p>
        <div className="scale-[0.7] md:scale-[0.8] lg:scale-90 origin-top">
          <FeedCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-[200]">
          <div className="alert bg-emerald-500 text-white border-none py-1.5 px-4 rounded-xl shadow-lg">
            <span className="text-[10px] font-bold">Profile Saved!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
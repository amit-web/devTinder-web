import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/feedSlice";

const FeedCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, skills, about, photoUrl } =
    user;
  const dispatch = useDispatch();
  const choicesReview = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl m-auto ">
      <figure>
        <img className="h-full w-full" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && gender && <p>{age + " " + gender}</p>}
        <div className="card-actions justify-around">
          <button
            className="btn btn-primary"
            onClick={() => choicesReview("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => choicesReview("intrested", _id)}
          >
            Intrested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

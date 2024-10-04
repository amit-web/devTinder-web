import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const data = useSelector((store) => store.user);
  return (
    data && (
      <div>
        <EditProfile />
      </div>
    )
  );
};

export default Profile;

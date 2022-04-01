import { useUserState } from "../../../context/TaskContext";

const Profile: React.FC = () => {
  const { isLoggedIn, user } = useUserState();

  if (isLoggedIn) {
    return (
      <div>
        <h1> Welcome Back {user.username}! </h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1> No Account found! Log-In/Register to proceed!</h1>
      </div>
    );
  }
};
export default Profile;

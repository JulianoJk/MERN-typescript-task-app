import { useUserState } from "../../../context/UserContext";
import URLError from "../URLError/URLError";

const Profile: React.FC = () => {
  const { isLoggedIn, user } = useUserState();

  const isLoggedInLocal = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    return (
      <div>
        <h1> Welcome Back {user.username}! </h1>
      </div>
    );
  } else {
    return (
      <div>
        <URLError
          navText="No Account found. To proceed, you must be logged-in!"
          navigationPath="/login"
          btnText="Login"
        />
      </div>
    );
  }
};
export default Profile;

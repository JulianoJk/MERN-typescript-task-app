import React from "react";
import { useUserState } from "../../../context/UserContext";
import TaskForm from "../../Tasks/TaskForm/TaskForm";
import URLError from "../URLError/URLError";

const Home: React.FC = () => {
  const { isLoggedIn } = useUserState();

  if (isLoggedIn) {
    return (
      <div>
        <TaskForm />
      </div>
    );
  } else {
    return (
      <div>
        <URLError
          navText="No Account found!"
          bodyText="To proceed, you must be logged-in!"
          navigationPath="/login"
          btnText="Login"
        />
      </div>
    );
  }
};

export default Home;

import React from "react";
import { useUserState } from "../../../context/UserContext";
import TaskForm from "../../Tasks/TaskForm/TaskForm";

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
        <h1> No Account found! Log-In/Register to proceed!</h1>
      </div>
    );
  }
};

export default Home;

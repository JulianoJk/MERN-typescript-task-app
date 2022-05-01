import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTaskDispatch } from "../../../context/TaskContext";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import { Button } from "../../button/Button";
import styles from "./Navigation.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navigation: React.FC = () => {
  const userDispatch = useUserDispatch();
  const { isLoggedIn } = useUserState();
  const navigate = useNavigate();

  const todoDispatch = useTaskDispatch();

  const location = useLocation();

  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    todoDispatch({ type: "RESET_STATE" });
    navigate("/");
  };
  // state for the className of nav. If user navigates to a path which doesn't exist, hide nav bar to display NoURL component
  const [checkURL, setCheckURL] = useState(`navbar-nav mr-auto  ${styles.bg}`);

  // Check if url is in the array and render every time location is changed
  useEffect(() => {
    const allPaths: Array<string> = [
      "/home",
      "/profile",
      "/login",
      "/register",
      "/",
    ];

    // If path is in the array, display normal nav bar
    if (allPaths.includes(location.pathname)) {
      // Check if user is logged or not. If no and tries to navigate to home or profile, set state to noURL(in order to display error message of page not found)
      if (
        !isLoggedIn &&
        (location.pathname === "/home" || location.pathname === "/profile")
      ) {
        setCheckURL(`${styles.noURL}`);
      } else {
        setCheckURL(`navbar-nav mr-auto  ${styles.bg}`);
      }
    } else {
      setCheckURL(`${styles.noURL}`);
    }
  }, [isLoggedIn, location]);

  // Check if is user is logged or not
  if (isLoggedIn) {
    return (
      <header>
        <nav className={`${checkURL}`}>
          <div className="d-flex flex-row-reverse bd-highlight space ms-auto">
            {/* create a responsive btn group */}
            <Button
              text={"Log-Out"}
              onClick={logOut}
              className={`${styles.btn}`}
            />

            <Link
              to="/home"
              className={`btn btn-outline-primary text-light text-opacity-75 ${styles.btn}`}
            >
              Home
            </Link>

            <Link
              to="/profile"
              className={`btn btn-outline-primary text-white text-opacity-75 ${styles.btn}`}
            >
              Profile
            </Link>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header>
        <nav className={checkURL}>
          <div className="d-flex flex-row-reverse bd-highlight space ms-auto ">
            {/* create a responsive btn group */}
            <Link
              to="/register"
              className={`btn text-white ${styles.login_btn} ${styles.btn} `}
            >
              Register
            </Link>

            <Link
              to="/login"
              className={`btn btn-outline-success text-white ${styles.btn} `}
            >
              Login
            </Link>

            <Link
              to="/"
              className={`btn btn-outline-success text-white text-opacity-75 ${styles.btn}`}
            >
              Index
            </Link>
          </div>
        </nav>
      </header>
    );
  }
};
export default Navigation;

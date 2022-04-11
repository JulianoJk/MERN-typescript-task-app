import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useTaskDispatch,
  useUserDispatch,
  useUserState,
} from "../../../context/TaskContext";
import { Button } from "../../button/Button.component";
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  const userDispatch = useUserDispatch();
  const { isLoggedIn } = useUserState();
  const navigate = useNavigate();

  const todoDispatch = useTaskDispatch();

  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    todoDispatch({ type: "RESET_STATE" });
    navigate("/");
  };

  // Check if is user is logged or not
  if (isLoggedIn) {
    return (
      <header>
        <nav className={`navbar  ${styles.bg}`}>
          <div className="d-flex flex-row-reverse bd-highlight space ms-auto">
            {/* create a responsive btn group */}
            <Link
              to="/home"
              className="btn btn-outline-primary text-light text-opacity-75"
            >
              Home
            </Link>

            <Link
              to="/profile"
              className="btn btn-outline-primary text-white text-opacity-75"
            >
              Profile
            </Link>
          </div>
          <div className="d-grid gap-2">
            <Button text={"logOut"} onClick={logOut} />
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header>
        <nav className={`navbar  ${styles.bg}`}>
          <div className="d-flex flex-row-reverse bd-highlight space ms-auto ">
            {/* create a responsive btn group */}
            <Link
              to="/register"
              className="btn btn-primary bg-info text-white "
            >
              Register
            </Link>

            <Link to="/login" className="btn btn-outline-primary text-info ">
              Login
            </Link>

            <Link
              to="/"
              className="btn btn-outline-primary text-light text-opacity-75"
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

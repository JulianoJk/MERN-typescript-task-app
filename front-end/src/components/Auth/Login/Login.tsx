import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTaskDispatch, useUserDispatch } from "../../../context/TaskContext";
import { IUserInfoContext, usersDispatchContext } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import { getTasks, loginAPI } from "../../../API/Api";
import Logo from "../../../images/logo.png";
import "../Auth.css";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const [errorMessage, setErrorMessage] = useState<
    string | IUserInfoContext | null | undefined
  >();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // After logIn create get request to get (if any) tasks
  const setTodoDispatch = useTaskDispatch();
  const taskDispatch: usersDispatchContext = useUserDispatch();

  // Email handler
  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    setEmail(e.target.value);
  };
  // Password handler
  const onPasswordChange = (e: React.BaseSyntheticEvent): void => {
    setPassword(e.target.value);
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await loginAPI(email, password);

      // Check the type of the data is returned, if is string, it contains a message which means error and display error
      // If data is not string, it contains user's information (token, id, email) and the login was successful
      if (typeof data === "string" || data instanceof String) {
        setErrorMessage(data);
      } else if (data) {
        const user: IUserInfoContext = {
          id: data["id"],
          username: data["username"],
          token: data["token"],
        };
        taskDispatch({ type: "SET_USER", user: user });
        taskDispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: true });

        //Get if any tasks from server
        getTasks(user, setTodoDispatch);
        navigate("/home");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="container flex-column input-container border ">
      <div>
        <img src={Logo} alt="Logo" className="rounded mx-auto d-block " />
      </div>
      <form onSubmit={handleInputs}>
        <label htmlFor="email" className="control-label text">
          <strong>Email:</strong>
        </label>
        <input
          type="email"
          className="form-control email-icon"
          value={email}
          id="email"
          placeholder="name@example.com"
          onChange={onEmailChange}
          autoComplete="on"
        />

        <br />
        <label htmlFor="password" className="control-label text">
          <strong>Password:</strong>
        </label>
        <input
          type="password"
          value={password}
          className="form-control password-icon"
          id="password"
          onChange={onPasswordChange}
          placeholder="Password"
          autoComplete="on"
        />
        <br />
        <div className="d-grid gap-2">
          <Button text={"Submit"} />
        </div>
      </form>
      <Link to="/register" className="text flex-wrap link-light">
        Not a member?
      </Link>
      {/* Display error if there is any */}
      <div className={ErrorHandler(errorMessage)}>
        <strong>{errorMessage}!</strong>
      </div>
    </div>
  );
};
export default Login;

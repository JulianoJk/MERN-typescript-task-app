import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EActionTypes,
  IAuthCredentials,
  IUserInfoContext,
  usersDispatchContext,
} from "../../../Model/models";
import { useUserDispatch } from "../../../context/TaskContext";
import { Button } from "../../button/Button.component";
import { registerAPI } from "../../../API/Api";
import Logo from "../../../images/logo.png";
import "../Auth.css";

// Initial state for the user credentials
const initState: IAuthCredentials = {
  email: undefined,
  username: undefined,
  password: undefined,
  passwordRepeat: undefined,
};

// Reducer to set credentials for the user
const reducer = (state: IAuthCredentials, action: IAuthCredentials) => {
  switch (action.type) {
    case EActionTypes.SET_EMAIL:
      return { ...state, email: action.email };
    case EActionTypes.SET_NAME:
      return { ...state, username: action.username };
    case EActionTypes.SET_PASSWORD:
      return { ...state, password: action.password };
    case EActionTypes.SET_CONFIRM_PASSWORD:
      return { ...state, passwordRepeat: action.passwordRepeat };
    default:
      return { ...state };
  }
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [internalState, formDispatch] = useReducer(reducer, initState);
  const taskDispatch: usersDispatchContext = useUserDispatch();

  // Email handler
  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_EMAIL, email: e.target.value });
  };

  const onNameChange = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_NAME, username: e.target.value });
  };

  const handlePassword = (e: React.BaseSyntheticEvent): void => {
    formDispatch({ type: EActionTypes.SET_PASSWORD, password: e.target.value });
  };

  const handleConfirmPassword = (e: React.BaseSyntheticEvent): void => {
    formDispatch({
      type: EActionTypes.SET_CONFIRM_PASSWORD,
      passwordRepeat: e.target.value,
    });
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await registerAPI(
        `${internalState.email}`,
        `${internalState.username}`,
        `${internalState.password}`,
        `${internalState.passwordRepeat}`
      );
      // Check the type of the data is returned, if is string, it contains a message which means error and display error
      // If data is not string, it contains user's information (token, id, email) and the login was successful
      if (typeof data === "string" || data instanceof String) {
        alert(data);
      } else if (data) {
        const user: IUserInfoContext = {
          id: data["id"],
          username: data["username"],
          token: data["token"],
        };
        taskDispatch({ type: "SET_USER", user: user });
        taskDispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: true });
        navigate("/home");
      }
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div className="container flex-column input-container w-50 p-3 border border_style">
      <div>
        <img src={Logo} alt="Logo" className="rounded mx-auto d-block " />
      </div>

      <h1 className="title">Register</h1>
      <form onSubmit={handleInputs}>
        <label htmlFor="email" className="control-label text">
          <strong>Email:</strong>
        </label>
        <input
          type="email"
          value={initState.email}
          className="form-control email-icon"
          id="email"
          placeholder="name@example.com"
          onChange={onEmailChange}
          required={true}
          minLength={5}
          autoComplete="on"
        />
        <br />
        <label htmlFor="Username" className="control-label text">
          <strong>Username: (optional)</strong>
        </label>
        <input
          type="text"
          value={initState.username}
          className="form-control user-icon"
          id="Username"
          placeholder="John Smith"
          onChange={onNameChange}
          autoComplete="on"
        />
        <br />
        <label htmlFor="password" className="control-label text">
          <strong>Password:</strong>
        </label>
        <input
          type="password"
          value={initState.password}
          className="form-control password-icon"
          id="password"
          placeholder="Password"
          onChange={handlePassword}
          required={true}
          minLength={6}
          autoComplete="on"
        />
        <br />
        <label htmlFor="confirmPassword" className="control-label text">
          <strong>Confirm Password:</strong>
        </label>
        <input
          type="password"
          value={initState.passwordRepeat}
          className="form-control password-icon"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleConfirmPassword}
          required={true}
          minLength={6}
          autoComplete="on"
        />
        <br />
        <div className="d-grid gap-2">
          <Button text={"Submit"} />
        </div>
      </form>
      <Link to="/login" className="text flex-wrap link-light">
        Already a member?
      </Link>
    </div>
  );
};
export default Register;

import React, { useContext, useReducer } from "react";
import {
  usersDispatchContext,
  IChildrenProvider,
  StateInterface,
  TUserAction,
} from "../Model/models";

// Default state fot the user context
const defaultState: StateInterface = {
  user: {
    username: undefined,
    token: undefined,
    id: undefined,
  },
  isLoggedIn: false,
};

const UserStateContext = React.createContext<StateInterface | undefined>(
  undefined
);
UserStateContext.displayName = "UserStateContext";
const UserDispatchContext = React.createContext<
  usersDispatchContext | undefined
>(undefined);

// Reducer function
const appReducer = (state: StateInterface, action: TUserAction) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    case "RESET_STATE":
      return { ...defaultState };
    default:
      return { ...state };
  }
};
// Context Provider for the user
const UserContextProvider = ({ children }: IChildrenProvider) => {
  const [userState, userDispatch] = useReducer(appReducer, defaultState);

  return (
    <UserStateContext.Provider value={userState}>
      <UserDispatchContext.Provider value={userDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
// Pass the state of the user
const useUserState = (): StateInterface => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within UserDispatchContext");
  }
  return context;
};

// Function to use the userDispatch
const useUserDispatch = (): usersDispatchContext => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within UserDispatchContext");
  }
  return context;
};

export { UserContextProvider, useUserState, useUserDispatch };

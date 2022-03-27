import React, { useContext, useReducer } from "react";
import {
  usersDispatchContext,
  taskDispatchContext,
  ITasks,
  StateInterface,
  TUserAction,
  TTaskActionContext,
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

// TODO:Check
const defaultTaskArray: ITasks[] = [
  {
    taskName: undefined,
    user_id: undefined,
    completed: undefined,
  },
];

// Interface for the TaskContextProvider children
interface ITaskContextProvider {
  children: React.ReactNode;
}

const UserStateContext = React.createContext<StateInterface | undefined>(
  undefined
);
UserStateContext.displayName = "UserStateContext";
const UserDispatchContext = React.createContext<
  usersDispatchContext | undefined
>(undefined);

// TODO:Check
const TaskDispatchContext = React.createContext<
  taskDispatchContext | undefined
>(undefined);

// TODO!: Check
// Context for the tasks
const TodoArrayContext = React.createContext<ITasks[] | undefined>(undefined);

// Reducer function for the tasks
const taskReducer = (state: ITasks[], action: TTaskActionContext) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: action.tasks };
    case "DELETE_TASK":
      return { ...state, tasks: action.tasks };
    default:
      return { ...state };
  }
};

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

// TODO!:Check
const TasksContextProvider = ({ children }: ITaskContextProvider) => {
  const [taskState, taskDispatch] = useReducer(taskReducer, defaultTaskArray);

  return (
    <TodoArrayContext.Provider value={taskState}>
      <TaskDispatchContext.Provider value={taskDispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TodoArrayContext.Provider>
  );
};

const UserContextProvider = ({ children }: ITaskContextProvider) => {
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
const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useTaskState must be used within TaskContextProvider");
  }
  return context;
};

// Function to use the userDispatch
const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within TaskContextProvider");
  }
  return context;
};
// Pass the state of the user
const useTaskState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useTaskState must be used within TaskContextProvider");
  }
  return context;
};

// Function to use the userDispatch
const useTaskDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within TaskContextProvider");
  }
  return context;
};

export { UserContextProvider, useUserState, useUserDispatch };

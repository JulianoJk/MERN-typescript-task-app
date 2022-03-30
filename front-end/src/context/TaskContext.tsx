import React, { useContext, useEffect, useReducer } from "react";
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

// Create an empty default array for the tasks
// INFO: The array is empty due to if we assign undefined or empty values, it is going to be displayed
const defaultTaskArray: ITasks[] = [
  
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

// Context for the tasks
const TodoArrayContext = React.createContext<ITasks[] | undefined>(undefined);

// Reducer function for the tasks
const taskReducer = (state: ITasks[], action: TTaskActionContext) => {
  switch (action.type) {
    case "ADD_TASK":
      // Add the tasks to the array
      return [...state, action.tasks];
    case "DELETE_TASK":
      return state.filter((item: ITasks) => item.taskID !== action.taskID);

    case "RESET_STATE":
      // After logout, empty the array with tasks from context
      return [...defaultTaskArray];
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

// TODO!:Check
const TasksContextProvider = ({ children }: ITaskContextProvider) => {
  const [taskState, taskDispatch] = useReducer(taskReducer, defaultTaskArray);
  useEffect(()=>{
    console.log(taskState);
    
  },[taskState])

  return (
    <TodoArrayContext.Provider value={taskState}>
      <TaskDispatchContext.Provider value={taskDispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TodoArrayContext.Provider>
  );
};

// Pass the state of the user
const useTaskState = () => {
  const context = useContext(TodoArrayContext);
  if (context === undefined) {
    throw new Error("useTaskState must be used within TaskContextProvider");
  }
  return context;
};

// Function to use the userDispatch
const useTaskDispatch = () => {
  const context = useContext(TaskDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within TaskContextProvider");
  }
  return context;
};

export {
  UserContextProvider,
  useUserState,
  useUserDispatch,
  TasksContextProvider,
  useTaskState,
  useTaskDispatch,
};

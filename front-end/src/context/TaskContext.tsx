import React, { useContext, useReducer } from "react";
import {
  usersDispatchContext,
  TodoAction,
  ITasks,
  StateInterface,
  TUserAction,
  taskDispatchContext,
} from "../Model/models";
import { v4 as uuid } from "uuid";

// Default state fot the user context
const defaultState: StateInterface = {
  user: {
    username: undefined,
    token: undefined,
    id: undefined,
  },
  isLoggedIn: false,
};

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

// Reducer function for the tasks
const taskReducer = (state: Array<ITasks>, action: TodoAction) => {
  switch (action.type) {
    case "ADD_TASK":
      // Add the tasks to the array
      return [...state, newTodo(action.payload.taskName)];
    case "UPDATE_TASK":
      return state.map((todo) => {
        if (todo.taskID === action.payload.taskID) {
          return { ...todo, isComplete: !todo.completed };
        }
        return todo;
      });
    case "DELETE_TASK":
      return state.filter((todo) => todo.taskID !== action.payload.taskID);
    case "GET_TASK":
      return [...state, action.payload];
    case "RESET_STATE":
      // After logout, empty the array with tasks from context
      return [];
    default:
      return state;
  }
};

// save new tasks
const newTodo = (taskName: string): ITasks => {
  return { taskID: uuid(), taskName: taskName, completed: false };
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
// Context Provider for the user
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
    throw new Error("useTaskDispatch must be used within UserDispatchContext");
  }
  return context;
};

// context for the task dispatch
const TaskDispatchContext = React.createContext<
  taskDispatchContext | undefined
>(undefined);

// Context for the tasks
const TodoArrayContext = React.createContext<ITasks[] | undefined>(undefined);

// Function for the task context provider
const TasksContextProvider = ({ children }: ITaskContextProvider) => {
  const [taskState, taskDispatch] = useReducer(taskReducer, []);

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

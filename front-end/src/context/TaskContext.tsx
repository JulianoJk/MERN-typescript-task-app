import React, { useContext, useReducer } from "react";
import {
  TodoAction,
  ITasks,
  taskDispatchContext,
  IChildrenProvider,
} from "../Model/models";

const defaultTaskState: Array<ITasks> = [
  {
    taskName: undefined,
    _id: undefined,
    completed: undefined,
  },
];

// Reducer function for the tasks
const taskReducer = (state: Array<ITasks>, action: TodoAction) => {
  switch (action.type) {
    case "ADD_TASK":
      // save new tasks
      const newTodo = (
        taskName: string | undefined,
        _id: string | undefined,
        completed: boolean | undefined
      ): ITasks => {
        return { taskName: taskName, _id: _id, completed: completed };
      };
      // Add the tasks to the array
      return [
        ...state,
        newTodo(action.payload.taskName, action.payload._id, action.payload.completed),
      ];
    case "UPDATE_TASK":
      return state.map((todo) => {
        if (todo._id === action.payload._id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case "DELETE_TASK":
      return state.filter((todo) => todo._id !== action.payload._id);
    case "GET_TASK":
      console.log(state);

      return [...state, action.payload];
    case "EDIT_TASK":
      return { ...state, taskName: action.payload };
    case "RESET_STATE":
      // After logout, empty the array with tasks from context
      return [];
    default:
      return state;
  }
};

// context for the task dispatch
const TaskDispatchContext = React.createContext<
  taskDispatchContext | undefined
>(undefined);

// Context for the tasks
const TodoArrayContext = React.createContext<ITasks[] | undefined>(undefined);

// Function for the task context provider
const TasksContextProvider = ({ children }: IChildrenProvider) => {
  const [taskState, taskDispatch] = useReducer(taskReducer, defaultTaskState);

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

export { TasksContextProvider, useTaskState, useTaskDispatch };

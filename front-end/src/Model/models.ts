// Interface for the user Context
// Type message for the auth response(if there is an error to display to user, E.G.: "Wrong Password")
export interface IUserInfoContext {
  message?: string | undefined;
  username: string | undefined;
  token: string | undefined;
  id: string | undefined;
}

//interface for the context's default state
export interface StateInterface {
  user: IUserInfoContext;
  isLoggedIn: boolean;
}

// Type for the action for the context
export type TUserAction =
  | {
      type: "SET_USER";
      user: IUserInfoContext;
    }
  | {
      type: "SET_IS_LOGGED_IN";
      isLoggedIn: boolean;
    }
  | {
      type: "RESET_STATE";
    };

// Interface for the reducer action to add tasks
interface AddTodoAction {
  type: "ADD_TASK";
  payload: { taskName: string };
}
// Interface for the reducer action to update and delete
interface ModifyTodoAction {
  type: "UPDATE_TASK" | "DELETE_TASK";
  payload: { taskID: string };
}
// Delete all locally saved tasks
interface ResetTodoAction {
  type: "RESET_STATE";
}

// Dispatch reducer for the task
export type TodoAction = AddTodoAction | ModifyTodoAction | ResetTodoAction;

// Type for the dispatch reducer user
export type usersDispatchContext = (action: TUserAction) => void;

// Type for the dispatch reducer task
export type taskDispatchContext = (action: TodoAction) => void;

// An enum with all the types of actions to use in the registration useReduce
export enum EActionTypes {
  SET_EMAIL = "SET_EMAIL",
  SET_NAME = "SET_NAME",
  SET_PASSWORD = "SET_PASSWORD",
  SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD",
}

// Interface the the registration
export interface IAuthCredentials {
  type?: EActionTypes;
  email?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  passwordRepeat?: string | undefined;
}

export interface ITasks {
  taskName: string;
  taskID: string;
  completed: boolean;
}

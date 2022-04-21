// Interface for the user Context
// Type message for the auth response(if there is an error to display to user, E.G.: "Wrong Password")
export interface IUserInfoContext {
  message?: string | undefined;
  username: string | undefined;
  token: string | undefined;
  id: string | undefined;
}
// Delete all locally saved tasks
interface ResetAction {
  type: "RESET_STATE";
}
//interface for the context's default state
export interface StateInterface {
  user: IUserInfoContext;
  isLoggedIn: boolean;
}
interface setUserAction {
  type: "SET_USER";
  user: IUserInfoContext;
}
interface setLogInUserAction {
  type: "SET_IS_LOGGED_IN";
  isLoggedIn: boolean;
}
// Type for the action for the context
export type TUserAction = setUserAction | setLogInUserAction | ResetAction;

// Dispatch reducer for the task
export type TodoAction =
  | {
      type: "ADD_TASK";
      payload: {
        taskName: string | undefined;
        _id: string | undefined;
        completed: boolean | undefined;
      };
    }
  | {
      type: "UPDATE_TASK" | "DELETE_TASK" | "EDIT_TASK";
      payload: {
        completed?: boolean;
        _id: string | undefined;
        taskName?: string;
      };
    }
  | ResetAction
  | {
      type: "GET_TASK";
      payload: ITasks;
    };
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
  error?: string
  taskName: string | undefined ;
  _id: string | undefined ;
  completed: boolean | undefined;
}

// Interface for the TaskContextProvider children
export interface IChildrenProvider {
  children: React.ReactNode;
}

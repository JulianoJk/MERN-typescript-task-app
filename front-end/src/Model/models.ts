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
// Type for the action for the context
export type TTaskActionContext =
  | {
      type: "ADD_TASK";
      tasks: ITasks;
    }
  // to delete the task from the task array in context, 
  | {
      type: "DELETE_TASK"; 
      taskID: number;
    }
  | {
      type: "RESET_STATE";
    };
// Type for the dispatch reducer user
export type usersDispatchContext = (action: TUserAction) => void;

// Dispatch reducer for the task
export type taskDispatchContext = (action: TTaskActionContext) => void;

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
  taskName: string | undefined;
  user_id: string | undefined;
  completed: boolean | undefined;
  // Add a id to each task to use it locally 
  taskID: any
}

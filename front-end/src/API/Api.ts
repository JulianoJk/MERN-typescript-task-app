import { ITasks, IUserInfoContext, taskDispatchContext } from "../Model/models";

// API call to use when user wants to login
export const loginAPI = async (
  email: string,
  password: string
): Promise<IUserInfoContext | string | null | undefined> => {
  try {
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data: IUserInfoContext = await response.json();
    if (response.ok) {
      return data;
    } else {
      return data.message;
    }
  } catch (error) {
    return null;
  }
};

// API call to use when user wants to register
export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  passwordRepeat: string
): Promise<IUserInfoContext | string | null | undefined> => {
  try {
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        passwordRepeat: passwordRepeat,
      }),
    });
    const data: IUserInfoContext = await response.json();
    if (response.ok) {
      return data;
    } else {
      return data.message;
    }
  } catch (error) {
    return null;
  }
};

// Return tasks to server
export const submitTasks = async (
  user: IUserInfoContext,
  todos: ITasks[]
): Promise<void> => {
  await fetch(`http://localhost:3001/tasks/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${user.token}`,
    },

    body: JSON.stringify({
      // return to the server the tasks object
      todos,
      user,
    }),
  });
  console.log("Tasks sended!");
};

// After login, retrieve (if any) saved tasks from the server
// get the tasks from the server and push to array
export const getTasks = async (
  user: IUserInfoContext,
  setTodoDispatch: taskDispatchContext
): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3001/tasks/get/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${user.token}`,
      },
    });
    const data: ITasks[] = await response.json();
    for (let i = 0; i < data.length; i++) {
      setTodoDispatch({ type: "ADD_TASK", payload: { ...data[i] } });
    }
  } catch (error) {
    console.error(error);
  }
};

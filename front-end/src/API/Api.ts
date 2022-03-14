import { IAuthCredentials, IUserContext } from "../Model/models";

// API call to use when user wants to register
export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  passwordRepeat: IAuthCredentials 
  ): Promise<IAuthCredentials | boolean> => {
  const response = await fetch('http://localhost:3001/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
      passwordRepeat: passwordRepeat,
    }),
  });
  const data: IAuthCredentials = await response.json();
  return data;
};



// API call to use when user wants to login
export const loginAPI = async (
  email: string,
  password: string,
  ): Promise<IAuthCredentials | IUserContext |boolean> => {
		const response = await fetch('http://localhost:3001/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
  const data: IUserContext = await response.json();
  // if response is true, return the data, else return false
  if(response.ok){
    return data;
  }else{
    return false;
  }
};


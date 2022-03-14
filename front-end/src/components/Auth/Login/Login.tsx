import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../../API/Api';
import { useTaskDispatch } from '../../../context/TaskContext';
import '../Auth.css';
const Login:React.FC = ()=> {
  const navigate = useNavigate();
  

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const taskDispatch = useTaskDispatch();
	// TODO!: Remove any
	const [user, setUser] = useState<any>(undefined)


  // Email handler	
  const onEmailChange = (e: React.BaseSyntheticEvent):void => {
		setEmail(e.target.value);
	};
  // Password handler
	const onPasswordChange = (e: React.BaseSyntheticEvent):void => {
		setPassword(e.target.value);
	};
	
	const handleInputs = async (e: React.BaseSyntheticEvent) =>{
		e.preventDefault();

		// Pass the values to the API call
		const data = await loginAPI(email, password);
		if(data){
			setUser(data)
			taskDispatch({ type: 'SET_USER', user: user });
			taskDispatch({ type: 'SET_IS_LOGGED_IN', isLoggedIn: true });
			navigate('/home');
		}else{
			alert("Please try again!")
		}
	}

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleInputs}>
			<label htmlFor="email" className="control-label text">
				<strong>Email:</strong>
			</label>
			<input
				type="email"
				className="form-control"
				value={email}
				id="email"
				placeholder="name@example.com"
				onChange={onEmailChange}
				autoComplete="on"
			/>
			<br />

			<label htmlFor="password" className="control-label text">
				<strong>Password:</strong>
			</label>
			<input
				type="password"
				value={password}
				className="form-control"
				id="password"
				onChange={onPasswordChange}
				placeholder="Password"
				autoComplete="on"
			/>
			<br />
			<div className="d-grid gap-2">
				<button>Submit</button>
			</div>
		</form>
    </div>
  )
}
export default Login;
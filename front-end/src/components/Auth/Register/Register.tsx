import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../../../API/Api';
import { IAuthCredentials } from '../../../Model/models';
import { useTaskDispatch } from '../../../context/TaskContext';
import '../Auth.css';
  

  const initState: IAuthCredentials = {
	email: undefined,
	username: undefined,
	password: undefined,
	passwordRepeat: undefined
};

// An enum with all the types of actions to use in our reducer
enum EActionTypes{
	SET_EMAIL = "SET_EMAIL",
	SET_NAME="SET_NAME",
	SET_PASSWORD="SET_PASSWORD",
	SET_CONFIRM_PASSWORD="SET_CONFIRM_PASSWORD"
}

// An interface for our actions
// interface IReducerAction {
// 	type?: EActionTypes;
// 	email?: string;
// 	username?: string
// 	password?: string
// 	passwordRepeat?: string
//   }

// TODO!: Remove any from action: any
const reducer = (state: IAuthCredentials, action: any) => {
	switch (action.type) {
		case EActionTypes.SET_EMAIL:
			return { ...state, email: action.email };
		case EActionTypes.SET_NAME:
			return { ...state, username: action.username };
		case EActionTypes.SET_PASSWORD:
			return { ...state, password: action.password };
		case EActionTypes.SET_CONFIRM_PASSWORD:
			return { ...state, passwordRepeat: action.passwordRepeat };
		default:
			return { ...state };
	}
};


const Register:React.FC = ()=> {
	const navigate = useNavigate();
	const [internalState, formDispatch] = useReducer(reducer, initState);
	const taskDispatch = useTaskDispatch();
	// TODO!: Remove any
	const [user, setUser] = useState<any>(undefined)

  // Email handler	
	const onEmailChange = (e: React.BaseSyntheticEvent):void => {
		formDispatch({ type: EActionTypes.SET_EMAIL, email: e.target.value });
	};

	const onNameChange = (e: React.BaseSyntheticEvent):void => {
		formDispatch({ type: EActionTypes.SET_NAME, username: e.target.value });
	};

	const handlePassword = (e: React.BaseSyntheticEvent):void => {
		formDispatch({ type: EActionTypes.SET_PASSWORD, password: e.target.value });
	};

	const handleConfirmPassword = (e: React.BaseSyntheticEvent):void => {
		formDispatch({ type: EActionTypes.SET_CONFIRM_PASSWORD, passwordRepeat: e.target.value });
	};

	const handleInputs = async (e: React.BaseSyntheticEvent) =>{
		e.preventDefault();
		// Pass the values to the API call
		const data = await registerAPI(internalState.email,internalState.username, internalState.password, internalState.passwordRepeat)
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
	<div className="container flex-column input-container w-50 p-3 border border_style">
	<div>
		{/* <img src={Logo} alt="Logo-image" className="rounded mx-auto d-block " /> */}
	</div>

	<h1 className="title">Register</h1>
	<form onSubmit={handleInputs}>
		<label htmlFor="email" className="control-label text">
			<strong>Email:</strong>
		</label>
		<input
			type="email"
			value={initState.email}
			className="form-control"
			id="email"
			placeholder="name@example.com"
			onChange={onEmailChange}
			required={true} 
			minLength={5}
			autoComplete="on"
		/>
		<br />
		<label htmlFor="Username" className="control-label text">
			<strong>Username:</strong>
		</label>
		<input
			type="text"
			value={initState.username}
			className="form-control"
			id="Username"
			placeholder="John Smith"
			onChange={onNameChange}
			autoComplete="on"
		/>
		<br />
		<label htmlFor="password" className="control-label text">
			<strong>Password:</strong>
		</label>
		<input
			type="password"
			value={initState.password}
			className="form-control"
			id="password"
			placeholder="Password"
			onChange={handlePassword}
			required={true} 
			minLength={6}
			autoComplete="on"
		/>
		<br />
		<label htmlFor="confirmPassword" className="control-label text">
			<strong>Confirm Password:</strong>
		</label>
		<input
			type="password"
			value={initState.passwordRepeat}
			className="form-control"
			id="confirmPassword"
			placeholder="Confirm Password"
			onChange={handleConfirmPassword}
			required={true} 
			minLength={6}
			autoComplete="on"
		/>
		<br />
		<div className="d-grid gap-2">
			<button>Submit</button>
		</div>
	</form>
	<Link to="/login" className="text flex-wrap link-light">
		Already a member?
	</Link>
</div>
  )
}
export default Register

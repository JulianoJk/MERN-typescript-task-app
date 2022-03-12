import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {IAuthCredentials} from "../../../Model/models"

// Default state fot the user context
const defaultUserState: IAuthCredentials= {
  email: "",
  password: ""
}

const Login:React.FC = ()=> {
  const navigate = useNavigate();
	const [user, setUser] = useState<IAuthCredentials>(defaultUserState);

  // Email handler
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({email: e.currentTarget.value});
	};
  // Password handler
	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({password: e.currentTarget.value});
	};
	const handleInputs = () =>{
    // Handle input and call api
  }

  return (
    <div>
      <h1>Login</h1>
      {/* TODO: add onSubmit={handleInputs} */}
      <form>
				<label htmlFor="email" className="control-label text">
					<strong>Email:</strong>
				</label>
				<input
					type="email"
          // TODO: after submit, it changes to a random string. FIX
					value={user.email}
					className="form-control"
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
					value={user.password}
					className="form-control"
					id="password"
					onChange={onPasswordChange}
					placeholder="Password"
					autoComplete="on"
				/>
				<br />
				<div className="d-grid gap-2">
					<button onClick={handleInputs}>display user</button>
				</div>
			</form>
    </div>
  )
}
export default Login;
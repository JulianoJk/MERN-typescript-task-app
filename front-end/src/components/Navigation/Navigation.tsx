import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Header/Menu/Menu';
import { useNavigate } from 'react-router-dom';
import { useTaskDispatch, useTaskState } from '../../context/TaskContext';

const Navigation: React.FC = () => {
	const taskDispatch = useTaskDispatch();
	const taskState = useTaskState();
	const isLoggedIn = taskState.isLoggedIn;
	const navigate = useNavigate();

	const logOut = () => {
		taskDispatch({ type: 'RESET_STATE' });
		navigate('/');
	};

	if (isLoggedIn) {
		return (
			<header>
				<nav>
					<div className="d-flex flex-row-reverse bd-highlight">
						<div className="btn-group flex-wrap" role="group">
							<Link to="/home" className="btn btn-outline-primary text-light text-opacity-75">
								Home
							</Link>
							<Link to="/profile" className="btn btn-outline-primary text-white text-opacity-75">
								Profile
							</Link>
						</div>
						<button onClick={logOut} >Logout</button>
					</div>
				</nav>
			</header>
		);
	} else {
		return (
			<header>
				<nav>
					<div className="d-flex flex-row-reverse bd-highlight">
						<Menu />
					</div>
				</nav>
			</header>
		);
	}
};

export default Navigation;
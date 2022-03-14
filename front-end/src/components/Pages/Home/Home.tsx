import React from 'react';
import TaskForm from '../../Tasks/TaskForm/TaskForm';
import { useTaskState } from '../../../context/TaskContext';

const Home:React.FC = () => {
	const taskState = useTaskState();
	const isLoggedIn = taskState.isLoggedIn;

	if (isLoggedIn) {
		return (
			<div>
				<TaskForm />
			</div>
		);
	} else {
		return (
			<div>
				<h1> No Account found! Log-In/Register to proceed!</h1>
			</div>
		);
	}
};

export default Home;
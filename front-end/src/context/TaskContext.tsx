import React, { useContext, useEffect, useReducer } from 'react'
import {IUserContext} from '../Model/models'

//interface for the default state
interface StateInterface{
    user:IUserContext
    isLoggedIn: boolean
}

// Default state fot the user context
const defaultState: StateInterface= {
    user:{
        username: undefined,
        token: undefined,
        id: undefined
    },
    isLoggedIn: false
}

export type Action={
  type: "SET_USER";
  user: IUserContext
}|{
  type: "SET_IS_LOGGED_IN";
  isLoggedIn: boolean
}|{
  type: "RESET_STATE"
}

// Type for the dispatch reducer
export type dispatchContext =(action: Action)=> void

const appReducer = (state: StateInterface, action: Action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.user};
		case 'SET_IS_LOGGED_IN':
			return { ...state, isLoggedIn: action.isLoggedIn };
      case 'RESET_STATE':
        return { ...defaultState };
      default:
        return { ...state };
	}
};

const TaskStateContext = React.createContext<StateInterface | undefined>(undefined);
TaskStateContext.displayName = 'TaskStateContext';
const TaskDispatchContext = React.createContext<dispatchContext | undefined>(undefined);



// TODO!: Remove any from props: any
const TaskContextProvider = (props: any) => {
	const [state, dispatch] = useReducer(appReducer, defaultState);

	useEffect(()=>{
	// TODO:Delete
	console.log(state);
	},[state])
	
	return (
		<TaskStateContext.Provider value={state}>
			<TaskDispatchContext.Provider value={dispatch}>{props.children}</TaskDispatchContext.Provider>
		</TaskStateContext.Provider>
	);
};

// Pass the state of the user 
const useTaskState = () => {
	const context = useContext(TaskStateContext);
	if (context === undefined) {
		throw new Error('useTaskState must be used within TaskContextProvider');
	}
	return context;
};

const useTaskDispatch = () => {
	const context = useContext(TaskDispatchContext);
	if (context === undefined) {
		throw new Error('useTaskDispatch must be used within TaskContextProvider');
	}
	return context;
};

export { TaskContextProvider, useTaskState, useTaskDispatch };
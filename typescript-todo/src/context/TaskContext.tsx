import React, { useState } from 'react'
import {IUserContext} from '../Model/models'

//interface for the default state
interface StateInterface{
    user:IUserContext
    isLoggedIn: boolean
}

// Default state fot the user context
const defaultState: StateInterface= {
    user:{
        username: "",
        token: "",
        id: ""
    },
    isLoggedIn: false
}


const TaskContext: React.FC = () => {
  // Specify the type of the useState
  const [count, setCount] = useState<StateInterface>(defaultState) 

  const start = () =>{
    setCount({user: {username: "Name1", token: "2312312", id: "123123"}, isLoggedIn: true})
    console.log(count);
    
  }
  return (
    <button onClick={start}>Change context state</button>
  )
}
export default TaskContext;
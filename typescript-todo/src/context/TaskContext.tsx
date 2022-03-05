import React from 'react'

//interface for the default state
interface UserInterface{
    user:{
        username: string,
        token: string,
        id: string,
    }
    isLoggedIn: boolean
}

// Default state fot the user context
const defaultState: UserInterface= {
    user:{
        username: "",
        token: "",
        id: ""
    },
    isLoggedIn: false
}

const TaskContext: React.FC = () => {
  return (
    <div>TaskContext</div>
  )
}
export default TaskContext;
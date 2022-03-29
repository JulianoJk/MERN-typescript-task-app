import { useEffect, useState } from "react";
import { useTaskDispatch, useTaskState, useUserState } from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import DisplayTasks from "../DisplayTasks/DisplayTasks";


const TaskForm: React.FC = () => {
  const { user } = useUserState();
  const todos = useTaskState()
  const setTodo = useTaskDispatch()



  const [input, setInput] = useState<string>("");

  // Save task's information, containing taskName,
  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  // set the task's values to return tp server and save tasks
  const handlerTask = (): void => {
    if (input.trim() !== "") {
      // Set the tasks with the user's id and the task status
      const b: any = ({
        taskName: input,
        user_id: user.id,
        completed: false,
      });
      setTodo({type: "ADD_TASK", tasks: b})
      console.warn(todos);


    } else {
      console.warn("Empty string!");
    }
  };

  // Return tasks to server
  // const submitTasks = async (): Promise<void> => {
  //   await fetch("http://localhost:3001/tasks/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": `${user.token}`,
  //     },
  //     body: JSON.stringify({
  //       // return to the server the tasks object
  //       ...todos,
  //     }),
  //   });
  //   console.log("Tasks sended!");
  // };

  // get the tasks from the server and push to array
  const getTasks = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3001/tasks/get/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${user.token}`,
          },
        }
      );
      const data: ITasks[] = await response.json();
      // Push the tasks returned from server to the todoArray
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTasks = async (taskId: any): Promise<void> => {
    try {
      await fetch(`http://localhost:3001/tasks/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${user.token}`,
        },
        body: JSON.stringify({
          _id: taskId,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Display tasks every time the taskInfo is change
  useEffect(() => {
    getTasks();    
  }, []);

  // prevent form's default action, then set the input state to empty(after user submits, clear the input field)
  const handleFormSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    // submitTasks();
    setInput("");
  };

  return (
    <div className="container flex-column input-container w-50 p-3 border">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="form-control"
          name="task"
          value={input}
          onChange={handleChange}
          placeholder="Add tasks"
          autoComplete="on"
        />

        <div className="d-grid gap-2">
          <Button onClick={handlerTask} text={"Add task"} />
        </div>
      </form>
      <DisplayTasks deleteTasks={deleteTasks} />
    </div>
  );
};

export default TaskForm;

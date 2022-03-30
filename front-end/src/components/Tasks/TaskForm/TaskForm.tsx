import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { submitTasks } from "../../../API/Api";
import {
  useTaskDispatch,
  useTaskState,
  useUserState,
} from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import DisplayTasks from "../DisplayTasks/DisplayTasks";

const TaskForm: React.FC = () => {
  const { user } = useUserState();
  // Get the tasks from the context
  const todos: ITasks[] = useTaskState();
  // Dispatch to set the tasks in the context
  const setTodoDispatch = useTaskDispatch();
  const [input, setInput] = useState<string>("");

  // Save task's information, containing taskName,
  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  // Create a unique ID for the task
  const unique_id = uuid();

  // set the task's values to return tp server and save tasks
  const handlerTask = (): void => {
    if (input.trim() !== "") {
      // Set the tasks with the user's id and the task status
      const newTask: ITasks = {
        taskName: input,
        user_id: user.id,
        completed: false,
        taskID: unique_id,
      };
      setTodoDispatch({ type: "ADD_TASK", tasks: newTask });
    } else {
      console.warn("Empty string!");
    }
  };

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
      const data: any = await response.json();
      // Push the tasks returned from server to the todoArray
    } catch (error) {
      console.error(error);
    }
  };


  // Display tasks every time the taskInfo is change
  useEffect(() => {
    getTasks();    
  }, [todos]);

  // prevent form's default action, then set the input state to empty(after user submits, clear the input field)
  const handleFormSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    submitTasks(user, todos)
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
      <DisplayTasks />
    </div>
  );
};

export default TaskForm;

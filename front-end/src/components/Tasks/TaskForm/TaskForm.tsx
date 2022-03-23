import { useEffect, useState } from "react";
import { useTaskState } from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import DisplayTasks from "../DisplayTasks/DisplayTasks";

const TaskForm: React.FC = () => {
  const { user } = useTaskState();
  // TODO!: setTodoArray is called 2 times, fix it!
  // TODO!: Change the setTodoArray to set when we submit a task not to callAPI everytime for that

  // Array with all the tasks, to display and save them locally
  const [todoArray, setTodoArray] = useState<ITasks[]>([]);
  // Save user's tasks with the todo, user_id, and the status of the todo to send it to the server
  const [todo, setTodo] = useState<ITasks>({
    taskName: undefined,
    user_id: undefined,
    completed: undefined,
  });

  const [input, setInput] = useState<string>("");

  // Save task's information, containing taskName,
  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  // prevent form's default action, then set the input state to empty(after user submits, clear the input field)
  const handleSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    setInput("");
  };

  // set the task's values to return tp server and save tasks
  const handlerTask = (): void => {
    if (input.trim() !== "") {
      // Set the tasks with the user's id and the task status
      setTodo({
        ...todo,
        taskName: input,
        user_id: user.id,
        completed: false,
      });
      setTodoArray([todo]);
      console.log("Tasks sended!");
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

      const data: ITasks[] = await response.json();
      // Push the tasks returned from server to the todoArray
      setTodoArray(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Return tasks to server
  const submitTasks = async () => {
    if (input.trim() !== "") {
      await fetch("http://localhost:3001/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${user.token}`,
        },
        body: JSON.stringify({
          // return to the server the tasks object
          ...todo,
        }),
      });
    }
  };

  // Display tasks every time the taskInfo is change
  useEffect(() => {
    submitTasks();
    getTasks();
    console.warn(todoArray);
  }, [todo]);
  useEffect(() => {
    console.warn("SETTODO");
  }, [todoArray]);

  const deleteTasks = async (taskId: string): Promise<void> => {
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

  return (
    <div className="container flex-column input-container w-50 p-3 border">
      <form onSubmit={handleSubmit}>
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
      <DisplayTasks todoArray={todoArray} deleteTasks={deleteTasks} />
    </div>
  );
};

export default TaskForm;

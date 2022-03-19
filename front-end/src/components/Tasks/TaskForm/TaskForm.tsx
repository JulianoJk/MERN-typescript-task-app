import { useEffect, useState } from "react";
import { useTaskState } from "../../../context/TaskContext";
import { Button } from "../../button/Button.component";
import DisplayTasks from "../DisplayTasks/DisplayTasks";

const TaskForm: React.FC = () => {
  const { user } = useTaskState();
  const [tasks, setTasks] = useState<any>([]);
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    setInput("");
  };
  interface ITasks {
    taskName: string | undefined;
    user_id: string | undefined;
    completed: boolean;
  }
  // Save task's information, containing taskName,
  const [taskInfo, setTaskInfo] = useState<ITasks>({
    taskName: undefined,
    user_id: undefined,
    completed: false,
  });

  const sendTasks = async (): Promise<void> => {
    if (input.trim() !== "") {
      await fetch("http://localhost:3001/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${user.token}`,
        },
        body: JSON.stringify({
          taskName: input,
          user_id: user.id,
          completed: false,
        }),
      });
      console.log("Tasks sended!");
      // Display tasks after every submit
      //getTasks();
      // Set the task description to the taskInfo state
      setTaskInfo({
        taskName: input,
        user_id: user.id,
        completed: false,
      });
      setTasks(taskInfo);
    } else {
      console.warn("Empty string!");
    }
  };

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

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Display tasks every time the taskInfo is change
  useEffect(() => {
    getTasks();
    console.log(tasks);
    console.log(taskInfo);
  }, [taskInfo]);

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
      // Call the function to get the tasks after deletion
      // TODO: remove
      //getTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const updateTasks = async (
    taskId: string,
    completedStatus: boolean
  ): Promise<void> => {
    // Update the completed state when the checkbox is pressed
    let isCompleted: boolean = !completedStatus;
    try {
      await fetch(`http://localhost:3001/tasks/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${user.token}`,
        },
        body: JSON.stringify({
          _id: taskId,
          completed: isCompleted,
        }),
      });
      // Call the function to get the tasks after update
      ////getTasks();
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
          <Button onClick={sendTasks} text={"Add task"} />
        </div>
      </form>
      <DisplayTasks
        tasks={tasks}
        deleteTasks={deleteTasks}
        updateTasks={updateTasks}
      />
    </div>
  );
};

export default TaskForm;

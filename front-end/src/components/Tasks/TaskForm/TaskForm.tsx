import { useState } from "react";
import { submitTasks } from "../../../API/Api";
import { useTaskDispatch, useTaskState } from "../../../context/TaskContext";
import { useUserState } from "../../../context/UserContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import DisplayTasks from "../DisplayTasks/DisplayTasks";
import style from "./TaskForm.module.css";

const TaskForm: React.FC = () => {
  // Dispatch reducer for the task

  const { user } = useUserState();

  const setTodoDispatch = useTaskDispatch();

  const taskState = useTaskState();

  const [input, setInput] = useState<string>("");

  // Save task's information, containing taskName,
  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  // set the task's values to return tp server and save tasks

  // Handle submit then send tasks to server
  const handleFormSubmit = async (
    e: React.BaseSyntheticEvent
  ): Promise<void> => {
    e.preventDefault();
    if (input.trim() !== "") {
      const data: string | ITasks | undefined = await submitTasks(user, input);
      if (typeof data === "string" || data instanceof String) {
        return;
      } else if (data) {
        let taskResponse: ITasks = {
          taskName: data["taskName"],
          _id: data["_id"],
          completed: data["completed"],
        };
        setTodoDispatch({ type: "ADD_TASK", payload: taskResponse });
      }

      setInput("");
    }
  };

  return (
    <div
      className={`container flex-column input-container border ${style.border_style}`}
    >
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
          <Button text={"Add task"} className={"btn-block"} />
        </div>
      </form>
      <DisplayTasks />
    </div>
  );
};

export default TaskForm;

import { useState } from "react";
import { submitTasks } from "../../../API/Api";
import {
  useTaskDispatch,
  useTaskState,
  useUserState,
} from "../../../context/TaskContext";
import { Button } from "../../button/Button.component";
import DisplayTasks from "../DisplayTasks/DisplayTasks";
import style from "./TaskForm.module.css";

const TaskForm: React.FC = () => {
  // Dispatch reducer for the task
  const setTodoDispatch = useTaskDispatch();

  const { user } = useUserState();

  const taskState = useTaskState();

  const [input, setInput] = useState<string>("");

  // Save task's information, containing taskName,
  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  // set the task's values to return tp server and save tasks
  const handlerTask = (): void => {
    if (input.trim() !== "") {
      setTodoDispatch({ type: "ADD_TASK", payload: { taskName: input } });
    }
  };

  // Handle submit then send tasks to server
  const handleFormSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (input.trim() !== "") {
      submitTasks(user, taskState);

      console.log(taskState);
    }
    setInput("");
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
          <Button onClick={handlerTask} text={"Add task"} />
        </div>
      </form>
      <DisplayTasks />
    </div>
  );
};

export default TaskForm;

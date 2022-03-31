import { useEffect } from "react";
import { submitTasks } from "../../../API/Api";
import {
  useTaskDispatch,
  useTaskState,
  useUserState,
} from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import styles from "./DisplayTasks.module.css";

const DisplayTasks: React.FC = () => {
  const taskState = useTaskState();
  const taskDispatch = useTaskDispatch();
  const { user } = useUserState();


  // Delete the task
  const handleDelete = (taskID: string) => {
    taskDispatch({
      type: "DELETE_TASK",
      payload: { taskID: taskID },
    });
  };

  const handleToggle = (taskID: string) => {
    taskDispatch({
      type: "UPDATE_TASK",
      payload: { taskID: taskID },
    });
  };

  return (
    <div>
      {taskState
        .map((todo: ITasks, index: number) => (
          <div
            key={index}
            className={`container flex-column ${styles.task_container}`}
          >
            {/* Change complete status of a task */}
            <input type="checkbox" name="checkbox" id={todo.taskID} />
            <label htmlFor={todo.taskID} className={`${styles.task}`}>
              {todo.taskName}
            </label>
            {/* Delete a task */}
            <Button text={"Delete"} onClick={() => handleDelete(todo.taskID)} />
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default DisplayTasks;

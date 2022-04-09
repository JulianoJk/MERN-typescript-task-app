import { deleteTasks, updateTasks } from "../../../API/Api";
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

  // Delete the task from context and server
  const handleDelete = (taskID: string) => {
    deleteTasks(user, taskID);
    taskDispatch({
      type: "DELETE_TASK",
      payload: { taskID: taskID },
    });
  };

  const handleToggle = (taskID: string, completed: boolean) => {
    // pass user, taskID and the opposite of the
    updateTasks(user, taskID, completed);
    // Call the update task dispatch and pass the taskID to the context reducer
    taskDispatch({
      type: "UPDATE_TASK",
      payload: { taskID: taskID },
    });
  };

  // Return classes based on whether item is checked
  const checked = (taskCompleted: boolean) => {
    return taskCompleted ? `${styles.checked_task}` : `${styles.default_task}`;
  };

  return (
    <div>
      {taskState
        .map((todo: ITasks, index: number) => (
          <div key={index} className={`${styles.task_container}`}>
            {/* Change complete status of a task. If task is completed, keep checked on */}
            <input
              type="checkbox"
              name="checkbox"
              defaultChecked={todo.completed}
              id={todo.taskID}
              // Pass the opposite status of the task
              onClick={() => handleToggle(todo.taskID, !todo.completed)}
            />
            <label htmlFor={todo.taskID} className={checked(todo.completed)}>
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

import { useTaskDispatch, useTaskState, useUserState } from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import styles from "./DisplayTasks.module.css";

const DisplayTasks: React.FC = () => {
  const todos: ITasks[] = useTaskState();
  const { user } = useUserState();
  const todoDispatch = useTaskDispatch();


  return (
    <div>
      {todos
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
            <Button
              text={"Delete"}
              onClick={() => {
                // Delete the task 
                todoDispatch({type: "DELETE_TASK", taskID: todo.taskID});
              }}
            />
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default DisplayTasks;

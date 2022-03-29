import { useTaskState, useUserState } from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import styles from "./DisplayTasks.module.css";

interface IDisplayTasks {
  deleteTasks(taskId: string): Promise<void>;
}
const DisplayTasks: React.FC<IDisplayTasks> = (props: IDisplayTasks) => {
  const todos = useTaskState();
  const { user } = useUserState();

  
  return (
    <div>
      {todos
        .map((todo: any, index: any) => (
          <div
            key={index}
            className={`container flex-column ${styles.task_container}`}
          >
            {/* Change complete status of a task */}
            <input type="checkbox" name="checkbox" id={todo._id} />
            <label htmlFor={todo._id} className={`${styles.task}`}>
              {todo.taskName}
            </label>
            {/* Delete a task */}
            <Button
              text={"Delete"}
              onClick={() => {
                props.deleteTasks(todo._id);
              }}
            />
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default DisplayTasks;

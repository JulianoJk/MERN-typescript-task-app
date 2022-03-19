import { useEffect } from "react";
import { ITodo } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import styles from "./DisplayTasks.module.css";

interface IDisplayTasks {
  tasks: any;
  deleteTasks(taskId: string): void;
  updateTasks(taskId: string, completedStatus: boolean): void;
}

const DisplayTasks: React.FC<IDisplayTasks> = (props: IDisplayTasks) => {
  // useEffect(() => {
  //   console.log(props.tasks.completed);
  // }, [props.tasks.completed]);
  return (
    <div>
      {props.tasks
        .map((todo: ITodo, index: number) => (
          <div
            key={index}
            className={`container flex-column ${styles.task_container}`}
          >
            {/* Check for completion */}
            <input
              type="checkbox"
              name="checkbox"
              id={todo._id}
              onClick={() => {
                props.updateTasks(`${todo._id}`, todo.completed);
              }}
            />
            <label htmlFor={todo._id} className={`${styles.task}`}>
              {todo.name}
            </label>

            {/* Delete task button */}
            <Button
              text={"Delete"}
              onClick={() => {
                props.deleteTasks(`${todo._id}`);
              }}
            />
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default DisplayTasks;

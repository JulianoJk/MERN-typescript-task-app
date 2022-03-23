import { useEffect } from "react";
import { useTaskState } from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import styles from "./DisplayTasks.module.css";

interface IDisplayTasks {
  tasks: any;
  deleteTasks: (taskId: string) => Promise<void>;
}

const DisplayTasks: React.FC<IDisplayTasks> = (props: IDisplayTasks) => {
  const { user } = useTaskState();

  const updateTasks = async (
    taskId: string,
    completedStatus: boolean
  ): Promise<void> => {
    // Update the completed state when the checkbox is pressed
    let isCompleted = !completedStatus;
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {props.tasks
        .map((todo: any, index: number) => (
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
                updateTasks(`${todo._id}`, todo.completed);
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

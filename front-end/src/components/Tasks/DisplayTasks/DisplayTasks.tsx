import { useTaskState } from "../../../context/TaskContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import styles from "./DisplayTasks.module.css";

interface IDisplayTasks {
  todoArray: ITasks[];
  deleteTasks: (taskId: string) => Promise<void>;
}
interface Iindex {
  [index: number]: number;
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
      {props.todoArray
        .map((todo: any, index: any) => (
          <div
            key={index}
            className={`container flex-column ${styles.task_container}`}
          >
            <label htmlFor={todo._id} className={`${styles.task}`}>
              {todo.taskName}
            </label>
          </div>
        ))
        .reverse()}

    </div>
  );
};

export default DisplayTasks;

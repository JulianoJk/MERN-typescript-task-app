import { useState } from "react";
import { deleteTasks, updateTasks } from "../../../API/Api";
import { useTaskDispatch, useTaskState } from "../../../context/TaskContext";
import { useUserState } from "../../../context/UserContext";
import { ITasks } from "../../../Model/models";
import { Button } from "../../button/Button";
import TaskModal from "../TaskModal/TaskModal";
import styles from "./DisplayTasks.module.css";

const DisplayTasks: React.FC = () => {
  const taskState = useTaskState();
  const taskDispatch = useTaskDispatch();
  const { user } = useUserState();
  // state for task modal
  const [modalOpen, setModalOpen] = useState(false);

  const [editedTodo, setEditedTodo] = useState<ITasks | undefined>();

  // Delete the task from context and server
  const handleDelete = (taskID: string | undefined) => {
    deleteTasks(user, taskID);
    taskDispatch({
      type: "DELETE_TASK",
      // delete task with its id
      payload: { taskID: taskID },
    });
  };

  const handleUpdate = (
    taskID: string | undefined,
    completed: boolean | undefined
  ) => {
    // pass user, taskID and the opposite of the
    updateTasks(user, taskID, completed);
    // Call the update task dispatch and pass the taskID to the context reducer
    taskDispatch({
      type: "UPDATE_TASK",
      payload: { taskID: taskID },
    });
  };

  // Return classes based on whether item is checked
  const checked = (taskCompleted: boolean | undefined) => {
    return taskCompleted ? `${styles.checked_task}` : `${styles.default_task}`;
  };

  return (
    <div>
      {/* Check if taskName is undefined */}
      {taskState
        .filter((v) => v.taskName !== undefined)
        .map((todo: ITasks, index: number) => (
          <div key={index} className={`${styles.task_container} `}>
            {/* Change complete status of a task. If task is completed, keep checked on */}
            <input
              type="checkbox"
              name="checkbox"
              defaultChecked={todo.completed}
              id={todo.taskID}
              // Pass the opposite status of the task
              onClick={() => handleUpdate(todo.taskID, !todo.completed)}
            />
            <label htmlFor={todo.taskID} className={checked(todo.completed)}>
              {todo.taskName}
            </label>
            {/* Edit task */}
            <button
              type="button"
              className={`btn btn-primary ${styles.btn}`}
              data-toggle="modal"
              data-target="#editTasks"
              onClick={() => {
                setModalOpen(true);
                setEditedTodo(todo);
              }}
            >
              Edit
            </button>
            {/* Delete a task */}
            <Button
              text={"Delete"}
              onClick={() => handleDelete(todo.taskID)}
              className={`btn btn-danger ${styles.btn}`}
            />
          </div>
        ))
        .reverse()}
      {modalOpen && (
        <TaskModal editedTodo={editedTodo} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default DisplayTasks;

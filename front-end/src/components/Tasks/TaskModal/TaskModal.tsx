import React, { useState } from "react";
import { editTasks } from "../../../API/Api";
import { useTaskDispatch } from "../../../context/TaskContext";
import { useUserState } from "../../../context/UserContext";
import { ITasks } from "../../../Model/models";
import style from "./TaskModal.module.css";

interface Props {
  editedTodo: ITasks | undefined;
  setModalOpen: (val: React.SetStateAction<boolean>) => void;
}
const TaskModal: React.FC<Props> = ({ editedTodo, setModalOpen }) => {
  const { user } = useUserState();

  const [input, setInput] = useState<string>("");

  const editTaskDispatch = useTaskDispatch();

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  const handleEdit = async (
    e: React.BaseSyntheticEvent
  ): Promise<null | undefined> => {
    e.preventDefault();
    setModalOpen(false);
    if (
      input !== undefined &&
      input.trim() !== "" &&
      editedTodo?._id !== undefined
    ) {
      // pass user, taskID and the opposite of the
      const data = await editTasks(user, editedTodo._id, input);
      if (data === "changed successfully!") {
        // Call the update task dispatch and pass the taskID to the context reducer
        editTaskDispatch({
          type: "EDIT_TASK",
          payload: { _id: editedTodo._id, taskName: input },
        });
      } else {
        return null;
      }
    }

    setInput("");
  };
  return (
    <div
      className="modal fade"
      id="editTasks"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="editTasksLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <form onSubmit={handleEdit}>
              <div className="form-group">
                <label
                  htmlFor="message-text"
                  className={`col-form-label ${style.task_title}`}
                >
                  <strong>{editedTodo?.taskName}</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="message-text"
                  name="task"
                  value={input}
                  onChange={handleChange}
                  placeholder="Type new todo name"
                  autoComplete="on"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleEdit}
                  data-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

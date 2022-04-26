import React, { useEffect, useState } from "react";
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

  const fetchEdit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (editedTodo?.taskID !== undefined) {
      // pass user, taskID and the opposite of the
      const apiResponce = await editTasks(user, editedTodo?.taskID, input);
      if (typeof apiResponce === "string" || apiResponce instanceof String) {
        return;
      } else if (apiResponce) {
        editTaskDispatch({
          type: "EDIT_TASK",
          payload: { taskID: editedTodo.taskID, taskName: input },
        });
      }
    }

    setInput("");
    setModalOpen(false);
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
          <div className={`modal-body ${style.modal_background}`}>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <form onSubmit={fetchEdit}>
              <div className="form-group">
                <label
                  htmlFor="message-text"
                  className={`col-form-label ${style.text_font}`}
                >
                  <strong>{editedTodo?.taskName}</strong>
                </label>
                <input
                  type="text"
                  className={`form-control ${style.input_color} ${style.placeholder_font}`}
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
                  onClick={fetchEdit}
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
// BUG: Edits do not work every time, must log-out and login again or refresh page

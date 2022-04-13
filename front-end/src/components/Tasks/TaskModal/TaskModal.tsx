import React, { useState } from "react";
import { editTasks } from "../../../API/Api";
import { useTaskDispatch } from "../../../context/TaskContext";
import { IUserInfoContext } from "../../../Model/models";

interface Props {
  user: IUserInfoContext;
  editedTodoID: string | undefined;
  setModalOpen: (val: React.SetStateAction<boolean>) => void;
}
const TaskModal: React.FC<Props> = ({ user, editedTodoID, setModalOpen }) => {
  const [input, setInput] = useState<string>("");

  const taskDispatch = useTaskDispatch();

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setInput(e.target.value);
  };

  const handleEdit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(input);
    setModalOpen(false);

    if (
      input !== undefined &&
      input.trim() !== "" &&
      editedTodoID !== undefined
    ) {
      // pass user, taskID and the opposite of the
      editTasks(user, editedTodoID, input);
      console.log(user, input, editedTodoID);
    }
    // Call the update task dispatch and pass the taskID to the context reducer
    // taskDispatch({
    //   type: "EDIT_TASK",
    //   payload: { taskID: editedTodoID, taskName: input },
    // });
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
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleEdit}>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  New task name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="message-text"
                  name="task"
                  value={input}
                  onChange={handleChange}
                  placeholder="Add tasks"
                  autoComplete="on"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                  data-dismiss="modal"
                >
                  Send message
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

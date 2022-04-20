const router = require("express").Router();
const auth = require("../middleware/auth");
const Task = require("../models/task.model");

// send the task which user_id corresponds to the user's id
router.get("/get/:user_id", auth, async (req, res) => {
  try {
    // Get the user's id
    const { user_id } = req.params;
    // find the task by the user+id extracted from the params
    const task = await Task.find({ user_id: user_id });
    res.status(202).json(task);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
});

router.post("/add", auth, async (req, res) => {
  let task = req.body.todos;
  let user = req.body.user;

  try {
    let newTask = new Task({
      taskName: task["taskName"],
      user_id: user["id"],
      completed: task["completed"],
    });
    let saved = await newTask.save();
    res.json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const id = req.body.taskID;

    Task.deleteOne({ taskID: id }, function (err) {
      if (err) {
        return handleError(err);
      } else if (!id) {
        return res.status(404).json({ message: "No Task id detected." });
      } else {
        return res.status(202).json("Deleted!");
      }
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.put("/update", auth, async (req, res) => {
  try {
    const { taskID, completed } = req.body;
    if (!taskID)
      return res.status(404).json({ message: "No Task id detected." });

    await Task.findOneAndUpdate({ taskID: taskID }, { completed: completed });
    res.status(201).json("Completed!");
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});
router.put("/edit", auth, async (req, res) => {
  try {
    const { taskID, editTodo } = req.body;
    if (!taskID)
      return res.status(404).json({ message: "No Task id detected." });

    await Task.findOneAndUpdate({ taskID }, { taskName: editTodo });
    res.status(201).json("Completed!");
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;

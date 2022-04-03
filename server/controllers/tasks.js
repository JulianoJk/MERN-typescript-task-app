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
    res.json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/add", auth, async (req, res) => {
  let task = req.body.todos;
  let user = req.body.user;

  //Check for duplicate taskID coming from the API
  let idToObj = {};
  task.forEach((o) => (idToObj[o.taskID] = o));
  let uniqueArray = Object.values(idToObj);
  // Check and save each task
  for (let i = 0; i < uniqueArray.length; i++) {
    // Check for existing tasks in DB(check by the taskID)
    Task.exists({ taskID: uniqueArray[i]["taskID"] }, function (err, exists) {
      if (err) {
        return res.status(500).json({ err: err });
        // if exists is null (meaning there is no match), save tasks and the uniqueArray has at least a task
      } else if (exists === null && uniqueArray.length >= 1) {
        let newTask = new Task({
          taskName: uniqueArray[i]["taskName"],
          taskID: uniqueArray[i]["taskID"],
          user_id: user["id"],
          completed: uniqueArray[i]["completed"],
        });
        newTask.save();
      }
    });
  }
  res.json("Completed");
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ message: "No Task id detected." });

    const deleted = await Task.findByIdAndDelete(_id);

    res.json(deleted);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.put("/update", auth, async (req, res) => {
  try {
    console.log(req.body);
    const { _id, completed } = req.body;
    if (!_id) return res.status(400).json({ message: "No Task id detected." });

    const updated = await Task.updateOne(
      { _id: _id },
      { completed: completed }
    );
    res.json(updated);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;

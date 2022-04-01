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
  let task = req.body.todos
  let user = req.body.user

  // Array to save all the tasks extracted from the API
  let saved = [];
  for (let i = 0; i < task.length; i++) {
    let newTask = new Task({
      taskName: task[i]["taskName"],
      taskID: task[i]["taskID"],
      user_id: user["id"],
      completed: task[i]["completed"],
    })
    saved.push(await newTask.save())
  }

  res.json(saved)


})


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
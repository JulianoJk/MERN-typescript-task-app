const router = require("express").Router();
const auth = require("../middleware/auth");
const Task = require("../models/task.model");

// send the task which user_id corresponds to the user's id
router.get("/get/:user_id", auth, async (req, res) => {
  try {
    // Get the user's id
    const taskId = req.params.user_id;

    // find the task with the same user id
    const task = await Task.find({ user_id: taskId });
    res.json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    // From the request body, save the document array and assign a new task from the values the object contains
    let tasks = req.body.todos
    // save multiple documents to the collection referenced by Task Model    
    const saved = await Task.collection.insertMany(tasks)
    res.json(saved);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
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

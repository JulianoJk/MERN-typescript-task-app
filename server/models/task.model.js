
const mongoose = require("mongoose")

// define Schema
const taskModel = new mongoose.Schema({
    taskName: { type: String, required: true },
    completed: { type: Boolean, required: true },
    taskID: { type: String, required: true },
    user_id: { type: String, required: true },

})
// compile schema to model and export it 
module.exports = Task = mongoose.model("tasks", taskModel)
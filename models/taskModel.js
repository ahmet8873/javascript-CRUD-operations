const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);

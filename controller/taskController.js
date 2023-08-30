const taskModel = require("../models/taskModel");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { taskText } = req.body;
  try {
    const newTask = new taskModel({ taskText });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

// Update an existing task by ID
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { taskText } = req.body;
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { taskText },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await taskModel.findByIdAndRemove(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
};

// Delete all tasks
const deleteAllTasks = async (req, res) => {
  try {
    await taskModel.deleteMany({}); // Passing an empty object as the condition will match all documents
    res.json({ message: "All tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting tasks" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};

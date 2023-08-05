const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} = require("../controller/taskController");

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.delete("/tasks", deleteAllTasks);

module.exports = router;

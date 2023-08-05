const appDiv = document.getElementById("app");
const taskTextInput = document.getElementById("taskText");
const deleteAllTasksButton = document.getElementById("deleteAllTasksButton");
const addTaskButton = document.getElementById("addTaskButton");

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// -------------------------------------

const fetchTasks = async () => {
  const tasks = await fetchData("http://localhost:5000/api/tasks");
  if (tasks) {
    // clear old task list
    const taskElements = document.querySelectorAll(".task");
    taskElements.forEach((taskElement) => {
      appDiv.removeChild(taskElement); // Remove only the task elements
    });
    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      appDiv.insertBefore(taskElement, deleteAllTasksButton);
    });
  }
};

document.addEventListener("DOMContentLoaded", fetchTasks);
// -----------------------------------------------

const addTask = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskText: taskTextInput.value }),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const newTask = await response.json();
    console.log("New task created:", newTask);
    fetchTasks();
    taskTextInput.value = "";
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

addTaskButton.addEventListener("click", addTask);

// ------------------------------------------------
const createTaskElement = (task) => {
  const taskElement = document.createElement("div");
  taskElement.textContent = task.taskText;
  taskElement.classList.add("task");
  // create buttons div for delete and update button
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-div");
  taskElement.appendChild(buttonsDiv);

  // Add Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteTask(task._id);
  });
  buttonsDiv.appendChild(deleteButton);

  // Add Update button
  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", () => {
    const updatedText = prompt("Enter updated task text:", task.taskText);
    if (updatedText !== null) {
      updateTask(task._id, updatedText);
    }
  });
  buttonsDiv.appendChild(updateButton);

  return taskElement;
};
// ---------------------------------------------------

const deleteTask = async (taskId) => {
  try {
    await fetchData(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    console.log("Task deleted successfully");
    fetchTasks(); // Refresh the tasks after deletion
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// ------------------------------------------------------

const updateTask = async (taskId, updatedText) => {
  try {
    const updatedTask = await fetchData(
      `http://localhost:5000/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskText: updatedText }),
      }
    );
    console.log("Task updated successfully:", updatedTask);
    fetchTasks(); // Refresh the tasks after update
  } catch (error) {
    console.error("Error updating task:", error);
  }
};
// -------------------------------------------------

const deleteAllTasks = async () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    try {
      await fetchData("http://localhost:5000/api/tasks", { method: "DELETE" });
      console.log("All tasks deleted successfully");
      fetchTasks(); // Refresh the tasks after deletion
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  }
};

deleteAllTasksButton.addEventListener("click", deleteAllTasks);

// ----------------------------------------

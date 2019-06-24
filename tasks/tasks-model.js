const db = require("../data/dbConfig.js");

module.exports = {
  getTasks,
  addTask,
  getTasksById,
  updateTask,
  deleteTask
};

function getTasks() {
  return db("tasks");
}

function addTask(task) {
  return db("tasks").insert(task);
}

function getTasksById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function updateTask(id, changes) {
  return db("tasks")
    .where({ id })
    .update(changes);
}

function deleteTask(id) {
  return db("tasks")
    .where({ id })
    .del();
}

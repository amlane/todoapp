const router = require("express").Router();

const Tasks = require("./tasks-model.js");

router.post("/", validateTaskContent, (req, res) => {
  Tasks.addTask(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  Tasks.getTasks()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Tasks.getTasksById(id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", validateTaskContent, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Tasks.updateTask(id, changes)
    .then(updatedTask => {
      res.status(201).json(updatedTask);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Tasks.deleteTask(id)
    .then(deletedTask => {
      res.status(200).json({ message: "Task successfully deleted." });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ---------------------- Custom Middleware ---------------------- //

function validateTaskContent(req, res, next) {
  if (!req.body.task) {
    res.status(400).json({ message: "Task field is required." });
  } else {
    next();
  }
}

module.exports = router;

const router = require("express").Router();

const Tasks = require("./tasks-model.js");

router.post("/", (req, res) => {
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

module.exports = router;

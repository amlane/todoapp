const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../middleware/restricted-middleware.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id/tasks", restricted, (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      Users.getTasksByUserId(id)
        .then(tasks => {
          res.status(200).json({ ...user, tasks });
          console.log(user, tasks);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;

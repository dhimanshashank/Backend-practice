var express = require("express");
var router = express.Router();

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];
let nextId = 3;

/* GET all users */
router.get("/", function (req, res) {
  res.json(users);
});

/* GET single user (Fixed Route) */
router.get("/:id", (req, res) => { // Removed /users prefix
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

/* POST create new user */
router.post("/", (req, res) => { // Removed /users prefix
  if (!req.body.name || !req.body.email) {
    return res.status(400).send("Name and email are required");
  }

  const newUser = {
    id: nextId++,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

/* PUT update user (Full Update) */
router.put("/:id", (req, res) => { // Removed /users prefix
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  if (!req.body.name || !req.body.email) {
    return res.status(400).send("Name and email are required");
  }

  user.name = req.body.name;
  user.email = req.body.email;

  res.json(user);
});

/* PATCH update user (Partial Update) */
router.patch("/:id", (req, res) => { // New PATCH Route
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;

  res.json(user);
});

/* DELETE user */
router.delete("/:id", (req, res) => { // Removed /users prefix
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.route("/users").get(async (req, res) => {
  await Users.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => res.json(e.message));
});

module.exports = router;

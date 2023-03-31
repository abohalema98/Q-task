const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/Users");

router.post("/login", async (req, res) => {
    const body = req.body;

    // const { error } = loginValidation(body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message)
    // };


    // checking if the email exists in the DB
    const loginUser = await Users.findAll({ where: { Email: req.body.Email } })

    if (loginUser == false) { return res.status(400).send(`email doen't  exists `) }

    //checking if the password is correct 
    const validPassword = await bcrypt.compare(req.body.Password, loginUser[0].Password)

    if (!validPassword) {
        res.status(400).send(`invalid password`)
    }

    const token = jwt.sign({ Email: loginUser.Email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
    res.header('Authorization', "Bearer" + token).status(200).json({
        token: token,
        expiresIn: 1000,
    })

})


router.post("/register", async (req, res) => {
  const body = req.body;
console.log(body.Email )
  // const { error } = registerValidation(body);
  // if (error) {
  //     return res.status(400).send(error.details[0].message)
  // };

  // checking if the user's email already exists in the DB
  const emailExists = await Users.findAll({ where: { Email: body.Email } });
  const phoneExists = await Users.findAll({
    where: { phoneNumber: body.phoneNumber },
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.Password, salt);

  if (emailExists == false && phoneExists == false) {
    const newUser = {
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      Email: body.Email,
      Password: hashedPassword,
    };

    // Sava In Database
    Users.create(newUser)
      .then((user) => {
        res.json(user);
      })
      .catch((e) => res.json(e.message));
  } else {
    return res.status(400).send(`email or phone already exists `);
  }
});

module.exports = router;

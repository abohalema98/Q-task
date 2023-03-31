require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const Users = require('./models/Users')
const UserRoter = require("./Controllar/userController")

// CORS-enabled
app.use(cors());

// Middleware
app.use(express.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routing
app.use("/api", UserRoter)


// Error Handling
app.use((error, req, res, next) => {
    res.send(error.message + "");
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});

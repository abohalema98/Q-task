require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const Users = require('./models/Users')
const UserControllar = require("./Controllar/userController")
const UserRouter = require("./router/UserRoter")

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
app.use("/api", UserControllar)
app.use("/api", UserRouter)



// Error Handling
app.use((error, req, res, next) => {
    res.send(error.message + "");
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});

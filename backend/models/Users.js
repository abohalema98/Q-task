const { DataTypes } = require("sequelize");
const db = require("../db/db.config");

const Users = db.define("users", {
  userID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
    isAlpha: true

  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
    isAlpha: true
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    notEmpty: true

  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail:true
    }
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

Users.sync()
  .then((result) => {
    console.log(`table is create successfly`);
  })
  .catch((err) => {
    console.log(`Error with create table ${err}`);
  });
module.exports = Users;

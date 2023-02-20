const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register
userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender, age, city } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        gender,
        age,
        city,
        password: hash,
      });
      await user.save();
      res.send({ msg: "user has been registered" });
    });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
    console.log(err);
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send({ msg: "Wrong Credntials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credntials" });
    }
  } catch (err) {
    res.send({ msg: "Something went Wrong", error: err.message });
  }
});

module.exports = { userRouter };

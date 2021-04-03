const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let tokkenArray = [];
const Register = require("../database/schema/user");
const Books = require("../database/schema/books");
module.exports = (app) => {
  app.post("/register", async (req, res) => {
    const user_exist = await Register.findOne({ email: req.body.email });
    if (user_exist) {
      return res.status(201).json({
        status: 201,
        success: true,
        user: true,
        message: "User already registerd with this email",
      });
    } else {
      const user = new Register({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      }).save();

      return res.status(200).json({
        status: 200,
        user: user,
        success: true,
        message: "user is saved in database",
      });
    }
  });

  app.post("/login", (req, res) => {
    Register.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.send({ message: err, status: 500 });
        return;
      }

      if (!user) {
        return res.send({ message: "User Not found.", status: 404 });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.send({
          status: 401,
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = generateToken({ user: user });

      new Books({
        name: "The Jungle book",
        author: "rishav",
        semester: 1,
        count: 50,
      }).save();

      res.status(200).send({
        status: 200,
        user: user,
        accessToken: token,
      });
    });
  });

  app.get("/auth", authenticate, (req, res) => {
    const user = req.user;
    res.status(200).json({ userExist: true, user: user });
  });

  // middleware
  function authenticate(req, res, next) {
    // as we know here wil be sent like  header:{authorization:` Bearer ${Token}`
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.json({ userExist: false, message: "auth failed" });
      req.user = user;
      next();
    });
  }

  app.delete("/logout", (req, res) => {
    const refreshToken = req.body.token;
    tokkenArray = tokkenArray.filter((item) => item !== refreshToken);
    res.sendStatus(204);
  });
  function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "86400s",
    });
  }
};

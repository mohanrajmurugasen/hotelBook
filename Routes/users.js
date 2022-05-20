const express = require("express");
const cors = require("cors");
const router = express.Router();
const userModel = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.use(express.json());
router.use(cors());

process.env.SECRET_KEY = "user";

router.post("/Users", async (req, res) => {
  const users = {
    userName: req.body.userName,
    mobile: req.body.mobile,
    people: req.body.people,
    time: req.body.time,
    table: req.body.table,
  };

  userModel.findOne({ mobile: req.body.mobile }, (err, result) => {
    if (!result) {
      bcrypt.hash(req.body.mobile, 10, async (errs, hash) => {
        users.mobile = hash;

        const newUser = new userModel(users);
        await newUser.save();

        res.json(newUser);
      });
    } else {
      res.json("Number already exists!");
    }
  });
});

router.get("/UsersLogin", (req, res) => {
  const { userName, mobile } = req.body;
  userModel.findOne({ mobile: mobile }, (err, result) => {
    if (result) {
      if (bcrypt.compareSync(userName, result.userName)) {
        let token = jwt.sign(result.userName, process.env.SECRET_KEY);
        let mobile = jwt.sign(result.mobile, process.env.SECRET_KEY);
        res.send({ token, mobile });
      } else {
        res.json("Wrong credential");
      }
    } else {
      res.json("Not registered");
    }
  });
});

router.get("/Users", (req, res) => {
  userModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/UsersById/:id", (req, res) => {
  const id = req.params.id;
  userModel.findById(id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.put("/UpdateUsersById/:id", (req, res) => {
  const id = req.params.id;
  userModel.findById(id, (err, result) => {
    if (!result) {
      res.json("Please register first!");
    } else {
      result.userName = req.body.userName;
      result.mobile = req.body.mobile;
      result.people = req.body.people;
      result.time = req.body.time;
      result.table = req.body.table;

      result
        .save()
        .then((user) => {
          res.json("Updated Successfully");
        })
        .catch((err) => {
          res.status(400).send("Unable to update data please try again!");
        });
    }
  });
});

router.delete("/DeleteUsersById/:id", (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;

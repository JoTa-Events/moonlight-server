const { response } = require("express");
const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Chat = require("../models/Chat.model");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/my-profile", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  User.findById(userId)
    .then((responseUser) => {
      res.json(responseUser);
    })
    .catch((error) => {
      console.log("error getting the user details", error);
      res.status(500).json(error);
    });
});
router.put("/my-profile", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar })
    .then((responseUser) => {
      res.json(responseUser);
    })
    .catch((error) => {
      console.log("error updating the user details", error);
      res.status(500).json(error);
    });
});
router.get("/profile/:username", (req, res, next) => {
  const { username } = req.params;

  let data = {};

  User.findOne({ username: username }, { password: 0, email: 0 })
    .then((responseUser) => {
      if (!responseUser) {
        res.status(401).json({
          message: `Oops! The user "${username}" doesn't seem to exist in our system. Please check the username and try again.`,
        });

        return;
      }

      data = { author: responseUser };

      return Event.find({ author: responseUser._id }, { participants: 0 });
    })
    .then((responseEvent) => {
      //this response does not include the array of participants

      data = { ...data, events: responseEvent };
      res.json(data);
    })
    .catch((error) => {
      console.log(`an error ocurred while getting the data from ${username}`);

      return next(error);
    });
});

module.exports = router;

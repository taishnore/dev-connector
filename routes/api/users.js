const express = require("express");
const router = express.Router();
//might not use gravatar longterm, maybe i'll learn how to upload pictures
//or i can create an email and seed data with gravatar images.
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//line below is for validations. peep docs for better understanding.
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
//bringing in the user model.

//@route   GET api/users
//@desc    Test route
//@access  public
//how to format requests using router.
// router.get("/", (req, res) => {
//   res.send("User route");
// });

//@route   POST api/users
//@desc    Register User
//@access  Public

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    //provides an error object on the front end that will help
    //provide feedback to users.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //Get users gravatar (if there)
      const avatar = gravatar.url({
        s: "200",
        r: "pg",
        d: "mm" //default image if user doesnt have a gravatar.
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //creating salt.
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Encrypt password
      //Return jsonwebtoken (jwt)
      res.send("User Registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }

    // res.send({ res: req.body });
  }
);

module.exports = router;

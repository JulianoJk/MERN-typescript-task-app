const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(407).json({ message: "Mandatory fields are missing" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    //Assign the token to the user
    jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        username: user.username,
        id: user._id,
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordRepeat, username } = req.body;
    // Validations
    if (!email || !password || !passwordRepeat) {
      return res.status(407).json({ message: "Mandatory fields are missing" });
    }
    if (password.length < 5) {
      return res
        .status(407)
        .json({ message: "Password needs at least 5 characters" });
    }
    if (password !== passwordRepeat) {
      return res.status(403).json({ message: "Passwords do not match" });
    }
    // Check if email already exists
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return res.status(409).json({ message: "Email already in use" });
    }

    if (!username) {
      username = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: passwordHashed,
      username: username,
    });

    const userSignup = await newUser.save();
    const payload = {
      user: {
        id: userSignup._id,
      },
    };

    //Assign the token to the user
    const token = jwt.sign(payload, process.env.JWT_KEY);
    res.json({
      token,
      username: userSignup.username,
      id: userSignup._id,
    });
    console.log("done!");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
// Route for the user to delete account
router.delete("/delete_account/:user_id", auth, async (req, res) => {
  try {
    // Get the user's id
    const { user_id } = req.params;
    User.findByIdAndDelete({ _id: user_id }, function (err) {
      if (err) {
        return handleError(err);
      } else if (!id) {
        return res.status(404).json({ message: "No Task id detected." });
      } else {
        return res.status(202).json("Deleted!");
      }
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.put("/change_email", auth, (res, req) => {});
router.put("/change_password", auth, (res, req) => {});
module.exports = router;

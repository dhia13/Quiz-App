const User = require("../Models/User");
const generateToken = require("../middleware/jwt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = new User({
        username,
        password,
      });
      await newUser.save();
      res.status(200).json({
        msg: "Account registered!",
        success: true,
        data: {
          tokens: {
            accessToken: generateToken(
              newUser._id,
              newUser.role,
              process.env.ACCESS_TOKEN_SECRET,
              "30d"
            ),
            refreshToken: generateToken(
              newUser._id,
              newUser.role,
              process.env.REFRESH_TOKEN_SECRET,
              "30d"
            ),
          },
          role: newUser.role,
          username: newUser.username,
          id: newUser._id,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message, success: false });
    }
  },
  login: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const user = await User.findOne({ username });
      if (user) {
        const match = await user.matchPassword(password);
        if (match) {
          res.status(200).json({
            msg: "User Logged in!",
            success: true,
            accessToken: generateToken(
              user._id,
              user.role,
              process.env.ACCESS_TOKEN_SECRET,
              "30d"
            ),
            role: user.role,
            username: user.username,
            id: user._id,
            coins: user.coins,
            solved: user.solved,
            bookmarks: user.bookmarks,
          });
        }
      } else {
        res.status(401).json({ success: false, msg: "wrong credentials" });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.messages });
    }
  },
  checkToken: async (req, res) => {
    try {
      const token = req.body.token;
      const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decodedtoken) {
        res.status(200).json({ success: true, msg: "token Valid" });
      } else {
        res.status(200).json({
          success: false,
          msg: "token expired",
        });
      }
    } catch {
      res.status(401).json({ Msg: "Token Expired reLogin ", success: false });
    }
  },
  getUsers: async (req, res) => {
    try {
      const Users = await User.find().select(["username", "role"]);
      res.status(200).json({ users: Users });
    } catch (error) {
      res.status(401).json({ success: false });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const Users = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "user deleted" });
    } catch (error) {
      res.status(401).json({ success: false });
    }
  },
  makeEditor: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user.role === "admin") {
        await User.findByIdAndUpdate(req.params.id, {
          $set: {
            role: "user",
          },
        });
        res.status(200).json({ msg: "user set to user" });
      }
      if (user.role === "user") {
        await User.findByIdAndUpdate(req.params.id, {
          $set: {
            role: "admin",
          },
        });
        res.status(200).json({ msg: "user set to admin" });
      }
    } catch (error) {
      res.status(401).json({ success: false });
    }
  },
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = userCtrl;

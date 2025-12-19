const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
    picture: {
      type: String,
      default: "",
    },
    coins: {
      type: Number,
      default: 0,
    },
    bookmarks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Quiz",
      default: [],
    },
    solved: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Quiz",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

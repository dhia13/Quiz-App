const mongoose = require("mongoose");
const LevelSchema = mongoose.Schema(
  {
    Title: {
      type: String,
    },
    Emd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Emd",
    },
    Quizs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Quiz",
      default: [],
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Level = mongoose.model("Level", LevelSchema);
module.exports = Level;

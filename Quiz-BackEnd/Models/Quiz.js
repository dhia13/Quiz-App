const mongoose = require("mongoose");
const QuizSchema = mongoose.Schema(
  {
    Question: {
      type: String,
      required: true,
    },
    RightAnswer: {
      type: String,
      required: true,
    },
    FalseAnswers: {
      type: Array,
      required: true,
    },
    Counter: {
      type: Number,
      required: true,
    },
    Review: {
      type: String,
      required: true,
    },
    Picture: {
      type: String,
      Requires: true,
      default: "",
    },
    Level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;

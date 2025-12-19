const mongoose = require("mongoose");
const EmdySchema = mongoose.Schema(
  {
    Title: {
      type: String,
    },
    Faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    Levels: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Level",
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
const Emd = mongoose.model("Emd", EmdySchema);
module.exports = Emd;

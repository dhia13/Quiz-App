const mongoose = require("mongoose");
const FacultySchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Speciality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speciality",
      required: true,
    },
    Emds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Emd",
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
const Faculty = mongoose.model("Faculty", FacultySchema);
module.exports = Faculty;

const mongoose = require("mongoose");

const SpecialitySchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      default: "",
    },
    Faculties: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Faculty",
      default: [],
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Speciality = mongoose.model("Speciality", SpecialitySchema);
module.exports = Speciality;

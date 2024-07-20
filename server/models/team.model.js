import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    joining: {
      type: String,
    },
    dob: {
      type: String,
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    reportingTo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Team", teamSchema);

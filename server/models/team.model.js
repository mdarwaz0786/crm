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
      type: Number,
    },
    username: {
      type: String,
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
      type: String,
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

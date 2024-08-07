import mongoose from "mongoose";

const projectTimingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ProjectTiming", projectTimingSchema);

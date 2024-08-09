import mongoose from "mongoose";

const projectPrioritySchema = new mongoose.Schema(
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

export default mongoose.model("ProjectPriority", projectPrioritySchema);

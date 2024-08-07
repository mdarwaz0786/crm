import mongoose from "mongoose";

const projectTypeSchema = new mongoose.Schema(
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

export default mongoose.model("ProjectType", projectTypeSchema);

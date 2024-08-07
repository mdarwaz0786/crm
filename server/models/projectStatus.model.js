import mongoose from "mongoose";

const projectStatusSchema = new mongoose.Schema(
  {
    status: {
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

export default mongoose.model("ProjectStatus", projectStatusSchema);

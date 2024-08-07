import mongoose from "mongoose";

const projectCategorySchema = new mongoose.Schema(
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

export default mongoose.model("ProjectCategory", projectCategorySchema);

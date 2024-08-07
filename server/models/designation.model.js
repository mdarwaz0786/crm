import mongoose from "mongoose";

const designationSchema = new mongoose.Schema(
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

export default mongoose.model("Designation", designationSchema);

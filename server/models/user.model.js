import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "fullName is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    mobile: {
      type: Number,
      required: [true, "mobile is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);

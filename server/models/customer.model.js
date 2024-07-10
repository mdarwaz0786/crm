import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
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
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Customer", customerSchema);

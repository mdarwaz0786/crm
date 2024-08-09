import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    projectId: {
      type: String,
      unique: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectType",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectCategory",
    },
    timing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectTiming",
    },
    price: {
      type: String,
    },
    responsible: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }],
    leader: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }],
    start: {
      type: String,
    },
    due: {
      type: String,
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectPriority",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectStatus",
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Project", projectSchema);

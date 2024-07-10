import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    create: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
);

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    permissions: {
      customer: { type: PermissionSchema, default: () => ({}) },
      team: { type: PermissionSchema, default: () => ({}) },
      role: { type: PermissionSchema, default: () => ({}) },
      projectType: { type: PermissionSchema, default: () => ({}) },
      projectStatus: { type: PermissionSchema, default: () => ({}) },
      projectCategory: { type: PermissionSchema, default: () => ({}) },
      projectTiming: { type: PermissionSchema, default: () => ({}) },
      project: { type: PermissionSchema, default: () => ({}) },
      user: { type: PermissionSchema, default: () => ({}) },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Role', RoleSchema);


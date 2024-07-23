import mongoose from "mongoose";

// Field permission schema
const FieldPermissionSchema = new mongoose.Schema(
  {
    read: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
);

// Customer permission Schema
const CustomerPermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      email: { type: FieldPermissionSchema, default: () => ({}) },
      mobile: { type: FieldPermissionSchema, default: () => ({}) },
      address: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Designation permission Schema
const DesignationPermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      description: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Project permission Schema
const ProjectPermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      projectId: { type: FieldPermissionSchema, default: () => ({}) },
      type: { type: FieldPermissionSchema, default: () => ({}) },
      customer: { type: FieldPermissionSchema, default: () => ({}) },
      category: { type: FieldPermissionSchema, default: () => ({}) },
      timing: { type: FieldPermissionSchema, default: () => ({}) },
      price: { type: FieldPermissionSchema, default: () => ({}) },
      responsible: { type: FieldPermissionSchema, default: () => ({}) },
      leader: { type: FieldPermissionSchema, default: () => ({}) },
      start: { type: FieldPermissionSchema, default: () => ({}) },
      due: { type: FieldPermissionSchema, default: () => ({}) },
      priority: { type: FieldPermissionSchema, default: () => ({}) },
      status: { type: FieldPermissionSchema, default: () => ({}) },
      description: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Project category permission Schema
const ProjectCategoryPermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      description: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Project Status permission Schema
const ProjectStatusPermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      status: { type: FieldPermissionSchema, default: () => ({}) },
      description: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Project timing permission Schema
const ProjectTimingPermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      description: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Project type permission Schema
const ProjectTypePermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      description: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Team permission Schema
const TeamPermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      email: { type: FieldPermissionSchema, default: () => ({}) },
      mobile: { type: FieldPermissionSchema, default: () => ({}) },
      username: { type: FieldPermissionSchema, default: () => ({}) },
      password: { type: FieldPermissionSchema, default: () => ({}) },
      joining: { type: FieldPermissionSchema, default: () => ({}) },
      dob: { type: FieldPermissionSchema, default: () => ({}) },
      designation: { type: FieldPermissionSchema, default: () => ({}) },
      reportingTo: { type: FieldPermissionSchema, default: () => ({}) },
      role: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Role permission Schema
const RolePermissionSchema = new mongoose.Schema(
  {
    access: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
    create: {
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
    fields: {
      name: { type: FieldPermissionSchema, default: () => ({}) },
      masters: { type: FieldPermissionSchema, default: () => ({}) },
    },
  },
);

// Role schema
const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    permissions: {
      customer: { type: CustomerPermissionSchema, default: () => ({}) },
      team: { type: TeamPermissionSchema, default: () => ({}) },
      role: { type: RolePermissionSchema, default: () => ({}) },
      projectType: { type: ProjectTypePermissionSchema, default: () => ({}) },
      projectStatus: { type: ProjectStatusPermissionSchema, default: () => ({}) },
      projectCategory: { type: ProjectCategoryPermissionSchema, default: () => ({}) },
      projectTiming: { type: ProjectTimingPermissionSchema, default: () => ({}) },
      designation: { type: DesignationPermissionSchema, default: () => ({}) },
      project: { type: ProjectPermissionSchema, default: () => ({}) },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Role', RoleSchema);


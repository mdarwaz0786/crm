import Project from "../models/project.model.js";
import mongoose from "mongoose";

// Controller for creating a project
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    return res.status(201).json({ success: true, message: "Project created successfully", project });
  } catch (error) {
    console.log("Error while creating project:", error.message);
    return res.status(500).json({ success: false, message: `Error while creating project: ${error.message}` });
  };
};

// Helper function to build the projection object based on user permissions
const buildProjection = (permissions) => {
  const projectFields = permissions.project.fields;
  const projection = {};

  for (const [key, value] of Object.entries(projectFields)) {
    if (value.show) {
      projection[key] = 1;
    } else {
      projection[key] = 0;
    };
  };

  // Ensure _id is included by default unless explicitly excluded
  if (projection._id === undefined) {
    projection._id = 1;
  };

  return projection;
};

// Helper function to filter fields based on projection
const filterFields = (project, projection) => {
  const filteredProject = {};

  for (const key in project._doc) {
    if (projection[key]) {
      filteredProject[key] = project[key];
    };
  };

  // Ensure _id is included in the filtered project
  if (projection._id !== undefined && !filteredProject._id) {
    filteredProject._id = project._id;
  };

  return filteredProject;
};

// Helper function to find ObjectId by string in referenced models
const findObjectIdByString = async (modelName, fieldName, searchString) => {
  const Model = mongoose.model(modelName);
  const result = await Model.findOne({ [fieldName]: { $regex: new RegExp(searchString, 'i') } }).select('_id');
  return result ? result._id : null;
};

// Helper function to find ObjectId array by string in referenced models
const findObjectIdArrayByString = async (modelName, fieldName, searchString) => {
  const Model = mongoose.model(modelName);
  const results = await Model.find({ [fieldName]: { $regex: new RegExp(searchString, 'i') } }).select('_id');
  return results.map((result) => result._id);
};

// Controller for fetching all project
export const fetchAllProject = async (req, res) => {
  try {
    let filter = {};
    let sort = {};

    // Check if the role is either "Coordinator" or "Admin"
    const teamRole = req.team.role?.name;
    if (teamRole !== "Coordinator" && teamRole !== "Admin") {
      const teamId = req.team._id;
      filter.$or = [
        { leader: teamId },
        { responsible: teamId },
      ];
    };

    // Handle universal searching across all fields
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { name: { $regex: searchRegex } },
        { projectId: { $regex: searchRegex } },
        { price: { $regex: searchRegex } },
        { start: { $regex: searchRegex } },
        { due: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { type: await findObjectIdByString('ProjectType', 'name', req.query.search) },
        { customer: await findObjectIdByString('Customer', 'name', req.query.search) },
        { category: await findObjectIdByString('ProjectCategory', 'name', req.query.search) },
        { timing: await findObjectIdByString('ProjectTiming', 'name', req.query.search) },
        { status: await findObjectIdByString('ProjectStatus', 'status', req.query.search) },
        { priority: await findObjectIdByString('ProjectPriority', 'name', req.query.search) },
        { responsible: { $in: await findObjectIdArrayByString('Team', 'name', req.query.search) } },
        { leader: { $in: await findObjectIdArrayByString('Team', 'name', req.query.search) } },
      ];
    };

    // Handle name search
    if (req.query.name) {
      filter.name = { $regex: new RegExp(req.query.name, 'i') };
    };

    // Handle name filter
    if (req.query.nameFilter) {
      filter.name = { $in: Array.isArray(req.query.nameFilter) ? req.query.nameFilter : [req.query.nameFilter] };
    };

    // Handle projectId search
    if (req.query.projectId) {
      filter.projectId = { $regex: new RegExp(req.query.projectId, 'i') };
    };

    // Handle projectId filter
    if (req.query.projectIdFilter) {
      filter.projectId = { $in: Array.isArray(req.query.projectIdFilter) ? req.query.projectIdFilter : [req.query.projectIdFilter] };
    };

    // Handle date range filter
    if (req.query.dateRange) {
      const [startDateString, endDateString] = req.query.dateRange.split(" - ");
      const formatStartDate = startDateString.split("-");
      const formatEndDate = endDateString.split("-");

      const startDate = new Date(`${formatStartDate[2]}-${formatStartDate[1]}-${formatStartDate[0]}T00:00:00Z`);
      const endDate = new Date(`${formatEndDate[2]}-${formatEndDate[1]}-${formatEndDate[0]}T23:59:59Z`);

      filter.createdAt = { $gte: startDate, $lte: endDate };
    };

    // Handle sorting
    if (req.query.sort === 'Ascending') {
      sort = { createdAt: 1 };
    } else {
      sort = { createdAt: -1 };
    };

    // Handle pagination
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    const project = await Project.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("type")
      .populate("customer")
      .populate("category")
      .populate("status")
      .populate("responsible")
      .populate("leader")
      .populate("timing")
      .populate("priority")
      .exec();

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    };

    const permissions = req.team.role.permissions;
    const projection = buildProjection(permissions);
    const filteredProject = project.map((project) => filterFields(project, projection));
    const totalCount = await Project.countDocuments(filter);

    return res.status(200).json({ success: true, message: "All project fetched successfully", project: filteredProject, totalCount });
  } catch (error) {
    console.log("Error while fetching all project:", error.message);
    return res.status(500).json({ success: false, message: `Error while fetching all project: ${error.message}` });
  };
};

// Controller for fetching a single project
export const fetchSingleProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId)
      .populate("type")
      .populate("customer")
      .populate("category")
      .populate("status")
      .populate("responsible")
      .populate("leader")
      .populate("timing")
      .populate("priority")
      .exec();

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    };

    const permissions = req.team.role.permissions;
    const projection = buildProjection(permissions);
    const filteredProject = filterFields(project, projection);

    return res.status(200).json({ success: true, message: "Single project fetched successfully", project: filteredProject });
  } catch (error) {
    console.log("Error while fetching single project:", error.message);
    return res.status(500).json({ success: false, message: `Error while fetching single project: ${error.message}` });
  };
};

// Controller for updating a project
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndUpdate(projectId, req.body, { new: true });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    };

    return res.status(200).json({ success: true, message: "Project updated successfully", project });
  } catch (error) {
    console.log("Error while updating project:", error.message);
    return res.status(500).json({ success: false, message: `Error while updating project: ${error.message}` });
  };
};

// Controller for deleting a project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    };

    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error while deleting project:", error.message);
    return res.status(500).json({ success: false, message: `Error while deleting project: ${error.message}` });
  };
};

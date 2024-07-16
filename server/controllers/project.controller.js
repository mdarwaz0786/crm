import Project from "../models/project.model.js";

// Controller for creating a project
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    return res.status(201).json({ success: true, message: "Project created successfully", project });
  } catch (error) {
    console.log("Error while creating project:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating project" });
  };
};

// Helper function to build the projection object based on user permissions
const buildProjection = (permissions) => {
  const projectFields = permissions.project.fields;
  const projection = {};

  for (const [key, value] of Object.entries(projectFields)) {
    if (value.show) {
      projection[key] = 1;
    };
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
  return filteredProject;
};

// Controller for fetching all project
export const fetchAllProject = async (req, res) => {
  try {
    let filter = {};
    let sort = {};

    // Handle name filter
    if (req.query.name) {
      filter.name = req.query.name;
    };

    // Handle searching
    if (req.query.search) {
      filter.name = { $regex: new RegExp(req.query.search, 'i') };
    };

    // Handle sorting
    if (req.query.sort === 'Ascending') {
      sort = { createdAt: 1 }; // Sort by ascending order
    } else {
      sort = { createdAt: -1 }; // Sort by ascending order default
    };

    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teamPermissions = req.team.role.permissions;
    const projection = buildProjection(teamPermissions);

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
      .exec();

    const totalCount = await Project.countDocuments(filter);
    const filteredProject = project.map((project) => filterFields(project, projection));
    return res.status(200).json({ success: true, message: "All projects fetched successfully", project: filteredProject, totalCount });
  } catch (error) {
    console.log("Error while fetching all projects:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching all projects" });
  };
};

// Controller for fetching a single project
export const fetchSingleProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const teamPermissions = req.team.role.permissions;
    const projection = buildProjection(teamPermissions);

    const project = await Project.findById(projectId)
      .populate("type")
      .populate("customer")
      .populate("category")
      .populate("status")
      .populate("responsible")
      .populate("leader")
      .populate("timing")
      .exec();

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    };

    const filteredProject = filterFields(project, projection);

    return res.status(200).json({ success: true, message: "Single project fetched successfully", project: filteredProject });
  } catch (error) {
    console.log("Error while fetching single project:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching single project" });
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
    return res.status(500).json({ success: false, message: "Error while updating project" });
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

    return res.status(200).json({ success: true, message: "Project deleted successfully", project });
  } catch (error) {
    console.log("Error while deleting project:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting project" });
  };
};

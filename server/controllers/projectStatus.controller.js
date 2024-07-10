import ProjectStatus from "../models/projectStatus.model.js";

// Controller for creating a project status
export const createProjectStatus = async (req, res) => {
  try {
    const { status, description } = req.body;

    const projectStatus = new ProjectStatus({ status, description });
    await projectStatus.save();

    return res.status(200).json({ success: true, message: "Project status created successfully", projectStatus });
  } catch (error) {
    console.log("Error while creating project status:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating project status" });
  };
};

// Controller for fetching all project status
export const fetchAllProjectStatus = async (req, res) => {
  try {
    let filter = {};

    // Handle search query
    if (req.query.search) {
      filter.status = { $regex: new RegExp(req.query.search, 'i') };
    };

    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projectStatus = await ProjectStatus.find(filter).skip(skip).limit(limit).exec();

    if (!projectStatus) {
      return res.status(404).json({ success: false, message: "Project status not found" });
    };

    // Get total count of project status
    const totalCount = await ProjectStatus.countDocuments(filter);

    return res.status(200).json({ success: true, message: "Project status fetched successfully", projectStatus, totalCount });
  } catch (error) {
    console.log("Error while fetching project status:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching project status" });
  };
};

// Controller for fetching a single project status
export const fetchSingleProjectStatus = async (req, res) => {
  try {
    const projectStatusId = req.params.id;
    const projectStatus = await ProjectStatus.findById(projectStatusId);

    if (!projectStatus) {
      return res.status(404).json({ success: false, message: "Project status not found" });
    };

    return res.status(200).json({ success: true, message: "Project status fetched successfully", projectStatus });
  } catch (error) {
    console.log("Error while fetching project status:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching project status" });
  };
};

// Controller for updating a project status
export const updateProjectStatus = async (req, res) => {
  try {
    const projectStatusId = req.params.id;
    const { status, description } = req.body;

    const projectStatus = await ProjectStatus.findByIdAndUpdate(projectStatusId, { status, description }, { new: true });

    if (!projectStatus) {
      return res.status(404).json({ success: false, message: "Project status not found" });
    };

    return res.status(200).json({ success: true, message: "Project status updated successfully", projectStatus });
  } catch (error) {
    console.log("Error while updating project status:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating project status" });
  };
};

// Controller for deleting a project status
export const deleteProjectStatus = async (req, res) => {
  try {
    const projectStatusId = req.params.id;
    const projectStatus = await ProjectStatus.findByIdAndDelete(projectStatusId);

    if (!projectStatus) {
      return res.status(400).json({ success: false, message: "Project status not found" });
    };

    return res.status(200).json({ success: true, message: "Project status deleted successfully", projectStatus });
  } catch (error) {
    console.log("Error while deleting project status:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting project status" });
  };
};

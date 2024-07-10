import ProjectType from "../models/projectType.model.js";

// Controller for creating a project type
export const createProjectType = async (req, res) => {
  try {
    const { name, description } = req.body;

    const projectType = new ProjectType({ name, description });
    await projectType.save();

    return res.status(200).json({ success: true, message: "Project type created successfully", projectType });
  } catch (error) {
    console.log("Error while creating project type:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating project type" });
  };
};

// Controller for fetching all project type
export const fetchAllProjectType = async (req, res) => {
  try {
    let filter = {};

    // Handle search query
    if (req.query.search) {
      filter.name = { $regex: new RegExp(req.query.search, 'i') };
    };

    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projectType = await ProjectType.find(filter).skip(skip).limit(limit).exec();

    if (!projectType) {
      return res.status(404).json({ success: false, message: "Project type not found" });
    };

    // Get total count of project type
    const totalCount = await ProjectType.countDocuments(filter);

    return res.status(200).json({ success: true, message: "All project type fetched successfully", projectType, totalCount });
  } catch (error) {
    console.log("Error while fetching all project type:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching all project type" });
  };
};

// Controller for fetching a single project type
export const fetchSingleProjectType = async (req, res) => {
  try {
    const projectTypeId = req.params.id;
    const projectType = await ProjectType.findById(projectTypeId);

    if (!projectType) {
      return res.status(404).json({ success: false, message: "Project type not found" });
    };

    return res.status(200).json({ success: true, message: "Single project type fetched successfully", projectType });
  } catch (error) {
    console.log("Error while fetching single project type:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching single project type" });
  };
};

// Controller for updating a project type
export const updateProjectType = async (req, res) => {
  try {
    const projectTypeId = req.params.id;
    const { name, description } = req.body;

    const projectType = await ProjectType.findByIdAndUpdate(projectTypeId, { name, description }, { new: true });

    if (!projectType) {
      return res.status(404).json({ success: false, message: "Project type not found" });
    };

    return res.status(200).json({ success: true, message: "Project type updated successfully", projectType });
  } catch (error) {
    console.log("Error while updating project type:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating project type" });
  };
};

// Controller for deleting a project type
export const deleteProjectType = async (req, res) => {
  try {
    const projectTypeId = req.params.id;
    const projectType = await ProjectType.findByIdAndDelete(projectTypeId);

    if (!projectType) {
      return res.status(400).json({ success: false, message: "Project type not found" });
    };

    return res.status(200).json({ success: true, message: "Project type deleted successfully", projectType });
  } catch (error) {
    console.log("Error while deleting project type:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting project type" });
  };
};

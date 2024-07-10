import ProjectCategory from "../models/projectCategory.model.js";

// Controller for creating a project category
export const createProjectCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const projectCategory = new ProjectCategory({ name, description });
    await projectCategory.save();

    return res.status(200).json({ success: true, message: "Project category created successfully", projectCategory });
  } catch (error) {
    console.log("Error while creating project category:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating project category" });
  };
};

// Controller for fetching all project category
export const fetchAllProjectCategory = async (req, res) => {
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

    const projectCategory = await ProjectCategory.find(filter).skip(skip).limit(limit).exec();

    if (!projectCategory) {
      return res.status(404).json({ success: false, message: "Project category not found" });
    };

    // Get total count of project category
    const totalCount = await ProjectCategory.countDocuments(filter);

    return res.status(200).json({ success: true, message: "Project category fetched successfully", projectCategory, totalCount });
  } catch (error) {
    console.log("Error while fetching project category:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching project category" });
  };
};

// Controller for fetching a single project category
export const fetchSingleProjectCategory = async (req, res) => {
  try {
    const projectCategoryId = req.params.id;
    const projectCategory = await ProjectCategory.findById(projectCategoryId);

    if (!projectCategory) {
      return res.status(404).json({ success: false, message: "Project category not found" });
    };

    return res.status(200).json({ success: true, message: "Project category fetched successfully", projectCategory });
  } catch (error) {
    console.log("Error while fetching project category:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching project category" });
  };
};

// Controller for updating a project category
export const updateProjectCategory = async (req, res) => {
  try {
    const projectCategoryId = req.params.id;
    const { name, description } = req.body;

    const projectCategory = await ProjectCategory.findByIdAndUpdate(projectCategoryId, { name, description }, { new: true });

    if (!projectCategory) {
      return res.status(404).json({ success: false, message: "Project category not found" });
    };

    return res.status(200).json({ success: true, message: "Project category updated successfully", projectCategory });
  } catch (error) {
    console.log("Error while updating project category:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating project category" });
  };
};

// Controller for deleting a project category
export const deleteProjectCategory = async (req, res) => {
  try {
    const projectCategoryId = req.params.id;
    const projectCategory = await ProjectCategory.findByIdAndDelete(projectCategoryId);

    if (!projectCategory) {
      return res.status(400).json({ success: false, message: "Project category not found" });
    };

    return res.status(200).json({ success: true, message: "Project category deleted successfully", projectCategory });
  } catch (error) {
    console.log("Error while deleting project category:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting project category" });
  };
};

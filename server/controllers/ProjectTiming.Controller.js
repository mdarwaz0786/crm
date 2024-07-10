import ProjectTiming from "../models/projectTiming.model.js";

// Controller for creating a project timing
export const createProjectTiming = async (req, res) => {
  try {
    const { name, description } = req.body;

    const projectTiming = new ProjectTiming({ name, description });
    await projectTiming.save();

    return res.status(200).json({ success: true, message: "Project timing created successfully", projectTiming });
  } catch (error) {
    console.log("Error while creating project timing:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating project timing" });
  };
};

// Controller for fetching all project timing
export const fetchAllProjectTiming = async (req, res) => {
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

    const projectTiming = await ProjectTiming.find(filter).skip(skip).limit(limit).exec();

    if (!projectTiming) {
      return res.status(404).json({ success: false, message: "Project timing not found" });
    };

    // Get total count of project timing
    const totalCount = await ProjectTiming.countDocuments(filter);

    return res.status(200).json({ success: true, message: "Project timing fetched successfully", projectTiming, totalCount });
  } catch (error) {
    console.log("Error while fetching project timing:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching project timing" });
  };
};

// Controller for fetching a single project timing
export const fetchSingleProjectTiming = async (req, res) => {
  try {
    const projectTimingId = req.params.id;
    const projectTiming = await ProjectTiming.findById(projectTimingId);

    if (!projectTiming) {
      return res.status(404).json({ success: false, message: "Project timing not found" });
    };

    return res.status(200).json({ success: true, message: "Project timing fetched successfully", projectTiming });
  } catch (error) {
    console.log("Error while fetching project timing:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching project timing" });
  };
};

// Controller for updating a project timing
export const updateProjectTiming = async (req, res) => {
  try {
    const projectTimingId = req.params.id;
    const { name, description } = req.body;

    const projectTiming = await ProjectTiming.findByIdAndUpdate(projectTimingId, { name, description }, { new: true });

    if (!projectTiming) {
      return res.status(404).json({ success: false, message: "Project timing not found" });
    };

    return res.status(200).json({ success: true, message: "Project timing updated successfully", projectTiming });
  } catch (error) {
    console.log("Error while updating project timing:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating project timing" });
  };
};

// Controller for deleting a project timing
export const deleteProjectTiming = async (req, res) => {
  try {
    const projectTimingId = req.params.id;
    const projectTiming = await ProjectTiming.findByIdAndDelete(projectTimingId);

    if (!projectTiming) {
      return res.status(400).json({ success: false, message: "Project timing not found" });
    };

    return res.status(200).json({ success: true, message: "Project timing deleted successfully", projectTiming });
  } catch (error) {
    console.log("Error while deleting project timing:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting project timing" });
  };
};

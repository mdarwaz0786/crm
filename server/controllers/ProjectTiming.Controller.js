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

// Helper function to build the projection object based on user permissions
const buildProjection = (permissions) => {
  const projectTimingFields = permissions.projectTiming.fields;
  const projection = {};

  for (const [key, value] of Object.entries(projectTimingFields)) {
    if (value.show) {
      projection[key] = 1;
    } else {
      projection[key] = 0;
    };
  };

  if (projection._id === undefined) {
    projection._id = 1;
  };
  return projection;
};

// Helper function to filter fields based on projection
const filterFields = (projectTiming, projection) => {
  const filteredProjectTiming = {};
  for (const key in projectTiming._doc) {
    if (projection[key]) {
      filteredProjectTiming[key] = projectTiming[key];
    };
  };

  if (projection._id !== undefined && !filteredProjectTiming._id) {
    filteredProjectTiming._id = projectTiming._id;
  };
  return filteredProjectTiming;
};

// Controller for fetching all project timing
export const fetchAllProjectTiming = async (req, res) => {
  try {
    let filter = {};
    let sort = {};

    // Handle universal searching across all fields
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
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

    // Handle sorting
    if (req.query.sort === 'Ascending') {
      sort = { createdAt: 1 };
    } else {
      sort = { createdAt: -1 };
    };

    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projectTiming = await ProjectTiming.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    if (!projectTiming) {
      return res.status(404).json({ success: false, message: "Project timing not found" });
    };

    const permissions = req.team.role.permissions;
    const projection = buildProjection(permissions);
    const filteredProjectTiming = projectTiming.map((projectTiming) => filterFields(projectTiming, projection));
    const totalCount = await ProjectTiming.countDocuments(filter);

    return res.status(200).json({ success: true, message: "Project timing fetched successfully", projectTiming: filteredProjectTiming, totalCount });
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
    const permissions = req.team.role.permissions;
    const projection = buildProjection(permissions);
    const filteredProjectTiming = filterFields(projectTiming, projection);

    return res.status(200).json({ success: true, message: "Project timing fetched successfully", projectTiming: filteredProjectTiming });
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

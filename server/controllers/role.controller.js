import Role from "../models/role.model.js";

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json({ success: true, meaasge: "Role created successfully", role });
  } catch (error) {
    console.log("Error while creatinng role:", error.message);
    res.status(500).json({ success: false, meaasge: "Error while creatinng role" });
  };
};

// Get all roles
export const fetchAllRole = async (req, res) => {
  try {
    let filter = {};

    if (req.query.search) {
      filter.name = { $regex: new RegExp(req.query.search, 'i') };
    };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const role = await Role.find(filter).skip(skip).limit(limit).exec();

    if (!role) {
      return res.status(404).json({ success: false, message: "Role not found" });
    };

    const totalCount = await Role.countDocuments(filter);

    res.status(200).json({ success: true, meaasge: "All role fetched successfully", role, totalCount });
  } catch (error) {
    console.log("Error while fetching all role:", error.message);
    res.status(500).json({ success: false, meaasge: "Error while fetching all role" });
  };
};

// Get a single role by ID
export const fetchSingleRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    };
    res.status(200).json({ success: true, message: 'Single role fetched successfully', role });
  } catch (error) {
    console.log("Error while fetching single role:", error.message);
    res.status(500).json({ success: false, message: 'Error while fetching single role' });
  };
};

// Update a role by ID
export const updateRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    };
    res.status(200).json({ success: true, message: 'Role updated successfully', role });
  } catch (error) {
    console.log("Error while updating role:", error.message);
    res.status(500).json({ success: false, message: 'Error while updating role' });
  };
};

// Delete a role by ID
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    };
    res.status(200).json({ success: true, message: 'Role deleted successfully', role });
  } catch (error) {
    console.log("Error while deleting role:", error.message);
    res.status(500).json({ success: false, message: 'Error while updating role' });
  };
};



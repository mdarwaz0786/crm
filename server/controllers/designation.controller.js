import Designation from "../models/designation.model.js";

// Controller for creating a designation
export const createDesignation = async (req, res) => {
  try {
    const { name, description } = req.body;

    const designation = new Designation({ name, description });
    await designation.save();

    return res.status(200).json({ success: true, message: "Designation created successfully", designation });
  } catch (error) {
    console.log("Error while creating designation:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating designation" });
  };
};

// Controller for fetching all designation
export const fetchAllDesignation = async (req, res) => {
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

    const designation = await Designation.find(filter).skip(skip).limit(limit).exec();

    if (!designation) {
      return res.status(404).json({ success: false, message: "Designation not found" });
    };

    // Get total count of designation
    const totalCount = await Designation.countDocuments(filter);

    return res.status(200).json({ success: true, message: "Designation fetched successfully", designation, totalCount });
  } catch (error) {
    console.log("Error while fetching designation:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching designation" });
  };
};

// Controller for fetching a single designation
export const fetchSingleDesignation = async (req, res) => {
  try {
    const designationId = req.params.id;
    const designation = await Designation.findById(designationId);

    if (!designation) {
      return res.status(404).json({ success: false, message: "Designation not found" });
    };

    return res.status(200).json({ success: true, message: "Designation fetched successfully", designation });
  } catch (error) {
    console.log("Error while fetching designation:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching designation" });
  };
};

// Controller for updating a designation
export const updateDesignation = async (req, res) => {
  try {
    const designationId = req.params.id;
    const { name, description } = req.body;

    const designation = await Designation.findByIdAndUpdate(designationId, { name, description }, { new: true });

    if (!designation) {
      return res.status(404).json({ success: false, message: "Designation not found" });
    };

    return res.status(200).json({ success: true, message: "Designation updated successfully", designation });
  } catch (error) {
    console.log("Error while updating designation:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating designation" });
  };
};

// Controller for deleting a designation
export const deleteDesignation = async (req, res) => {
  try {
    const designationId = req.params.id;
    const designation = await Designation.findByIdAndDelete(designationId);

    if (!designation) {
      return res.status(400).json({ success: false, message: "Designation not found" });
    };

    return res.status(200).json({ success: true, message: "Designation deleted successfully", designation });
  } catch (error) {
    console.log("Error while deleting designation:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting designation" });
  };
};

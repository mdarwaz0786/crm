import Team from "../models/team.model.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

// Controller for creating a team
export const createTeam = async (req, res) => {
  try {
    const { name, email, username, password, mobile, joining, dob, designation, role, reportingTo } = req.body;

    const team = new Team({ name, email, username, password, mobile, joining, dob, designation, role, reportingTo });
    await team.save();

    return res.status(200).json({ success: true, message: "Team member created successfully", team });
  } catch (error) {
    console.log("Error while creating team member:", error.message);
    return res.status(500).json({ success: false, message: `Error while creating team member: ${error.message}` });
  };
};

// controller for login team member
export const loginTeam = async (req, res) => {
  try {
    const { username, password } = req.body;
    const team = await Team.findOne({ username });

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    };

    if (password !== team.password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    };

    return res.status(200).json({
      success: true,
      message: "Team member login successfully",
      _id: team._id,
      name: team.name,
      email: team.email,
      mobile: team.mobile,
      username: team.username,
      mobile: team.mobile,
      password: team.password,
      joining: team.joining,
      dob: team.dob,
      designation: team.designation._id,
      role: team.role._id,
      reportingTo: team.reportingTo._id,
      token: generateToken(
        team._id,
        team.name,
        team.email,
        team.mobile,
        team.username,
        team.password,
        team.joining,
        team.dob,
        team.designation._id,
        team.role._id,
        team.reportingTo._id,
      ),
    });
  } catch (error) {
    console.log("Error while login team member:", error.message);
    return res.status(500).json({ success: false, message: `Error while login team member: ${error.message}` });
  };
};

// Controller for fetching logged in team member
export const loggedInTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.team._id)
      .populate('designation')
      .populate('role')
      .populate('reportingTo')
      .exec();

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    };

    return res.status(200).json({ success: true, message: 'Logged in team member fetched successfully', team });
  } catch (error) {
    console.log('Error while fetching logged in team member:', error.message);
    return res.status(500).json({ success: false, message: `Error while fetching logged in team member: ${error.message}` });
  };
};

// Helper function to build the projection object based on user permissions
const buildProjection = (permissions) => {
  const teamFields = permissions.team.fields;
  const projection = {};

  for (const [key, value] of Object.entries(teamFields)) {
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
const filterFields = (team, projection) => {
  const filteredTeam = {};

  for (const key in team._doc) {
    if (projection[key]) {
      filteredTeam[key] = team[key];
    };
  };

  if (projection._id !== undefined && !filteredTeam._id) {
    filteredTeam._id = team._id;
  };

  return filteredTeam;
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

// Controller for fetching all team
export const fetchAllTeam = async (req, res) => {
  try {
    let filter = {};
    let sort = {};

    // Handle universal searching across all fields
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { mobile: { $regex: searchRegex } },
        { username: { $regex: searchRegex } },
        { password: { $regex: searchRegex } },
        { joining: { $regex: searchRegex } },
        { dob: { $regex: searchRegex } },
        { designation: await findObjectIdByString('Designation', 'name', req.query.search) },
        { role: await findObjectIdByString('Role', 'name', req.query.search) },
        { reportingTo: { $in: await findObjectIdArrayByString('Team', 'name', req.query.search) } },
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

    const team = await Team.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("reportingTo")
      .populate("role")
      .populate("designation")
      .exec();

    if (!team) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    };

    const permissions = req.team.role.permissions;
    const projection = buildProjection(permissions);
    const filteredTeam = team.map((team) => filterFields(team, projection));
    const totalCount = await Team.countDocuments(filter);

    return res.status(200).json({ success: true, message: "All team member fetched successfully", team: filteredTeam, totalCount });
  } catch (error) {
    console.log("Error while fetching all team member:", error.message);
    return res.status(500).json({ success: false, message: `Error while fetching all team member: ${error.message}` });
  };
};

// Controller for fetching a single team
export const fetchSingleTeam = async (req, res) => {
  try {
    const teamId = req.params.id;

    const team = await Team.findById(teamId)
      .populate("reportingTo")
      .populate("role")
      .populate("designation")
      .exec();

    if (!team) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    };

    const permissions = req.team.role.permissions;
    const projection = buildProjection(permissions);
    const filteredTeam = filterFields(team, projection);

    return res.status(200).json({ success: true, message: "Single team member fetched successfully", team: filteredTeam });
  } catch (error) {
    console.log("Error while fetching single team member:", error.message);
    return res.status(500).json({ success: false, message: `Error while fetching single team member: ${error.message}` });
  };
};

// Controller for updating a team member
export const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { name, email, username, password, mobile, joining, dob, role, designation, reportingTo } = req.body;

    const team = await Team.findByIdAndUpdate(teamId, { name, email, username, password, mobile, joining, dob, designation, role, reportingTo }, { new: true });

    if (!team) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    };

    return res.status(200).json({ success: true, message: "Team member updated successfully", team });
  } catch (error) {
    console.log("Error while updating team member:", error.message);
    return res.status(500).json({ success: false, message: `Error while updating team member: ${error.message}` });
  };
};

// Controller for deleting a team
export const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findByIdAndDelete(teamId);

    if (!team) {
      return res.status(400).json({ success: false, message: "Team member not found" });
    };

    return res.status(200).json({ success: true, message: "Team member deleted successfully", team });
  } catch (error) {
    console.log("Error while deleting team member:", error.message);
    return res.status(500).json({ success: false, message: `Error while deleting team member: ${error.message}` });
  };
};

import Team from "../models/team.model.js";
import generateToken from "../utils/generateToken.js";

// Controller for creating a team
export const createTeam = async (req, res) => {
  try {
    const { name, email, username, password, mobile, joining, dob, designation, role, reportingTo } = req.body;
    const team = new Team({ name, email, username, password, mobile, joining, dob, designation, role, reportingTo });
    await team.save();
    return res.status(200).json({ success: true, message: "Team created successfully", team });
  } catch (error) {
    console.log("Error while creating team:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating team" });
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
    console.log("Error while logging team member:", error.message);
    return res.status(500).json({ success: false, message: "Error while logging team member" });
  };
};

export const loggedInTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.team._id).populate('designation').populate('role').populate('reportingTo').exec();
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    };
    return res.status(200).json({ success: true, message: 'Logged in team member fetched successfully', team });
  } catch (error) {
    console.log('Error while fetching logged in team member:', error.message);
    return res.status(500).json({ success: false, message: 'Error while fetching logged in team member' });
  };
};

// Controller for fetching all team
export const fetchAllTeam = async (req, res) => {
  try {
    let filter = {};
    if (req.query.search) {
      filter.name = { $regex: new RegExp(req.query.search, 'i') };
    };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const team = await Team.find(filter).skip(skip).limit(limit).populate("reportingTo").populate("role").populate("designation").exec();
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    };
    const totalCount = await Team.countDocuments(filter);
    return res.status(200).json({ success: true, message: "All team fetched successfully", team, totalCount });
  } catch (error) {
    console.log("Error while fetching all team:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching all team" });
  };
};

// Controller for fetching a single team
export const fetchSingleTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId).populate("reportingTo").populate("reportingTo").populate("role").populate("designation").exec();
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    };
    return res.status(200).json({ success: true, message: "Single team fetched successfully", team });
  } catch (error) {
    console.log("Error while fetching team:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching team" });
  };
};

// Controller for updating a team
export const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { name, email, username, password, mobile, joining, dob, role, designation, reportingTo } = req.body;
    const team = await Team.findByIdAndUpdate(teamId, { name, email, username, password, mobile, joining, dob, designation, role, reportingTo }, { new: true });
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    };
    return res.status(200).json({ success: true, message: "Team updated successfully", team });
  } catch (error) {
    console.log("Error while updating team:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating team" });
  };
};

// Controller for deleting a team
export const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findByIdAndDelete(teamId);
    if (!team) {
      return res.status(400).json({ success: false, message: "Team not found" });
    };
    return res.status(200).json({ success: true, message: "Team deleted successfully", team });
  } catch (error) {
    console.log("Error while deleting team:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting team" });
  };
};

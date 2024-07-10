import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// controller for register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "user with this email already exist" });
    };

    const user = new User({ name, email, mobile, password });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      role: user.role,
      token: generateToken(
        user._id,
        user.name,
        user.email,
        user.mobile,
        user.password,
        user.role,
      ),
    });
  } catch (error) {
    console.log("error while registering user:", error.message);
    return res.status(500).json({ success: false, message: "error while registering user" });
  };
};

// controller for login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    };

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: "invalid password" });
    };

    return res.status(200).json({
      success: true,
      message: "user login successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      role: user.role,
      token: generateToken(
        user._id,
        user.name,
        user.email,
        user.mobile,
        user.password,
        user.role,
      ),
    });
  } catch (error) {
    console.log("error while logging user:", error.message);
    return res.status(500).json({ success: false, message: "error while logging user" });
  };
};

export const loggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('role').exec();
    if (!user) {
      return res.status(404).json({ success: false, message: 'user not found' });
    };
    return res.status(200).json({ success: true, message: 'logged in user fetched successfully', user });
  } catch (error) {
    console.log('error while fetching logged in user data:', error.message);
    return res.status(500).json({ success: false, message: 'error while fetching logged in user data' });
  };
};

// controller for fetch all user
export const fetchAllUser = async (req, res) => {
  try {
    let filter = {};

    if (req.query.search) {
      filter.name = { $regex: new RegExp(req.query.search, "i") };
    };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCount = await User.countDocuments(filter);

    const user = await User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("role").exec();
    return res.status(200).json({ success: true, message: "user fetched successfully", user, totalCount });
  } catch (error) {
    console.log("error while fetching user:", error.message);
    return res.status(500).json({ success: false, message: "error while fetching user" });
  };
};

// controller for fetch single user
export const fetchSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("role").exec();

    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    };

    return res.status(200).json({ success: true, message: "single user fetched successfully", user });
  } catch (error) {
    console.log("error while fetching single user:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "error while fetching single user" });
  }
};

// controller for update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, { name, email, mobile, password, role }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" })
    };

    return res.status(200).json({ success: true, message: "user updated successfully", user });
  } catch (error) {
    console.log("error while updating user:", error.message);
    return res.status(500).json({ success: false, message: "error while updating user" });
  };
};

// controller for delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: "user not found" });
    };

    return res.status(200).json({ success: true, message: "user deleted Successfully", user });
  } catch (error) {
    console.log("error while deleting user:", error.message);
    return res.status(500).json({ success: false, message: "error while deleting User" });
  };
};

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "token not found" });
    };

    const jwtToken = token.replace("Bearer", "").trim();
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isVerified.email }).populate("role").exec();

    req.user = userData;
    req.token = jwtToken;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.log("user is not logged in error from middleware:", error.message);
    return res.status(401).json({ success: false, message: "user is not logged in" });
  };
};
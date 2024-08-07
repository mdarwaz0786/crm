import jwt from "jsonwebtoken";

// Function for generate json web token
const generateToken = (teamId, name, email, mobile, username, password, joining, dob, designation, role, reportingTo) => {
  return jwt.sign({ teamId, name, email, mobile, username, password, joining, dob, designation, role, reportingTo }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

export default generateToken;
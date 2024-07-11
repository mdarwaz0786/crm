import jwt from "jsonwebtoken";

const generateToken = (userId, name, email, mobile, password, role) => {
  return jwt.sign({ userId, name, email, mobile, password, role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

export default generateToken;
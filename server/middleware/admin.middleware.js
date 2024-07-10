export const isAdmin = async (req, res, next) => {
  try {
    const admin = req.user.role.name === "Admin";

    if (!admin) {
      return res.status(403).json({ success: false, message: "user is not admin" });
    };

    next();
  } catch (error) {
    console.log("user is not admin:", error.message);
    return res.status(401).json({ success: false, message: "user is not admin" });
  };
};
import express from "express";
import { deleteUser, fetchAllUser, fetchSingleUser, loggedInUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/logged-in-user", isLoggedIn, loggedInUser);
router.get("/all-user", isLoggedIn, checkPermission("user", "read"), fetchAllUser);
router.get("/single-user/:id", isLoggedIn, checkPermission("user", "read"), fetchSingleUser);
router.put("/update-user/:id", isLoggedIn, checkPermission("user", "update"), updateUser);
router.delete("/delete-user/:id", isLoggedIn, checkPermission("user", "delete"), deleteUser);

export default router;
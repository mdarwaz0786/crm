import express from "express";
import { createRole, deleteRole, fetchAllRole, fetchSingleRole, updateRole } from "../controllers/role.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-role", isLoggedIn, checkPermission("role", "create"), createRole);
router.get("/all-role", isLoggedIn, checkPermission("role", "read"), fetchAllRole);
router.get("/single-role/:id", isLoggedIn, checkPermission("role", "read"), fetchSingleRole);
router.put("/update-role/:id", isLoggedIn, checkPermission("role", "update"), updateRole);
router.delete("/delete-role/:id", isLoggedIn, checkPermission("role", "delete"), deleteRole);

export default router;
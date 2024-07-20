import express from "express";
import { createRole, deleteRole, fetchAllRole, fetchSingleRole, updateRole } from "../controllers/role.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-role", isLoggedIn, checkMasterActionPermission("role", "create"), createRole);
router.get("/all-role", isLoggedIn, checkMasterActionPermission("role", "access"), fetchAllRole);
router.get("/single-role/:id", isLoggedIn, checkMasterActionPermission("role", "access"), fetchSingleRole);
router.put("/update-role/:id", isLoggedIn, checkMasterActionPermission("role", "update"), updateRole);
router.delete("/delete-role/:id", isLoggedIn, checkMasterActionPermission("role", "delete"), deleteRole);

export default router;
import express from "express";
import { createProject, deleteProject, fetchAllProject, fetchSingleProject, updateProject } from "../controllers/project.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-project", isLoggedIn, checkPermission("project", "create"), createProject);
router.get("/all-project", isLoggedIn, checkPermission("project", "read"), fetchAllProject);
router.get("/single-project/:id", isLoggedIn, checkPermission("project", "read"), fetchSingleProject);
router.put("/update-project/:id", isLoggedIn, checkPermission("project", "update"), updateProject);
router.delete("/delete-project/:id", isLoggedIn, checkPermission("project", "delete"), deleteProject);

export default router;





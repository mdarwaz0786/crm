import express from "express";
import { createProject, deleteProject, fetchAllProject, fetchSingleProject, updateProject } from "../controllers/project.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";
import checkFieldPermission from "../middleware/fieldPermission.middleware.js";

// router object
const router = express.Router();

// Define the fields of project to check permissions
const fields = ['name', 'projectId', 'type', 'customer', 'category', 'timing', 'price', 'responsible', 'leader', 'start', 'due', 'priority', 'status', 'description'];

// routes
router.post("/create-project", isLoggedIn, checkMasterActionPermission("project", "create"), checkFieldPermission, createProject);
router.get("/all-project", isLoggedIn, checkMasterActionPermission("project", "access"), fetchAllProject);
router.get("/single-project/:id", isLoggedIn, checkMasterActionPermission("project", "access"), fetchSingleProject);
router.put("/update-project/:id", isLoggedIn, checkMasterActionPermission("project", "update"), checkFieldPermission("project", fields), updateProject);
router.delete("/delete-project/:id", isLoggedIn, checkMasterActionPermission("project", "delete"), deleteProject);

export default router;





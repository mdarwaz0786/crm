import express from "express";
import { createProject, deleteProject, fetchAllProject, fetchSingleProject, updateProject } from "../controllers/project.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-project", isLoggedIn, checkMasterActionPermission("project", "create"), createProject);
router.get("/all-project", isLoggedIn, fetchAllProject);
router.get("/single-project/:id", isLoggedIn, fetchSingleProject);
router.put("/update-project/:id", isLoggedIn, checkMasterActionPermission("project", "update"), updateProject);
router.delete("/delete-project/:id", isLoggedIn, checkMasterActionPermission("project", "delete"), deleteProject);

export default router;





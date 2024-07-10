import express from "express";
import { createProjectType, deleteProjectType, fetchAllProjectType, fetchSingleProjectType, updateProjectType } from "../controllers/projectType.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectType", isLoggedIn, checkPermission("projectType", "create"), createProjectType);
router.get("/all-projectType", isLoggedIn, checkPermission("projectType", "read"), fetchAllProjectType);
router.get("/single-projectType/:id", isLoggedIn, checkPermission("projectType", "read"), fetchSingleProjectType);
router.put("/update-projectType/:id", isLoggedIn, checkPermission("projectType", "update"), updateProjectType);
router.delete("/delete-projectType/:id", isLoggedIn, checkPermission("projectType", "delete"), deleteProjectType);

export default router;





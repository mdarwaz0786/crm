import express from "express";
import { createProjectType, deleteProjectType, fetchAllProjectType, fetchSingleProjectType, updateProjectType } from "../controllers/projectType.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectType", isLoggedIn, checkMasterActionPermission("projectType", "create"), createProjectType);
router.get("/all-projectType", isLoggedIn, checkMasterActionPermission("projectType", "access"), fetchAllProjectType);
router.get("/single-projectType/:id", isLoggedIn, checkMasterActionPermission("projectType", "access"), fetchSingleProjectType);
router.put("/update-projectType/:id", isLoggedIn, checkMasterActionPermission("projectType", "update"), updateProjectType);
router.delete("/delete-projectType/:id", isLoggedIn, checkMasterActionPermission("projectType", "delete"), deleteProjectType);

export default router;





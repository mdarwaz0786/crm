import express from "express";
import { createProjectStatus, deleteProjectStatus, fetchAllProjectStatus, fetchSingleProjectStatus, updateProjectStatus } from "../controllers/projectStatus.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectStatus", isLoggedIn, checkMasterActionPermission("projectStatus", "create"), createProjectStatus);
router.get("/all-projectStatus", isLoggedIn, fetchAllProjectStatus);
router.get("/single-projectStatus/:id", isLoggedIn, fetchSingleProjectStatus);
router.put("/update-projectStatus/:id", isLoggedIn, checkMasterActionPermission("projectStatus", "update"), updateProjectStatus);
router.delete("/delete-projectStatus/:id", isLoggedIn, checkMasterActionPermission("projectStatus", "delete"), deleteProjectStatus);

export default router;





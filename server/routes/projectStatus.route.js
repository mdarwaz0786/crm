import express from "express";
import { createProjectStatus, deleteProjectStatus, fetchAllProjectStatus, fetchSingleProjectStatus, updateProjectStatus } from "../controllers/projectStatus.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectStatus", isLoggedIn, checkPermission("projectStatus", "create"), createProjectStatus);
router.get("/all-projectStatus", isLoggedIn, checkPermission("projectStatus", "read"), fetchAllProjectStatus);
router.get("/single-projectStatus/:id", isLoggedIn, checkPermission("projectStatus", "read"), fetchSingleProjectStatus);
router.put("/update-projectStatus/:id", isLoggedIn, checkPermission("projectStatus", "update"), updateProjectStatus);
router.delete("/delete-projectStatus/:id", isLoggedIn, checkPermission("projectStatus", "delete"), deleteProjectStatus);

export default router;





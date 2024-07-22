import express from "express";
import { createProjectTiming, deleteProjectTiming, fetchAllProjectTiming, fetchSingleProjectTiming, updateProjectTiming } from './../controllers/ProjectTiming.Controller.js';
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectTiming", isLoggedIn, checkMasterActionPermission("projectTiming", "create"), createProjectTiming);
router.get("/all-projectTiming", isLoggedIn, checkMasterActionPermission("projectTiming", "access"), fetchAllProjectTiming);
router.get("/single-projectTiming/:id", isLoggedIn, checkMasterActionPermission("projectTiming", "access"), fetchSingleProjectTiming);
router.put("/update-projectTiming/:id", isLoggedIn, checkMasterActionPermission("projectTiming", "update"), updateProjectTiming);
router.delete("/delete-projectTiming/:id", isLoggedIn, checkMasterActionPermission("projectTiming", "delete"), deleteProjectTiming);

export default router;





import express from "express";
import { createProjectTiming, deleteProjectTiming, fetchAllProjectTiming, fetchSingleProjectTiming, updateProjectTiming } from './../controllers/ProjectTiming.Controller.js';
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectTiming", isLoggedIn, checkPermission("projectTiming", "create"), createProjectTiming);
router.get("/all-projectTiming", isLoggedIn, checkPermission("projectTiming", "read"), fetchAllProjectTiming);
router.get("/single-projectTiming/:id", isLoggedIn, checkPermission("projectTiming", "read"), fetchSingleProjectTiming);
router.put("/update-projectTiming/:id", isLoggedIn, checkPermission("projectTiming", "update"), updateProjectTiming);
router.delete("/delete-projectTiming/:id", isLoggedIn, checkPermission("projectTiming", "delete"), deleteProjectTiming);

export default router;





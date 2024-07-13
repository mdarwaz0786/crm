import express from "express";
import { createProjectTiming, deleteProjectTiming, fetchAllProjectTiming, fetchSingleProjectTiming, updateProjectTiming } from './../controllers/ProjectTiming.Controller.js';

// router object
const router = express.Router();

// routes
router.post("/create-projectTiming", createProjectTiming);
router.get("/all-projectTiming", fetchAllProjectTiming);
router.get("/single-projectTiming/:id", fetchSingleProjectTiming);
router.put("/update-projectTiming/:id", updateProjectTiming);
router.delete("/delete-projectTiming/:id", deleteProjectTiming);

export default router;





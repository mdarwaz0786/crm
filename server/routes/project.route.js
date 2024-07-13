import express from "express";
import { createProject, deleteProject, fetchAllProject, fetchSingleProject, updateProject } from "../controllers/project.controller.js";

// router object
const router = express.Router();

// routes
router.post("/create-project", createProject);
router.get("/all-project", fetchAllProject);
router.get("/single-project/:id", fetchSingleProject);
router.put("/update-project/:id", updateProject);
router.delete("/delete-project/:id", deleteProject);

export default router;





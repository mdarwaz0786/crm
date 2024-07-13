import express from "express";
import { createProjectType, deleteProjectType, fetchAllProjectType, fetchSingleProjectType, updateProjectType } from "../controllers/projectType.controller.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectType", createProjectType);
router.get("/all-projectType", fetchAllProjectType);
router.get("/single-projectType/:id", fetchSingleProjectType);
router.put("/update-projectType/:id", updateProjectType);
router.delete("/delete-projectType/:id", deleteProjectType);

export default router;





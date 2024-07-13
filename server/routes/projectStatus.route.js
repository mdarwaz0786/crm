import express from "express";
import { createProjectStatus, deleteProjectStatus, fetchAllProjectStatus, fetchSingleProjectStatus, updateProjectStatus } from "../controllers/projectStatus.controller.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectStatus", createProjectStatus);
router.get("/all-projectStatus", fetchAllProjectStatus);
router.get("/single-projectStatus/:id", fetchSingleProjectStatus);
router.put("/update-projectStatus/:id", updateProjectStatus);
router.delete("/delete-projectStatus/:id", deleteProjectStatus);

export default router;





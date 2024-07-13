import express from "express";
import { createProjectCategory, deleteProjectCategory, fetchAllProjectCategory, fetchSingleProjectCategory, updateProjectCategory } from "../controllers/projectCategory.controller.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectCategory", createProjectCategory);
router.get("/all-projectCategory", fetchAllProjectCategory);
router.get("/single-projectCategory/:id", fetchSingleProjectCategory);
router.put("/update-projectCategory/:id", updateProjectCategory);
router.delete("/delete-projectCategory/:id", deleteProjectCategory);

export default router;





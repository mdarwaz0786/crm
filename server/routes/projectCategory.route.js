import express from "express";
import { createProjectCategory, deleteProjectCategory, fetchAllProjectCategory, fetchSingleProjectCategory, updateProjectCategory } from "../controllers/projectCategory.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectCategory", isLoggedIn, checkPermission("projectCategory", "create"), createProjectCategory);
router.get("/all-projectCategory", isLoggedIn, checkPermission("projectCategory", "read"), fetchAllProjectCategory);
router.get("/single-projectCategory/:id", isLoggedIn, checkPermission("projectCategory", "read"), fetchSingleProjectCategory);
router.put("/update-projectCategory/:id", isLoggedIn, checkPermission("projectCategory", "update"), updateProjectCategory);
router.delete("/delete-projectCategory/:id", isLoggedIn, checkPermission("projectCategory", "delete"), deleteProjectCategory);

export default router;





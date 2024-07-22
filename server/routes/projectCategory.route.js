import express from "express";
import { createProjectCategory, deleteProjectCategory, fetchAllProjectCategory, fetchSingleProjectCategory, updateProjectCategory } from "../controllers/projectCategory.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-projectCategory", isLoggedIn, checkMasterActionPermission("projectCategory", "create"), createProjectCategory);
router.get("/all-projectCategory", isLoggedIn, checkMasterActionPermission("projectCategory", "access"), fetchAllProjectCategory);
router.get("/single-projectCategory/:id", isLoggedIn, checkMasterActionPermission("projectCategory", "access"), fetchSingleProjectCategory);
router.put("/update-projectCategory/:id", isLoggedIn, checkMasterActionPermission("projectCategory", "update"), updateProjectCategory);
router.delete("/delete-projectCategory/:id", isLoggedIn, checkMasterActionPermission("projectCategory", "delete"), deleteProjectCategory);

export default router;





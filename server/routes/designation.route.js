import express from "express";
import { createDesignation, deleteDesignation, fetchAllDesignation, fetchSingleDesignation, updateDesignation } from "../controllers/designation.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-designation", isLoggedIn, checkMasterActionPermission("designation", "create"), createDesignation);
router.get("/all-designation", isLoggedIn, fetchAllDesignation);
router.get("/single-designation/:id", isLoggedIn, fetchSingleDesignation);
router.put("/update-designation/:id", isLoggedIn, checkMasterActionPermission("designation", "update"), updateDesignation);
router.delete("/delete-designation/:id", isLoggedIn, checkMasterActionPermission("designation", "delete"), deleteDesignation);

export default router;






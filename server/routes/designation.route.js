import express from "express";
import { createDesignation, deleteDesignation, fetchAllDesignation, fetchSingleDesignation, updateDesignation } from "../controllers/designation.controller.js";

// router object
const router = express.Router();

// routes
router.post("/create-designation", createDesignation);
router.get("/all-designation", fetchAllDesignation);
router.get("/single-designation/:id", fetchSingleDesignation);
router.put("/update-designation/:id", updateDesignation);
router.delete("/delete-designation/:id", deleteDesignation);

export default router;






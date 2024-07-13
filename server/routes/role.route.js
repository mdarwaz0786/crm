import express from "express";
import { createRole, deleteRole, fetchAllRole, fetchSingleRole, updateRole } from "../controllers/role.controller.js";

// router object
const router = express.Router();

// routes
router.post("/create-role", createRole);
router.get("/all-role", fetchAllRole);
router.get("/single-role/:id", fetchSingleRole);
router.put("/update-role/:id", updateRole);
router.delete("/delete-role/:id", deleteRole);

export default router;
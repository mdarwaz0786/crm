import express from "express";
import { createTeam, deleteTeam, fetchAllTeam, fetchSingleTeam, updateTeam } from "../controllers/team.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-team", isLoggedIn, checkPermission("team", "create"), createTeam);
router.get("/all-team", isLoggedIn, checkPermission("team", "read"), fetchAllTeam);
router.get("/single-team/:id", isLoggedIn, checkPermission("team", "read"), fetchSingleTeam);
router.put("/update-team/:id", isLoggedIn, checkPermission("team", "update"), updateTeam);
router.delete("/delete-team/:id", isLoggedIn, checkPermission("team", "delete"), deleteTeam);

export default router;





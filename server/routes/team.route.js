import express from "express";
import { createTeam, deleteTeam, fetchAllTeam, fetchSingleTeam, loggedInTeam, loginTeam, updateTeam } from "../controllers/team.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-team", isLoggedIn, checkMasterActionPermission("team", "create"), createTeam);
router.post("/login-team", loginTeam);
router.get("/loggedin-team", isLoggedIn, loggedInTeam);
router.get("/all-team", isLoggedIn, checkMasterActionPermission("team", "access"), fetchAllTeam);
router.get("/single-team/:id", isLoggedIn, checkMasterActionPermission("team", "access"), fetchSingleTeam);
router.put("/update-team/:id", isLoggedIn, checkMasterActionPermission("team", "update"), updateTeam);
router.delete("/delete-team/:id", isLoggedIn, checkMasterActionPermission("team", "delete"), deleteTeam);

export default router;





import express from "express";
import { createTeam, deleteTeam, fetchAllTeam, fetchSingleTeam, loggedInTeam, loginTeam, updateTeam } from "../controllers/team.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';

// router object
const router = express.Router();

// routes
router.post("/create-team", createTeam);
router.post("/login-team", loginTeam);
router.get("/loggedin-team", isLoggedIn, loggedInTeam);
router.get("/all-team", fetchAllTeam);
router.get("/single-team/:id", fetchSingleTeam);
router.put("/update-team/:id", updateTeam);
router.delete("/delete-team/:id", deleteTeam);

export default router;





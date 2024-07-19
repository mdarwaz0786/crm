import express from "express";
import { createCustomer, deleteCustomer, fetchAllCustomer, fetchSingleCustomer, updateCustomer } from "../controllers/customer.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkMasterActionPermission from "../middleware/masterActionPermission.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-customer", isLoggedIn, checkMasterActionPermission("customer", "create"), createCustomer);
router.get("/all-customer", isLoggedIn, checkMasterActionPermission("customer", "access"), fetchAllCustomer);
router.get("/single-customer/:id", isLoggedIn, checkMasterActionPermission("customer", "access"), fetchSingleCustomer);
router.put("/update-customer/:id", isLoggedIn, checkMasterActionPermission("customer", "update"), updateCustomer);
router.delete("/delete-customer/:id", isLoggedIn, checkMasterActionPermission("customer", "delete"), deleteCustomer);

export default router;





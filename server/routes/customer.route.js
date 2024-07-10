import express from "express";
import { createCustomer, deleteCustomer, fetchAllCustomer, fetchSingleCustomer, updateCustomer } from "../controllers/customer.controller.js";
import { isLoggedIn } from './../middleware/auth.middleware.js';
import checkPermission from "../middleware/role.middleware.js";

// router object
const router = express.Router();

// routes
router.post("/create-customer", isLoggedIn, checkPermission("customer", "create"), createCustomer);
router.get("/all-customer", isLoggedIn, checkPermission("customer", "read"), fetchAllCustomer);
router.get("/single-customer/:id", isLoggedIn, checkPermission("customer", "read"), fetchSingleCustomer);
router.put("/update-customer/:id", isLoggedIn, checkPermission("customer", "update"), updateCustomer);
router.delete("/delete-customer/:id", isLoggedIn, checkPermission("customer", "delete"), deleteCustomer);

export default router;





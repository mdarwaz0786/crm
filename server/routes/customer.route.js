import express from "express";
import { createCustomer, deleteCustomer, fetchAllCustomer, fetchSingleCustomer, updateCustomer } from "../controllers/customer.controller.js";

// router object
const router = express.Router();

// routes
router.post("/create-customer", createCustomer);
router.get("/all-customer", fetchAllCustomer);
router.get("/single-customer/:id", fetchSingleCustomer);
router.put("/update-customer/:id", updateCustomer);
router.delete("/delete-customer/:id", deleteCustomer);

export default router;





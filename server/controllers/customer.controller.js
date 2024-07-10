import Customer from "../models/customer.model.js";

// Controller for creating a customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;

    const customer = new Customer({ name, email, mobile, address });
    await customer.save();

    return res.status(200).json({ success: true, message: "Customer created successfully", customer });
  } catch (error) {
    console.log("Error while creating customer:", error.message);
    return res.status(500).json({ success: false, message: "Error while creating customer" });
  };
};

// Controller for fetching all customer
export const fetchAllCustomer = async (req, res) => {
  try {
    let filter = {};

    // Handle search query
    if (req.query.search) {
      filter.name = { $regex: new RegExp(req.query.search, 'i') };
    };

    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const customer = await Customer.find(filter).skip(skip).limit(limit).exec();

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    };

    // Get total count of customers
    const totalCount = await Customer.countDocuments(filter);

    return res.status(200).json({ success: true, message: "Customer fetched successfully", customer, totalCount });
  } catch (error) {
    console.log("Error while fetching customer:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching customer" });
  };
};

// Controller for fetching a single customer
export const fetchSingleCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    };

    return res.status(200).json({ success: true, message: "Customer fetched successfully", customer });
  } catch (error) {
    console.log("Error while fetching customer:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching customer" });
  };
};

// Controller for updating a customer
export const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { name, email, mobile, address } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, { name, email, mobile, address }, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    };

    return res.status(200).json({ success: true, message: "Customer updated successfully", updatedCustomer });
  } catch (error) {
    console.log("Error while updating customer:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating customer" });
  };
};

// Controller for deleting a customer
export const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(400).json({ success: false, message: "Customer not found" });
    };

    return res.status(200).json({ success: true, message: "Customer deleted successfully", deletedCustomer });
  } catch (error) {
    console.log("Error while deleting customer:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting customer" });
  };
};

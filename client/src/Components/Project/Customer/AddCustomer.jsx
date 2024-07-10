import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { validToken } = useAuth();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        return toast.error("Enter name");
      }
      if (!email) {
        return toast.error("Enter email");
      }
      if (!mobile) {
        return toast.error("Enter mobile");
      }
      if (!address) {
        return toast.error("Enter address");
      }

      const response = await axios.post("/api/v1/customer/create-customer", { name, email, mobile, address }, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      if (response?.data?.success) {
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        toast.success("Customer created successfully");
        navigate("/customer");
      }
    } catch (error) {
      console.log("Error while creating customer:", error.message);
      toast.error("Error while creating customer");
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add Customer</h4>
          <Link to="/customer"><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
              <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="address">Address <span className="text-danger">*</span></label>
              <textarea className="form-control" rows={6} name="description" id="description" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className="submit-button text-end">
          <Link to="/customer" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleCreate(e)}>Create</Link>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
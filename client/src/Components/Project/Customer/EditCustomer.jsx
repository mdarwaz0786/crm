/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";


const EditCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, user, isLoading } = useAuth();

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/customer/single-customer/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      setName(response?.data?.customer?.name);
      setEmail(response?.data?.customer?.email);
      setMobile(response?.data?.customer?.mobile);
      setAddress(response?.data?.customer?.address);
    } catch (error) {
      console.log("Error while fetching single customer:", error.message);
    }
  };

  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

  const handleUpdate = async (e, id) => {
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

      const response = await axios.put(`/api/v1/customer/update-customer/${id}`, { name, email, mobile, address }, {
        headers: {
          Authorization: `${validToken}`,
        }
      });
      if (response?.data?.success) {
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        toast.success("Customer updated successfully");
        navigate("/customer")
      }
    } catch (error) {
      console.log("Error while updating customer:", error.message);
      toast.error("Error while updating customer");
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!user?.role?.permissions?.customer?.update) {
    return <Navigate to="/customer" />;
  }

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
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
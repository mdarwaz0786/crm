/* eslint-disable no-extra-semi */
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
  const { validToken, team, isLoading } = useAuth();
  const fieldPermissions = team?.role?.permissions?.customer?.fields;
  const permissions = team?.role?.permissions?.customer;

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/customer/single-customer/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName(response?.data?.customer?.name);
        setEmail(response?.data?.customer?.email);
        setMobile(response?.data?.customer?.mobile);
        setAddress(response?.data?.customer?.address);
      };
    } catch (error) {
      console.log("Error while fetching single customer:", error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.update && id) {
      fetchSingleData(id);
    };
  }, [id, isLoading, team, permissions?.update]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Create update object
    const updateData = {};

    // Conditionally include fields based on permissions
    if (fieldPermissions?.name?.show && !fieldPermissions?.name?.read) {
      updateData.name = name;
    };

    if (fieldPermissions?.email?.show && !fieldPermissions?.email?.read) {
      updateData.email = email;
    };

    if (fieldPermissions?.mobile?.show && !fieldPermissions?.mobile?.read) {
      updateData.mobile = mobile;
    };

    if (fieldPermissions?.address?.show && !fieldPermissions?.address?.read) {
      updateData.address = address;
    };

    try {
      const response = await axios.put(`/api/v1/customer/update-customer/${id}`, updateData, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        toast.success("Customer updated successfully");
        navigate(-1);
      };
    } catch (error) {
      console.log("Error while updating customer:", error.message);
      toast.error("Error while updating customer");
    };
  };

  if (isLoading) {
    return <Preloader />;
  };

  if (!permissions?.update) {
    return <Navigate to="/" />;
  };

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Customer</h4>
          <Link to="#" onClick={() => navigate(-1)}><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          {
            (fieldPermissions?.name?.show) && (
              <div className="col-md-12">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.name?.read ? "readonly-style" : ""}`} name="name" id="name" value={name} onChange={(e) => fieldPermissions?.name?.read ? null : setName(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.email?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
                  <input type="email" className={`form-control ${fieldPermissions?.email?.read ? "readonly-style" : ""}`} name="email" id="email" value={email} onChange={(e) => fieldPermissions?.email?.read ? null : setEmail(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.mobile?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.mobile?.read ? "readonly-style" : ""}`} name="mobile" id="mobile" value={mobile} onChange={(e) => fieldPermissions?.mobile?.read ? null : setMobile(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.address?.show) && (
              <div className="col-md-12">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="address">Address <span className="text-danger">*</span></label>
                  <textarea className={`form-control ${fieldPermissions?.address?.read ? "readonly-style" : ""}`} rows={4} name="description" id="description" value={address} onChange={(e) => fieldPermissions?.address?.read ? null : setAddress(e.target.value)} />
                </div>
              </div>
            )
          }
        </div>
        <div className="submit-button text-end">
          <Link to="/customer" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
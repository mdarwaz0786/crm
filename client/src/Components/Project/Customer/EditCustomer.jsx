/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";

const formFields = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'mobile', type: 'text', label: 'Mobile' },
  { name: 'address', type: 'textarea', label: 'Address', row: 4 },
];

const EditCustomer = () => {
  const [formData, setFormData] = useState(formFields.reduce((accumulator, field) => ({ ...accumulator, [field.name]: "" }), {}));
  const [fieldPermissions, setFieldPermissions] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, team, isLoading } = useAuth();
  const permissions = team?.role?.permissions?.customer;

  useEffect(() => {
    if (!isLoading && team && permissions?.update && id) {
      fetchSingleData(id);
      setFieldPermissions(permissions?.fields || {});
    };
  }, [id, isLoading, team, permissions]);

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/customer/single-customer/${id}`, {
        headers: { Authorization: `${validToken}` },
      });

      if (response?.data?.success) {
        setFormData(response.data.customer);
      };
    } catch (error) {
      console.log("Error while fetching single customer:", error.message);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!fieldPermissions[name]?.read) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Create update object based on permissions
    const updateData = Object.fromEntries(Object.entries(formData).filter(([key]) => fieldPermissions[key]?.show && !fieldPermissions[key]?.read));

    try {
      const response = await axios.put(`/api/v1/customer/update-customer/${id}`, updateData, {
        headers: { Authorization: `${validToken}` },
      });

      if (response?.data?.success) {
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
        <form onSubmit={(e) => handleUpdate(e, id)}>
          <div className="row">
            {
              formFields.map(({ name, type, label, row }) => (
                fieldPermissions[name]?.show && (
                  <div className={type === "textarea" || name === "name" ? "col-md-12" : "col-md-6"} key={name}>
                    <div className="form-wrap">
                      <label className="col-form-label" htmlFor={name}>
                        {label} <span className="text-danger">*</span>
                      </label>
                      {
                        type === "textarea" ? (
                          <textarea className={`form-control ${fieldPermissions[name]?.read ? "readonly-style" : ""}`} rows={row} name={name} id={name} value={formData[name]} onChange={handleChange} />
                        ) : (
                          <input type={type} className={`form-control ${fieldPermissions[name]?.read ? "readonly-style" : ""}`} name={name} id={name} value={formData[name]} onChange={handleChange} />
                        )
                      }
                    </div>
                  </div>
                )
              ))
            }
          </div>
          <div className="submit-button text-end">
            <Link to="#" onClick={() => navigate(-1)} className="btn btn-light sidebar-close">Cancel</Link>
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
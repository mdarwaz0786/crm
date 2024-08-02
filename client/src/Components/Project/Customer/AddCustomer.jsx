/* eslint-disable no-extra-semi */
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";

const formFields = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'mobile', type: 'text', label: 'Mobile' },
  { name: 'address', type: 'textarea', label: 'Address', row: 4 },
];

const AddCustomer = () => {
  const [formData, setFormData] = useState(
    formFields.reduce((accumulator, field) => ({ ...accumulator, [field.name]: "" }), {}),
  );

  const navigate = useNavigate();
  const { validToken, team, isLoading } = useAuth();
  const permissions = team?.role?.permissions?.customer;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const allFieldsValid = formFields.every(({ name }) => formData[name]);

    if (!allFieldsValid) {
      return toast.error("All fields are required.");
    };

    try {
      const response = await axios.post("/api/v1/customer/create-customer", formData, {
        headers: { Authorization: `${validToken}` },
      });

      if (response?.data?.success) {
        setFormData((prev) => Object.keys(prev).reduce((accumulator, key) => ({ ...accumulator, [key]: "" }), {}));
        toast.success("Customer created successfully");
        navigate(-1);
      };
    } catch (error) {
      console.log("Error while creating customer:", error.message);
      toast.error("Error while creating customer");
    };
  };

  if (isLoading) return <Preloader />;

  if (!permissions?.create) return <Navigate to="/" />;

  console.log(formData);

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add Customer</h4>
          <Link to="#" onClick={() => navigate(-1)}><button className="btn btn-primary">Back</button></Link>
        </div>
        <form onSubmit={handleCreate}>
          <div className="row">
            {
              formFields.map(({ name, type, label, row }) => (
                <div className={type === "textarea" || name === "name" ? "col-md-12" : "col-md-6"} key={name}>
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor={name}>
                      {label} <span className="text-danger">*</span>
                    </label>
                    {
                      (type === "textarea") ? (
                        <textarea className="form-control" rows={row} name={name} id={name} value={formData[name]} onChange={handleChange} />
                      ) : (
                        <input type={type} className="form-control" name={name} id={name} value={formData[name]} onChange={handleChange} />
                      )
                    }
                  </div>
                </div>
              ))
            }
          </div>
          <div className="submit-button text-end">
            <Link to="#" onClick={() => navigate(-1)} className="btn btn-light sidebar-close">Cancel</Link>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
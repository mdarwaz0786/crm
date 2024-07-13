import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useAuth } from "../../../context/authContext.jsx";
// import Preloader from '../../../Preloader.jsx';

const AddDesignation = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  // const { validToken, user, isLoading } = useAuth();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        return toast.error("Enter name");
      }
      if (!description) {
        return toast.error("Enter description");
      }

      const response = await axios.post("/api/v1/designation/create-designation", { name, description });
      if (response?.data?.success) {
        setName("");
        setDescription("");
        toast.success("Designation created successfully");
        navigate("/designation");
      }
    } catch (error) {
      console.log("Error while creating designation:", error.message);
      toast.error("Error while creating designation");
    }
  };

  // if (isLoading) {
  //   return <Preloader />;
  // }

  // if (!user?.role?.permissions?.projectCategory?.create) {
  //   return <Navigate to="/project-category" />;
  // }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add Designation</h4>
          <Link to="/designation"><button className="btn btn-primary">Back</button></Link>
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
              <label className="col-form-label" htmlFor="description">Description <span className="text-danger">*</span></label>
              <textarea className="form-control" rows={6} name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className="submit-button text-end">
          <Link to="/designation" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleCreate(e)}>Create</Link>
        </div>
      </div>
    </div>
  );
};

export default AddDesignation;
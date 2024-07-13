/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useAuth } from "../../../context/authContext.jsx";
// import Preloader from "../../../Preloader.jsx";

const EditProjectType = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // const { validToken, user, isLoading } = useAuth();

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/projectType/single-projectType/${id}`);
      if (response?.data?.success) {
        setName(response?.data?.projectType?.name);
        setDescription(response?.data?.projectType?.description);
      }
    } catch (error) {
      console.log("Error while fetching single project type:", error.message);
    }
  };

  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/projectType/update-projectType/${id}`, { name, description });
      if (response?.data?.success) {
        setName("");
        setDescription("");
        toast.success("Project type updated successfully");
        navigate("/project-type");
      }
    } catch (error) {
      console.log("Error while updating project type:", error.message);
      toast.error("Error while updating project type");
    }
  };

  // if (isLoading) {
  //   return <Preloader />;
  // }

  // if (!user?.role?.permissions?.projectType?.update) {
  //   return <Navigate to="/project-type" />;
  // }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Project Type</h4>
          <Link to="/project-type"><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="name">Type <span className="text-danger">*</span></label>
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
          <Link to="/project-type" className="btn btn-light">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditProjectType;
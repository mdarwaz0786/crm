/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";

const EditProjectStatus = () => {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, user, isLoading } = useAuth();

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/projectStatus/single-projectStatus/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      setStatus(response?.data?.projectStatus?.status);
      setDescription(response?.data?.projectStatus?.description);
    } catch (error) {
      console.log("Error while fetching single project status:", error.message);
    }
  };

  useEffect(() => {
    fetchSingleData(id);
  }, [id])

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      if (!status) {
        return toast.error("Enter status");
      }
      if (!description) {
        return toast.error("Enter description");
      }

      const response = await axios.put(`/api/v1/projectStatus/update-projectStatus/${id}`, { status, description }, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      if (response?.data?.success) {
        setStatus("");
        setDescription("");
        toast.success("Project Status updated successfully");
        navigate("/project-status");
      }
    } catch (error) {
      console.log("Error while updating project status:", error.message);
      toast.error("Error while updating project status");
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!user?.role?.permissions?.projectStatus?.update) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Project Status</h4>
          <Link to="/project-status"><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="status">Status <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required />
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
          <Link to="/project-status" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditProjectStatus;
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from '../../../Preloader.jsx';

const EditProjectTiming = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, team, isLoading } = useAuth();

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/projectTiming/single-projectTiming/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName(response?.data?.projectTiming?.name);
        setDescription(response?.data?.projectTiming?.description);
      }
    } catch (error) {
      console.log("Error while fetching single project timing:", error.message);
    }
  };

  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

  // Create update object
  const updateData = {};
  const fieldPermissions = team?.role?.permissions?.projectTiming?.fields;

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Conditionally include fields based on permissions
    if (fieldPermissions?.name?.show && !fieldPermissions?.name?.read) {
      updateData.name = name;
    }

    if (fieldPermissions?.description?.show && !fieldPermissions?.description?.read) {
      updateData.description = description;
    }

    try {
      const response = await axios.put(`/api/v1/projectTiming/update-projectTiming/${id}`, updateData, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName("");
        setDescription("");
        toast.success("Project timing updated successfully");
        navigate("/project-timing");
      }
    } catch (error) {
      console.log("Error while updating project timing:", error.message);
      toast.error("Error while updating project timing");
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!team?.role?.permissions?.projectTiming?.update) {
    return <Navigate to="/project-timing" />;
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Project Timing</h4>
          <Link to="/project-timing"><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          {
            (fieldPermissions?.name?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required readOnly={fieldPermissions?.name?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.description?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="description">Description <span className="text-danger">*</span></label>
                  <textarea className="form-control" rows={1} name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required readOnly={fieldPermissions?.description?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
        </div>
        <div className="submit-button text-end">
          <Link to="/project-timing" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditProjectTiming;
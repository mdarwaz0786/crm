/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from '../../../Preloader.jsx';

const EditProjectCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, user, isLoading } = useAuth();

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/projectCategory/single-projectCategory/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      setName(response?.data?.projectCategory?.name);
      setDescription(response?.data?.projectCategory?.description);
    } catch (error) {
      console.log("Error while fetching single project category:", error.message);
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
      if (!description) {
        return toast.error("Enter description");
      }

      const response = await axios.put(`/api/v1/projectCategory/update-projectCategory/${id}`, { name, description }, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      if (response?.data?.success) {
        setName("");
        setDescription("");
        toast.success("Project category updated successfully");
        navigate("/project-category");
      }
    } catch (error) {
      console.log("Error while updating project category:", error.message);
      toast.error("Error while updating project category");
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!user?.role?.permissions?.projectCategory?.update) {
    return <Navigate to="/project-category" />;
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Project Category</h4>
          <Link to="/project-category"><button className="btn btn-primary">Back</button></Link>
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
          <Link to="/project-category" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditProjectCategory;
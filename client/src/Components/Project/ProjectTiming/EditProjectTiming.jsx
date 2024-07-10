/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from "../../../context/authContext.jsx";


const EditProjectTiming = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken } = useAuth();

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/projectTiming/single-projectTiming/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      setName(response?.data?.projectTiming?.name);
      setDescription(response?.data?.projectTiming?.description);
    } catch (error) {
      console.log("Error while fetching single project timing:", error.message);
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

      const response = await axios.put(`/api/v1/projectTiming/update-projectTiming/${id}`, { name, description }, {
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

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Project Timing</h4>
          <Link to="/project-timing"><button className="btn btn-primary">Back</button></Link>
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
          <Link to="/project-timing" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditProjectTiming;
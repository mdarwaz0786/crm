/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/authContext.jsx";
import Preloader from "../../Preloader.jsx";

const EditProject = () => {
  const [customer, setCustomer] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [projectCategory, setProjectCategory] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [projectTiming, setProjectTiming] = useState([]);

  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [selectedProjectCategory, setSelectedProjectCategory] = useState("");
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProjectTiming, setSelectedProjectTiming] = useState("");
  const [price, setPrice] = useState("");
  const [selectedResponsible, setSelectedResponsible] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState([]);
  const [start, setStart] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { team, isLoading } = useAuth();

  const fetchAllCustomer = async () => {
    try {
      const response = await axios.get("/api/v1/customer/all-customer");
      if (response?.data?.success) {
        setCustomer(response?.data?.customer);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllProjectCatgory = async () => {
    try {
      const response = await axios.get("/api/v1/projectCategory/all-projectCategory");
      if (response?.data?.success) {
        setProjectCategory(response?.data?.projectCategory);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllProjectTiming = async () => {
    try {
      const response = await axios.get("/api/v1/projectTiming/all-projectTiming");
      if (response?.data?.success) {
        setProjectTiming(response?.data?.projectTiming);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllTeamMember = async () => {
    try {
      const response = await axios.get("/api/v1/team/all-team");
      if (response?.data?.success) {
        setTeamMember(response?.data?.team);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllProjectStatus = async () => {
    try {
      const response = await axios.get("/api/v1/projectStatus/all-projectStatus");
      if (response?.data?.success) {
        setProjectStatus(response?.data?.projectStatus);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllProjectType = async () => {
    try {
      const response = await axios.get("/api/v1/projectType/all-projectType");
      if (response?.data?.success) {
        setProjectType(response?.data?.projectType);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    fetchAllCustomer();
    fetchAllProjectCatgory();
    fetchAllProjectType();
    fetchAllProjectStatus();
    fetchAllTeamMember();
    fetchAllProjectTiming();
  }, []);

  const fetchSingleProject = async (id) => {
    try {
      const response = await axios.get(`/api/v1/project/single-project/${id}`);
      if (response?.data?.success) {
        setName(response?.data?.project?.name);
        setProjectId(response?.data?.project?.projectId);
        setSelectedProjectType(response?.data?.project?.type?._id);
        setSelectedCustomer(response?.data?.project?.customer?._id);
        setSelectedProjectCategory(response?.data?.project?.category?._id);
        setSelectedProjectTiming(response?.data?.project?.timing?._id);
        setPrice(response?.data?.project?.price);
        setSelectedResponsible(response?.data?.project?.responsible?.map((r) => r._id));
        setSelectedLeader(response?.data?.project?.leader?.map((l) => l?._id));
        setStart(response?.data?.project?.start);
        setDue(response?.data?.project?.due);
        setPriority(response?.data?.project?.priority);
        setSelectedProjectStatus(response?.data?.project?.status?._id);
        setDescription(response?.data?.project?.description);
      }
    } catch (error) {
      console.log("Error while fetching single project:", error.message);
    }
  };

  useEffect(() => {
    fetchSingleProject(id);
  }, [id]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/project/update-project/${id}`, {
        name,
        projectId,
        type: selectedProjectType,
        customer: selectedCustomer,
        category: selectedProjectCategory,
        timing: selectedProjectTiming,
        price,
        responsible: selectedResponsible,
        leader: selectedLeader,
        start,
        due,
        priority,
        status: selectedProjectStatus,
        description,
      });

      if (response?.data?.success) {
        setName("");
        setProjectId("");
        setSelectedProjectType("");
        setSelectedProjectCategory("");
        setSelectedProjectStatus("");
        setSelectedCustomer("");
        setDescription("");
        setSelectedProjectTiming("");
        setPriority("");
        setPrice("");
        setSelectedResponsible([]);
        setSelectedLeader([]);
        setStart("");
        setDue("");
        setDescription("");
        toast.success("Project updated successfully");
        navigate("/project");
      }
    } catch (error) {
      console.log("Error while updating project:", error.message);
      toast.error("Error while updating project");
    }
  };

  const handleSelectChangeResponsible = (e) => {
    const value = e.target.value;
    if (value && !selectedResponsible?.includes(value)) {
      setSelectedResponsible([...selectedResponsible, value]);
    }
  };

  const handleRemoveResponsible = (value) => {
    setSelectedResponsible(selectedResponsible?.filter((item) => item !== value));
  };

  const handleSelectChangeLeader = (e) => {
    const value = e.target.value;
    if (value && !selectedLeader?.includes(value)) {
      setSelectedLeader([...selectedLeader, value]);
    }
  };

  const handleRemoveLeader = (value) => {
    setSelectedLeader(selectedLeader?.filter((item) => item !== value));
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!team?.role?.permissions?.project?.fields?.name?.update) {
    return <Navigate to="/project" />;
  }

  return (
    <>
      <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
        <div className="content">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Edit Project</h4>
            <Link to="/project"><button className="btn btn-primary">Back</button></Link>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="name">Project Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="projectId">Project ID<span className="text-danger"> *</span></label>
                <input className="form-control" type="text" name="projectId" id="projectId" value={projectId} onChange={(e) => setProjectId(e.target.value)} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Project Type <span className="text-danger">*</span></label>
                <select className="form-select" name="type" value={selectedProjectType} onChange={(e) => setSelectedProjectType(e.target.value)}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    projectType?.map((p) => (
                      <option key={p?._id} value={p?._id}>{p?.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Client <span className="text-danger">*</span></label>
                <select className="form-select" name="customer" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    customer?.map((c) => (
                      <option key={c?._id} value={c?._id}>{c?.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Category <span className="text-danger">*</span></label>
                <select className="form-select" name="category" value={selectedProjectCategory} onChange={(e) => setSelectedProjectCategory(e.target.value)}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    projectCategory?.map((p) => (
                      <option key={p?._id} value={p?._id}>{p?.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Project Timing  <span className="text-danger">*</span></label>
                <select className="form-select" name="timing" value={selectedProjectTiming} onChange={(e) => setSelectedProjectTiming(e.target.value)}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    projectTiming?.map((p) => (
                      <option key={p?._id} value={p?._id}>{p?.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            {
              team?.role?.permissions?.project?.fields?.price?.show ? (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor="price">Price <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required readOnly={team?.role?.permissions?.project?.fields?.price?.read} />
                  </div>
                </div>
              ) : (
                ""
              )
            }
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Responsible Persons <span className="text-danger">*</span></label>
                <select className="form-select" name="responsible" value="" onChange={handleSelectChangeResponsible}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    teamMember?.map((t) => (
                      <option key={t?._id} value={t?._id}>{t?.name}</option>
                    ))
                  }
                </select>
                <div className="selected-container">
                  {
                    selectedResponsible?.map((responsible, index) => (
                      <span key={index} className="selected-item">
                        {teamMember?.find((t) => t?._id === responsible)?.name}
                        <button type="button" className="remove-btn" onClick={() => handleRemoveResponsible(responsible)}>{"x"}</button>
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Team Leader  <span className="text-danger">*</span></label>
                <select className="form-select" name="leader" value="" onChange={handleSelectChangeLeader}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    teamMember?.map((t) => (
                      <option key={t?._id} value={t?._id}>{t?.name}</option>
                    ))
                  }
                </select>
                <div className="selected-container">
                  {
                    selectedLeader?.map((leader, index) => (
                      <span key={index} className="selected-item">
                        {teamMember?.find((t) => t?._id === leader)?.name}
                        <button type="button" className="remove-btn" onClick={() => handleRemoveLeader(leader)}>{"x"}</button>
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="start">Start Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control" name="start" id="start" value={start} onChange={(e) => setStart(e.target.value)} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="due">Due Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control" name="due" id="due" value={due} onChange={(e) => setDue(e.target.value)} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Priority <span className="text-danger">*</span></label>
                <select className="form-select" name="status" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Status <span className="text-danger">*</span></label>
                <select className="form-select" name="status" value={selectedProjectStatus} onChange={(e) => setSelectedProjectStatus(e.target.value)}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    projectStatus?.map((p) => (
                      <option key={p?._id} value={p?._id}>{p?.status}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="description">Description <span className="text-danger">*</span></label>
                <textarea className="form-control" rows={4} name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="submit-button text-end">
            <Link to="/project" className="btn btn-light">Cancel</Link>
            <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProject;
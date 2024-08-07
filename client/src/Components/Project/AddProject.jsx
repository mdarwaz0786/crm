/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/authContext.jsx";
import Preloader from "../../Preloader.jsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddProject = () => {
  const [data, setData] = useState([]);
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
  const navigate = useNavigate();
  const { team, validToken, isLoading } = useAuth();
  const permissions = team?.role?.permissions?.project;

  const fetchAllCustomer = async () => {
    try {
      const response = await axios.get("/api/v1/customer/all-customer", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setCustomer(response?.data?.customer);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  const fetchAllProjectCatgory = async () => {
    try {
      const response = await axios.get("/api/v1/projectCategory/all-projectCategory", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setProjectCategory(response?.data?.projectCategory);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  const fetchAllProjectTiming = async () => {
    try {
      const response = await axios.get("/api/v1/projectTiming/all-projectTiming", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setProjectTiming(response?.data?.projectTiming);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  const fetchAllTeamMember = async () => {
    try {
      const response = await axios.get("/api/v1/team/all-team", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setTeamMember(response?.data?.team);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  const fetchAllProjectStatus = async () => {
    try {
      const response = await axios.get("/api/v1/projectStatus/all-projectStatus", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setProjectStatus(response?.data?.projectStatus);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  const fetchAllProjectType = async () => {
    try {
      const response = await axios.get("/api/v1/projectType/all-projectType", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setProjectType(response?.data?.projectType);
      };
    } catch (error) {
      console.log(error.message);
    };
  };


  const fetchAllData = async () => {
    try {
      const response = await axios.get("/api/v1/project/all-project", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setData(response?.data?.project);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.create) {
      fetchAllCustomer();
      fetchAllProjectCatgory();
      fetchAllProjectType();
      fetchAllProjectStatus();
      fetchAllTeamMember();
      fetchAllProjectTiming();
      fetchAllData();
    };
  }, [isLoading, team, permissions]);

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedStart = formatDateToDDMMYYYY(start);
  const formattedDue = formatDateToDDMMYYYY(due);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        return toast.error("Enter name");
      };

      if (!projectId) {
        return toast.error("Enter project id");
      };

      if (!selectedProjectType) {
        return toast.error("Enter project type");
      };

      if (!selectedCustomer) {
        return toast.error("Enter Client");
      };

      if (!selectedProjectCategory) {
        return toast.error("Enter category");
      };

      if (!selectedProjectTiming) {
        return toast.error("Enter project timing");
      };

      if (!price) {
        return toast.error("Enter price");
      };

      if (selectedResponsible?.length === 0) {
        return toast.error("Enter responsible person");
      };

      if (selectedLeader?.length === 0) {
        return toast.error("Enter team leader");
      };

      if (!start) {
        return toast.error("Enter start date");
      };

      if (!due) {
        return toast.error("Enter due date");
      };

      if (!priority) {
        return toast.error("Enter priority");
      };

      if (!selectedProjectStatus) {
        return toast.error("Enter status");
      };

      if (!description) {
        return toast.error("Enter description");
      };

      const response = await axios.post("/api/v1/project/create-project",
        {
          name,
          projectId,
          type: selectedProjectType,
          customer: selectedCustomer,
          category: selectedProjectCategory,
          timing: selectedProjectTiming,
          price,
          responsible: selectedResponsible,
          leader: selectedLeader,
          start: formattedStart,
          due: formattedDue,
          priority,
          status: selectedProjectStatus,
          description,
        },
        {
          headers: {
            Authorization: `${validToken}`,
          },
        },
      );

      if (response?.data?.success) {
        setName("");
        setProjectId("");
        setSelectedProjectType("");
        setSelectedProjectCategory("");
        setSelectedProjectStatus("");
        setSelectedCustomer("");
        setDescription("");
        setSelectedProjectTiming("");
        setPrice("");
        setSelectedResponsible([]);
        setSelectedLeader([]);
        setPriority("");
        setStart("");
        setDue("");
        setDescription("");
        toast.success("Project created successfully");
        navigate(-1);
      };
    } catch (error) {
      console.log("Error while creating project:", error.message);
      toast.error("Error while creating project");
    };
  };

  const handleSelectChangeResponsible = (e) => {
    const value = e.target.value;
    if (value && !selectedResponsible?.includes(value)) {
      setSelectedResponsible([...selectedResponsible, value]);
    };
  };

  const handleRemoveResponsible = (value) => {
    setSelectedResponsible(selectedResponsible?.filter((item) => item !== value));
  };

  const handleSelectChangeLeader = (e) => {
    const value = e.target.value;
    if (value && !selectedLeader?.includes(value)) {
      setSelectedLeader([...selectedLeader, value]);
    };
  };

  const handleRemoveLeader = (value) => {
    setSelectedLeader(selectedLeader?.filter((item) => item !== value));
  };

  if (isLoading) {
    return <Preloader />;
  };

  if (!permissions?.create) {
    return <Navigate to="/" />;
  };

  return (
    <>
      <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
        <div className="content">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Add Project</h4>
            <Link to="#" onClick={() => navigate(-1)}><button className="btn btn-primary">Back</button></Link>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="name">Project Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="projectId">Project ID<span className="text-danger"> *</span></label>
                <input className="form-control" type="text" name="projectId" id="projectId" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
                {
                  projectId === "" ? null : (
                    data?.some((d) => d?.projectId === projectId) ? (
                      <div className="col-form-label" style={{ color: "red" }}>Not Available <i className="fas fa-times"></i></div>
                    ) : (
                      <div className="col-form-label" style={{ color: "green" }}>Available <i className="fas fa-check"></i></div>
                    )
                  )
                }
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
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="price">Price <span className="text-danger">*</span></label>
                <input className="form-control" type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
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
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label">Responsible Persons <span className="text-danger">*</span></label>
                <select className="form-select" name="responsible" value="" onChange={handleSelectChangeResponsible}>
                  <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                  {
                    teamMember?.filter((t) => !selectedResponsible.includes(t?._id)).map((t) => (
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
                    teamMember?.filter((t) => !selectedLeader.includes(t?._id)).map((t) => (
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
                <input type="date" className="form-control" name="start" id="start" value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="due">Due Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control" name="due" id="due" value={due} onChange={(e) => setDue(e.target.value)} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-wrap">
                <label className="col-form-label" htmlFor="description">
                  Description <span className="text-danger">*</span>
                </label>
                <ReactQuill
                  className="custom-quill-editor"
                  value={description}
                  onChange={setDescription}
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' },
                      { 'indent': '-1' }, { 'indent': '+1' }],
                      ['link', 'image', 'video'],
                      ['clean']
                    ],
                  }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                  ]}
                  placeholder="Write the description here..."
                  row={6}
                />
              </div>
            </div>
          </div>
          <div className="submit-button text-end">
            <Link to="#" onClick={() => navigate(-1)} className="btn btn-light">Cancel</Link>
            <Link to="#" className="btn btn-primary" onClick={(e) => handleCreate(e)}>Create</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
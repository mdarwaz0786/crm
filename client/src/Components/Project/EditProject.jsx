/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/authContext.jsx";
import Preloader from "../../Preloader.jsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  const { team, validToken, isLoading } = useAuth();
  const fieldPermissions = team?.role?.permissions?.project?.fields;
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

  useEffect(() => {
    if (!isLoading && team && permissions?.update) {
      fetchAllCustomer();
      fetchAllProjectCatgory();
      fetchAllProjectType();
      fetchAllProjectStatus();
      fetchAllTeamMember();
      fetchAllProjectTiming();
    };
  }, [isLoading, team, permissions?.update]);

  const fetchSingleProject = async (id) => {
    try {
      const response = await axios.get(`/api/v1/project/single-project/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName(response?.data?.project?.name);
        setProjectId(response?.data?.project?.projectId);
        setSelectedProjectType(response?.data?.project?.type?._id);
        setSelectedCustomer(response?.data?.project?.customer?._id);
        setSelectedProjectCategory(response?.data?.project?.category?._id);
        setSelectedProjectTiming(response?.data?.project?.timing?._id);
        setPrice(response?.data?.project?.price);
        setSelectedResponsible(response?.data?.project?.responsible?.map((r) => r?._id));
        setSelectedLeader(response?.data?.project?.leader?.map((l) => l?._id));
        setStart(response?.data?.project?.start);
        setDue(response?.data?.project?.due);
        setPriority(response?.data?.project?.priority);
        setSelectedProjectStatus(response?.data?.project?.status?._id);
        setDescription(response?.data?.project?.description);
      };
    } catch (error) {
      console.log("Error while fetching single project:", error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.update && id) {
      fetchSingleProject(id);
    };
  }, [isLoading, team, permissions?.update, id]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Create update object
    const updateData = {};

    // Conditionally include fields based on fieldPermissions
    if (fieldPermissions?.name?.show && !fieldPermissions?.name?.read) {
      updateData.name = name;
    };

    if (fieldPermissions?.projectId?.show && !fieldPermissions?.projectId?.read) {
      updateData.projectId = projectId;
    };

    if (fieldPermissions?.type?.show && !fieldPermissions?.type?.read) {
      updateData.type = selectedProjectType;
    };

    if (fieldPermissions?.customer?.show && !fieldPermissions?.customer?.read) {
      updateData.customer = selectedCustomer;
    };

    if (fieldPermissions?.category?.show && !fieldPermissions?.category?.read) {
      updateData.category = selectedProjectCategory;
    };

    if (fieldPermissions?.timing?.show && !fieldPermissions?.timing?.read) {
      updateData.timing = selectedProjectTiming;
    };

    if (fieldPermissions?.price?.show && !fieldPermissions?.price?.read) {
      updateData.price = price;
    };

    if (fieldPermissions?.responsible?.show && !fieldPermissions?.responsible?.read) {
      updateData.responsible = selectedResponsible;
    };

    if (fieldPermissions?.leader?.show && !fieldPermissions?.leader?.read) {
      updateData.leader = selectedLeader;
    };

    if (fieldPermissions?.start?.show && !fieldPermissions?.start?.read) {
      updateData.start = start;
    };

    if (fieldPermissions?.due?.show && !fieldPermissions?.due?.read) {
      updateData.due = due;
    };

    if (fieldPermissions?.priority?.show && !fieldPermissions?.priority?.read) {
      updateData.priority = priority;
    };

    if (fieldPermissions?.status?.show && !fieldPermissions?.status?.read) {
      updateData.status = selectedProjectStatus;
    };

    if (fieldPermissions?.description?.show && !fieldPermissions?.description?.read) {
      updateData.description = description;
    };

    try {
      const response = await axios.put(`/api/v1/project/update-project/${id}`, updateData, {
        headers: {
          Authorization: `${validToken}`,
        },
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
        navigate(-1);
      };
    } catch (error) {
      console.log("Error while updating project:", error.message);
      toast.error("Error while updating project");
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

  if (!permissions?.update) {
    return <Navigate to="/" />;
  };

  return (
    <>
      <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
        <div className="content">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Edit Project</h4>
            <Link to="#" onClick={() => navigate(-1)}><button className="btn btn-primary">Back</button></Link>
          </div>
          <div className="row">
            {
              (fieldPermissions?.name?.show) && (
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor="name">Project Name <span className="text-danger">*</span></label>
                    <input type="text" className={`form-control ${fieldPermissions?.name?.read ? "readonly-style" : ""}`} name="name" id="name" value={name} onChange={(e) => fieldPermissions?.name?.read ? null : setName(e.target.value)} />
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.projectId?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor="projectId">Project ID<span className="text-danger"> *</span></label>
                    <input type="text" className={`form-control ${fieldPermissions?.projectId?.read ? "readonly-style" : ""}`} name="projectId" id="projectId" value={projectId} onChange={(e) => fieldPermissions?.projectId?.read ? null : setProjectId(e.target.value)} />
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.type?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Project Type <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.type?.read ? "readonly-style" : ""}`} name="type" value={selectedProjectType} onChange={(e) => fieldPermissions?.type?.read ? null : setSelectedProjectType(e.target.value)}>
                      <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                      {
                        projectType?.map((p) => (
                          <option key={p?._id} value={p?._id} >{p?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.customer?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Customer <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.customer?.read ? "readonly-style" : ""}`} name="customer" value={selectedCustomer} onChange={(e) => fieldPermissions?.customer?.read ? null : setSelectedCustomer(e.target.value)} >
                      <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                      {
                        customer?.map((c) => (
                          <option key={c?._id} value={c?._id}>{c?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.category?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Category <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.category?.read ? "readonly-style" : ""}`} name="category" value={selectedProjectCategory} onChange={(e) => fieldPermissions?.category?.read ? null : setSelectedProjectCategory(e.target.value)} >
                      <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                      {
                        projectCategory?.map((p) => (
                          <option key={p?._id} value={p?._id}>{p?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.timing?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Project Timing  <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.timing?.read ? "readonly-style" : ""}`} name="timing" value={selectedProjectTiming} onChange={(e) => fieldPermissions?.timing?.read ? null : setSelectedProjectTiming(e.target.value)} >
                      <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                      {
                        projectTiming?.map((p) => (
                          <option key={p?._id} value={p?._id}>{p?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.price?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor="price">Price <span className="text-danger">*</span></label>
                    <input className={`form-control ${fieldPermissions?.price?.read ? "readonly-style" : ""}`} type="text" name="price" id="price" value={price} onChange={(e) => fieldPermissions?.price?.read ? null : setPrice(e.target.value)} />
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.priority?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Priority <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.priority?.read ? "readonly-style" : ""}`} name="status" value={priority} onChange={(e) => fieldPermissions?.priority?.read ? null : setPriority(e.target.value)} >
                      <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.status?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Status <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.status?.read ? "readonly-style" : ""}`} name="status" value={selectedProjectStatus} onChange={(e) => fieldPermissions?.status?.read ? null : setSelectedProjectStatus(e.target.value)} >
                      <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                      {
                        projectStatus?.map((p) => (
                          <option key={p?._id} value={p?._id}>{p?.status}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.responsible?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Responsible Persons <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.responsible?.read ? "readonly-style" : ""}`} name="responsible" value="" onChange={(e) => fieldPermissions?.responsible?.read ? null : handleSelectChangeResponsible(e)}>
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
                            {(fieldPermissions?.responsible?.read) ? (null) : (<button type="button" className="remove-btn" onClick={() => fieldPermissions?.responsible?.read ? null : handleRemoveResponsible(responsible)}>{"x"}</button>)}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.leader?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label">Team Leader  <span className="text-danger">*</span></label>
                    <select className={`form-select ${fieldPermissions?.leader?.read ? "readonly-style" : ""}`} name="leader" value="" onChange={(e) => fieldPermissions?.leader?.read ? null : handleSelectChangeLeader(e)}>
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
                            {(fieldPermissions?.leader?.read) ? (null) : (<button type="button" className="remove-btn" onClick={() => fieldPermissions?.leader?.read ? null : handleRemoveLeader(leader)}>{"x"}</button>)}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.start?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor="start">Start Date <span className="text-danger">*</span></label>
                    <input type="text" className={`form-control ${fieldPermissions?.start?.read ? "readonly-style" : ""}`} name="start" id="start" value={start} onChange={(e) => fieldPermissions?.start?.read ? null : setStart(e.target.value)} />
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.due?.show) && (
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor="due">Due Date <span className="text-danger">*</span></label>
                    <input type="text" className={`form-control ${fieldPermissions?.due?.read ? "readonly-style" : ""}`} name="due" id="due" value={due} onChange={(e) => fieldPermissions?.due?.read ? null : setDue(e.target.value)} />
                  </div>
                </div>
              )
            }
            {
              (fieldPermissions?.description?.show) && (
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label className="col-form-label" htmlFor="description">
                      Description <span className="text-danger">*</span>
                    </label>
                    <ReactQuill
                      className={`custom-quill-editor ${fieldPermissions?.description?.read ? "readonly-style" : ""}`}
                      value={description}
                      name="description"
                      id="description"
                      readOnly={fieldPermissions?.description?.read}
                      onChange={(content) => fieldPermissions?.description?.read ? null : setDescription(content)}
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
                        'link', 'image', 'video',
                      ]}
                      placeholder="Write the description here..."
                    />
                  </div>
                </div>
              )
            }
          </div>
          <div className="submit-button text-end">
            <Link to="#" onClick={() => navigate(-1)} className="btn btn-light">Cancel</Link>
            <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProject;
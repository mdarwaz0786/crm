/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";

const EditTeamMember = () => {
  const [data, setData] = useState([]);
  const [existingUserName, setExistingUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [joining, setJoining] = useState("");
  const [dob, setDob] = useState("");
  const [designation, setDesignation] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reportingTo, setReportingTo] = useState([]);
  const [selectedReportingTo, setSelectedReportingTo] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, team, isLoading } = useAuth();
  const fieldPermissions = team?.role?.permissions?.team?.fields;
  const permissions = team?.role?.permissions?.team;

  const fetchAllTeamMember = async () => {
    try {
      const response = await axios.get("/api/v1/team/all-team", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setReportingTo(response?.data?.team);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  const fetchAllDesignation = async () => {
    try {
      const response = await axios.get("/api/v1/designation/all-designation", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setDesignation(response?.data?.designation);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  const fetchAllRole = async () => {
    try {
      const response = await axios.get("/api/v1/role/all-role", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setRole(response?.data?.role);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.update) {
      fetchAllTeamMember();
      fetchAllDesignation();
      fetchAllRole();
    };
  }, [isLoading, team, permissions]);

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/team/single-team/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName(response?.data?.team?.name);
        setEmail(response?.data?.team?.email);
        setMobile(response?.data?.team?.mobile);
        setJoining(response?.data?.team?.joining);
        setDob(response?.data?.team?.dob);
        setSelectedDesignation(response?.data?.team?.designation?._id);
        setUsername(response?.data?.team?.username);
        setExistingUserName(response?.data?.team?.username);
        setPassword(response?.data?.team?.password);
        setSelectedRole(response?.data?.team?.role?._id);
        setSelectedReportingTo(response?.data?.team?.reportingTo?.map((r) => r?._id));
      };
    } catch (error) {
      console.log("Error while fetching single team:", error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.update && id) {
      fetchSingleData(id);
    };
  }, [id, isLoading, team, permissions]);

  const fetchAllData = async () => {
    try {
      const response = await axios.get("/api/v1/team/all-team", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setData(response?.data?.team);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.update) {
      fetchAllData();
    };
  }, [isLoading, team, permissions]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Create update object
    const updateData = {};

    // Conditionally include fields based on permissions
    if (fieldPermissions?.name?.show && !fieldPermissions?.name?.read) {
      updateData.name = name;
    };

    if (fieldPermissions?.email?.show && !fieldPermissions?.email?.read) {
      updateData.email = email;
    };

    if (fieldPermissions?.mobile?.show && !fieldPermissions?.mobile?.read) {
      updateData.mobile = mobile;
    };

    if (fieldPermissions?.joining?.show && !fieldPermissions?.joining?.read) {
      updateData.joining = joining;
    };

    if (fieldPermissions?.dob?.show && !fieldPermissions?.dob?.read) {
      updateData.dob = dob;
    };

    if (fieldPermissions?.designation?.show && !fieldPermissions?.designation?.read) {
      updateData.designation = selectedDesignation;
    };

    if (fieldPermissions?.username?.show && !fieldPermissions?.username?.read) {
      updateData.username = username;
    };

    if (fieldPermissions?.password?.show && !fieldPermissions?.password?.read) {
      updateData.password = password;
    };

    if (fieldPermissions?.reportingTo?.show && !fieldPermissions?.reportingTo?.read) {
      updateData.reportingTo = selectedReportingTo;
    };

    if (fieldPermissions?.role?.show && !fieldPermissions?.role?.read) {
      updateData.role = selectedRole;
    };

    try {
      const response = await axios.put(`/api/v1/team/update-team/${id}`, updateData, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName("");
        setEmail("");
        setMobile("");
        setJoining("");
        setDob("");
        setSelectedRole("");
        setSelectedDesignation("");
        setSelectedReportingTo([]);
        toast.success("Updated successfully");
        navigate(-1);
      };
    } catch (error) {
      console.log("Error while updating team member:", error.message);
      toast.error("Error while updating");
    };
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value && !selectedReportingTo?.includes(value)) {
      setSelectedReportingTo([...selectedReportingTo, value]);
    };
  };

  const handleRemove = (value) => {
    setSelectedReportingTo(selectedReportingTo?.filter((item) => item !== value));
  };

  if (isLoading) {
    return <Preloader />;
  };

  if (!permissions?.update) {
    return <Navigate to="/" />;
  };

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Team Member</h4>
          <Link to="#" onClick={() => navigate(-1)}><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          {
            (fieldPermissions?.name?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.name?.read ? "readonly-style" : ""}`} placeholder="Enter Name" name="name" id="name" value={name} onChange={(e) => fieldPermissions?.name?.read ? null : setName(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.email?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
                  <input type="email" className={`form-control ${fieldPermissions?.email?.read ? "readonly-style" : ""}`} placeholder="Enter Email" name="email" id="email" value={email} onChange={(e) => fieldPermissions?.email?.read ? null : setEmail(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.mobile?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.mobile?.read ? "readonly-style" : ""}`} placeholder="Enter Mobile Number" name="mobile" id="mobile" value={mobile} onChange={(e) => fieldPermissions?.mobile?.read ? null : setMobile(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.joining?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="joining">Joining Date <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.joining?.read ? "readonly-style" : ""}`} name="joining" id="joining" value={joining} onChange={(e) => fieldPermissions?.joining?.read ? null : setJoining(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.dob?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="dob">Date of Birth <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.dob?.read ? "readonly-style" : ""}`} name="dob" id="dob" value={dob} onChange={(e) => fieldPermissions?.dob?.read ? null : setDob(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.designation?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label">Designation <span className="text-danger">*</span></label>
                  <select className={`form-select ${fieldPermissions?.designation?.read ? "readonly-style" : ""}`} name="designation" value={selectedDesignation} onChange={(e) => fieldPermissions?.designation?.read ? null : setSelectedDesignation(e.target.value)} >
                    <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                    {
                      designation?.map((d) => (
                        <option key={d?._id} value={d?._id}>{d?.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.username?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="username">User Name <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.username?.read ? "readonly-style" : ""}`} name="username" id="username" value={username} onChange={(e) => fieldPermissions?.username?.read ? null : setUsername(e.target.value)} />
                  {
                    username === "" ? null : (
                      data?.some((d) => d?.username === username) && username !== existingUserName ? (
                        <div className="col-form-label" style={{ color: "red" }}>
                          Not Available <i className="fas fa-times"></i>
                        </div>
                      ) : (
                        <div className="col-form-label" style={{ color: "green" }}>
                          Available <i className="fas fa-check"></i>
                        </div>
                      )
                    )
                  }
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.password?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="password">Password<span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${fieldPermissions?.password?.read ? "readonly-style" : ""}`} name="password" id="password" value={password} onChange={(e) => fieldPermissions?.password?.read ? null : setPassword(e.target.value)} />
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.reportingTo?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label">Reporting To <span className="text-danger">*</span></label>
                  <select className={`form-select ${fieldPermissions?.reportingTo?.read ? "readonly-style" : ""}`} name="leader" value="" onChange={(e) => fieldPermissions?.reportingTo?.read ? null : handleSelectChange(e)} >
                    <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                    {
                      reportingTo?.filter((r) => !selectedReportingTo.includes(r?._id)).map((r) => (
                        <option key={r?._id} value={r?._id}>{r?.name}</option>
                      ))
                    }
                  </select>
                  <div className="selected-container">
                    {
                      selectedReportingTo?.map((reporting, index) => (
                        <span key={index} className="selected-item">
                          {reportingTo?.find((r) => r?._id === reporting)?.name}
                          {(fieldPermissions?.reportingTo?.read) ? (null) : (<button type="button" className="remove-btn" onClick={() => fieldPermissions?.reportingTo?.read ? null : handleRemove(reporting)} >{"x"}</button>)}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
            )
          }
          {
            (fieldPermissions?.role?.show) && (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label">Role <span className="text-danger">*</span></label>
                  <select className={`form-select ${fieldPermissions?.role?.read ? "readonly-style" : ""}`} name="role" value={selectedRole} onChange={(e) => fieldPermissions?.role?.read ? null : setSelectedRole(e.target.value)} >
                    <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                    {
                      role?.map((r) => (
                        <option key={r?._id} value={r?._id}>{r?.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            )
          }
        </div>
        <div className="submit-button text-end">
          <Link to="#" onClick={() => navigate(-1)} className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMember;
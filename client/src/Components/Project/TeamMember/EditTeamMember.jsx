/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";

const EditTeamMember = () => {
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

  const fetchAllTeamMember = async () => {
    try {
      const response = await axios.get("/api/v1/team/all-team", {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setReportingTo(response?.data?.team);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllDesignation = async () => {
    try {
      const response = await axios.get("/api/v1/designation/all-designation");
      if (response?.data?.success) {
        setDesignation(response?.data?.designation);
      }
    } catch (error) {
      console.log(error.message);
    }
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllTeamMember();
    fetchAllDesignation();
    fetchAllRole();
  }, []);

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
        setPassword(response?.data?.team?.password);
        setSelectedRole(response?.data?.team?.role?._id);
        setSelectedReportingTo(response?.data?.team?.reportingTo?.map((r) => r?._id));
      }
    } catch (error) {
      console.log("Error while fetching single team:", error.message);
    }
  };

  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

  const permissions = team?.role?.permissions?.team;
  const fieldPermissions = team?.role?.permissions?.team?.fields;

  // Create update object
  const updateData = {};

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Conditionally include fields based on permissions
    if (fieldPermissions?.name?.show && !fieldPermissions?.name?.read) {
      updateData.name = name;
    }

    if (fieldPermissions?.email?.show && !fieldPermissions?.email?.read) {
      updateData.email = email;
    }

    if (fieldPermissions?.mobile?.show && !fieldPermissions?.mobile?.read) {
      updateData.mobile = mobile;
    }

    if (fieldPermissions?.joining?.show && !fieldPermissions?.joining?.read) {
      updateData.joining = joining;
    }

    if (fieldPermissions?.dob?.show && !fieldPermissions?.dob?.read) {
      updateData.dob = dob;
    }

    if (fieldPermissions?.role?.show && !fieldPermissions?.role?.read) {
      updateData.role = selectedRole;
    }

    if (fieldPermissions?.designation?.show && !fieldPermissions?.designation?.read) {
      updateData.designation = selectedDesignation;
    }

    if (fieldPermissions?.reportingTo?.show && !fieldPermissions?.reportingTo?.read) {
      updateData.reportingTo = selectedReportingTo;
    }

    e.preventDefault();
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
        toast.success("Team member updated successfully");
        navigate("/team-member");
      }
    } catch (error) {
      console.log("Error while updating team member:", error.message);
      toast.error("Error while updating team member");
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value && !selectedReportingTo?.includes(value)) {
      setSelectedReportingTo([...selectedReportingTo, value]);
    }
  };

  const handleRemove = (value) => {
    setSelectedReportingTo(selectedReportingTo?.filter((item) => item !== value));
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!permissions?.update) {
    return <Navigate to="/team-member" />;
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Team Member</h4>
          <Link to="/team-member"><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          {
            (fieldPermissions?.name?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Enter Name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required readOnly={fieldPermissions?.name?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.email?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" placeholder="Enter Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required readOnly={fieldPermissions?.email?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.mobile?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Enter Mobile Number" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required readOnly={fieldPermissions?.mobile?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.joining?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="joining">Joining Date <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="joining" id="joining" value={joining} onChange={(e) => setJoining(e.target.value)} required readOnly={fieldPermissions?.joining?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.dob?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="dob">Date of Birth <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required readOnly={fieldPermissions?.dob?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.designation?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label">Designation <span className="text-danger">*</span></label>
                  <select className="form-select" name="designation" value={selectedDesignation} onChange={(e) => setSelectedDesignation(e.target.value)} disabled={fieldPermissions?.designation?.read}>
                    <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                    {
                      designation?.map((d) => (
                        <option key={d?._id} value={d?._id}>{d?.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.username?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="username">User Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required readOnly={fieldPermissions?.username?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.password?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label" htmlFor="password">Password<span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required readOnly={fieldPermissions?.password?.read} />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.reportingTo?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label">Reporting To <span className="text-danger">*</span></label>
                  <select className="form-select" name="leader" value="" onChange={handleSelectChange} disabled={fieldPermissions?.reportingTo?.read}>
                    <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                    {
                      reportingTo?.map((r) => (
                        <option key={r?._id} value={r?._id}>{r?.name}</option>
                      ))
                    }
                  </select>
                  <div className="selected-container">
                    {
                      selectedReportingTo?.map((reporting, index) => (
                        <span key={index} className="selected-item">
                          {reportingTo?.find((r) => r?._id === reporting)?.name}
                          <button type="button" className="remove-btn" onClick={() => handleRemove(reporting)} disabled={fieldPermissions?.reportingTo?.read}>{"x"}</button>
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.role?.show) ? (
              <div className="col-md-6">
                <div className="form-wrap">
                  <label className="col-form-label">Role <span className="text-danger">*</span></label>
                  <select className="form-select" name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} disabled={fieldPermissions?.role?.read}>
                    <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                    {
                      role?.map((r) => (
                        <option key={r?._id} value={r?._id}>{r?.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            ) : (
              null
            )
          }
        </div>
        <div className="submit-button text-end">
          <Link to="/team-member" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMember;
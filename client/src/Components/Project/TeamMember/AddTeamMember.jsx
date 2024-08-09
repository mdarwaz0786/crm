/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";

const AddTeamMember = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [joining, setJoining] = useState("");
  const [dob, setDob] = useState("");
  const [designation, setDesignation] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [reportingTo, setReportingTo] = useState([]);
  const [selectedReportingTo, setSelectedReportingTo] = useState([]);
  const navigate = useNavigate();
  const { validToken, team, isLoading } = useAuth();
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
    if (!isLoading && team && permissions?.create) {
      fetchAllTeamMember();
      fetchAllDesignation();
      fetchAllRole();
    };
  }, [isLoading, team, permissions]);

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedJoining = formatDateToDDMMYYYY(joining);
  const formattedDob = formatDateToDDMMYYYY(dob);

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
    if (!isLoading && team && permissions?.create) {
      fetchAllData();
    };
  }, [isLoading, team, permissions]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {

      // Validation
      if (!name) {
        return toast.error("Enter name");
      };

      if (!email) {
        return toast.error("Enter email");
      };

      if (!username) {
        return toast.error("Enter username");
      };

      if (!password) {
        return toast.error("Enter password");
      };

      if (!mobile) {
        return toast.error("Enter mobile number");
      };

      if (!joining) {
        return toast.error("Enter joining date");
      };

      if (!dob) {
        return toast.error("Enter date of birth");
      };

      if (!selectedDesignation) {
        return toast.error("Select designation");
      };

      if (!selectedRole) {
        return toast.error("Select role");
      };

      const response = await axios.post("/api/v1/team/create-team", { name, email, username, password, mobile, joining: formattedJoining, dob: formattedDob, role: selectedRole, designation: selectedDesignation, reportingTo: selectedReportingTo }, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setMobile("");
        setJoining("");
        setDob("");
        setSelectedDesignation("");
        setSelectedRole("");
        setSelectedReportingTo([]);
        toast.success("created successfully");
        navigate(-1);
      };
    } catch (error) {
      console.log("Error while creating team member:", error.message);
      toast.error("Error while creating");
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

  if (!permissions?.create) {
    return <Navigate to="/" />;
  };

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add Team Member</h4>
          <Link to="#" onClick={() => navigate(-1)}><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
              <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label">Designation <span className="text-danger">*</span></label>
              <select className="form-select" name="designation" value={selectedDesignation} onChange={(e) => setSelectedDesignation(e.target.value)}>
                <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                {
                  designation?.map((d) => (
                    <option key={d?._id} value={d?._id}>{d?.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="username">Username <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              {
                username === "" ? null : (
                  data?.some((d) => d?.username === username) ? (
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
              <label className="col-form-label" htmlFor="password">Password<span className="text-danger">*</span></label>
              <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="joining">Joining Date <span className="text-danger">*</span></label>
              <input type="date" className="form-control" name="joining" id="joining" value={joining} onChange={(e) => setJoining(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="dob">Date of Birth <span className="text-danger">*</span></label>
              <input type="date" className="form-control" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label">Reporting To <span className="text-danger">*</span></label>
              <select className="form-select" name="leader" value="" onChange={handleSelectChange}>
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
                      <button type="button" className="remove-btn" onClick={() => handleRemove(reporting)}>{"x"}</button>
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label">Role <span className="text-danger">*</span></label>
              <select className="form-select" name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="" style={{ color: "rgb(120, 120, 120)" }}>Select</option>
                {
                  role?.map((r) => (
                    <option key={r?._id} value={r?._id}>{r?.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div className="submit-button text-end">
          <Link to="#" onClick={() => navigate(-1)} className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleCreate(e)}>Create</Link>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
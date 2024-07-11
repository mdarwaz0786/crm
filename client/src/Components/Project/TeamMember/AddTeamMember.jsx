/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Preloader from "../../../Preloader.jsx";


const AddTeamMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [joining, setJoining] = useState("");
  const [dob, setDob] = useState("");
  const [designation, setDesignation] = useState("");
  const [reportingTo, setReportingTo] = useState([]);
  const [selectedReportingTo, setSelectedReportingTo] = useState([]);
  const navigate = useNavigate();
  const { validToken, user, isLoading } = useAuth();

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

  useEffect(() => {
    fetchAllTeamMember();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        return toast.error("Enter name");
      }
      if (!email) {
        return toast.error("Enter email");
      }
      if (!username) {
        return toast.error("Enter username");
      }
      if (!password) {
        return toast.error("Enter password");
      }
      if (!mobile) {
        return toast.error("Enter mobile number");
      }
      if (!joining) {
        return toast.error("Enter joining date");
      }
      if (!dob) {
        return toast.error("Enter date of birth");
      }
      if (!designation) {
        return toast.error("Enter designation");
      }

      const response = await axios.post("/api/v1/team/create-team", { name, email, username, password, mobile, joining, dob, designation, reportingTo: selectedReportingTo }, {
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
        setDesignation("");
        setReportingTo("");
        toast.success("Team member created successfully");
        navigate("/team-member");
      }
    } catch (error) {
      console.log("Error while creating team:", error.message);
      toast.error("Error while creating team");
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

  if (!user?.role?.permissions?.team?.create) {
    return <Navigate to="/team-member" />;
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add Team Member</h4>
          <Link to="/team-member"><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
              <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="desination">Designation <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="desination" id="desination" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="username">User Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="password">Password<span className="text-danger">*</span></label>
              <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="joining">Joining Date <span className="text-danger">*</span></label>
              <input type="date" className="form-control" name="joining" id="joining" value={joining} onChange={(e) => setJoining(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="dob">Date of Birth <span className="text-danger">*</span></label>
              <input type="date" className="form-control" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label">Reporting To <span className="text-danger">*</span></label>
              <select className="form-select" name="leader" value="" onChange={handleSelectChange}>
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
                      <button type="button" className="remove-btn" onClick={() => handleRemove(reporting)}>{"x"}</button>
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="submit-button text-end">
          <Link to="/team-member" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleCreate(e)}>Create</Link>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
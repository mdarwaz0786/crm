/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";


const EditTeamMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [joining, setJoining] = useState("");
  const [dob, setDob] = useState("");
  const [designation, setDesignation] = useState("");
  const [reportingTo, setReportingTo] = useState([]);
  const [selectedReportingTo, setSelectedReportingTo] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken } = useAuth();

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

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/team/single-team/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      setName(response?.data?.team?.name);
      setEmail(response?.data?.team?.email);
      setMobile(response?.data?.team?.mobile);
      setJoining(response?.data?.team?.joining);
      setDob(response?.data?.team?.dob);
      setDesignation(response?.data?.team?.designation);
      setSelectedReportingTo(response?.data?.team?.reportingTo?.map((r) => r?._id));
    } catch (error) {
      console.log("Error while fetching single team:", error.message);
    }
  };

  useEffect(() => {
    fetchSingleData(id);
  }, [id])

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      if (!name) {
        return toast.error("Enter name");
      }
      if (!email) {
        return toast.error("Enter email");
      }
      if (!mobile) {
        return toast.error("Enter mobile");
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

      const response = await axios.put(`/api/v1/team/update-team/${id}`, { name, email, mobile, joining, dob, designation, reportingTo: selectedReportingTo }, {
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
        setDesignation("");
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

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Team Member</h4>
          <Link to="/team-member"><button className="btn btn-primary">Back</button></Link>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Enter Name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
              <input type="email" className="form-control" placeholder="Enter Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
              <input className="form-control" placeholder="Enter Mobile Number" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
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
          <div className="col-md-6">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="desination">Designation <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Enter Designation" name="desination" id="desination" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
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
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMember;
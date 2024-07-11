/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../context/authContext.jsx";
import Preloader from "../../Preloader.jsx";

const EditUser = () => {
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken, user, isLoading } = useAuth();

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`/api/v1/user/single-user/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      setName(response?.data?.user?.name);
      setEmail(response?.data?.user?.email);
      setMobile(response?.data?.user?.mobile);
      setPassword(response?.data?.user?.password);
      setSelectedRole(response?.data?.user?.role?._id);
    } catch (error) {
      console.log("Error while fetching single user:", error.message);
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
      console.log("Error while fetching role:", error.message);
    }
  };

  useEffect(() => {
    fetchAllRole();
  }, []);

  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

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
      if (!password) {
        return toast.error("Enter password");
      }
      if (!selectedRole) {
        return toast.error("Enter role");
      }

      const response = await axios.put(`/api/v1/user/update-user/${id}`, { name, email, mobile, password, role: selectedRole }, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setSelectedRole("");
        toast.success("User updated successfully");
        navigate("/user");
      }
    } catch (error) {
      console.log("Error while updating user:", error.message);
      toast.error("Error while updating user");
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!user?.role?.permissions?.user?.update) {
    return <Navigate to="/user" />;
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit User</h4>
          <Link to="/user"><button className="btn btn-primary">Back</button></Link>
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
              <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
              <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-wrap">
              <label className="col-form-label" htmlFor="password">Password <span className="text-danger">*</span></label>
              <input className="form-control" rows={6} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-12">
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
          <Link to="/user" className="btn btn-light sidebar-close">Cancel</Link>
          <Link to="#" className="btn btn-primary" onClick={(e) => handleUpdate(e, id)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import axios from "axios";
import { toast } from 'react-toastify';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleRegisteration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/register-user", { name, email, password, mobile });
      if (response?.data?.success) {
        storeToken(response?.data?.token);
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        toast.success("Registration successful");
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.log("error while registering user:", error.message);
      toast.error("Error while registration");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper account-bg register-bg">
          <div className="login-content">
            <div className="login-user-info">
              <div className="login-logo">
                <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
              </div>
              <div className="login-heading">
                <h4>Register</h4>
                <p>Create new CRMS account</p>
              </div>
              <div className="form-wrap">
                <label className="col-form-label">Name <span className="text-danger">*</span></label>
                <div className="form-wrap-icon">
                  <input type="text" className="form-control" name="name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                  <i className="ti ti-user" />
                </div>
              </div>
              <div className="form-wrap">
                <label className="col-form-label">Email Address <span className="text-danger">*</span></label>
                <div className="form-wrap-icon">
                  <input type="email" className="form-control" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                  <i className="ti ti-mail" />
                </div>
              </div>
              <div className="form-wrap">
                <label className="col-form-label">Mobile Number <span className="text-danger">*</span></label>
                <div className="form-wrap-icon">
                  <input type="text" className="form-control" name="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} required />
                  <i className="ti ti-phone" />
                </div>
              </div>
              <div className="form-wrap">
                <label className="col-form-label">Password <span className="text-danger">*</span></label>
                <div className="pass-group">
                  <input type="password" className="pass-input form-control" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                </div>
              </div>
              <div className="form-wrap">
                <button type="submit" className="btn btn-primary" onClick={(e) => handleRegisteration(e)}>Sign Up</button>
              </div>
              <div className="login-form">
                <h6>Already have an account?<Link to="/login" className="hover-a"> Sign In Instead</Link></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
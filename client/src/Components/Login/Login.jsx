import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/login-user", { email, password });
      if (response?.data?.success) {
        storeToken(response?.data?.token);
        setEmail("");
        setPassword("");
        toast.success("Login successful");
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.log("error while login user:", error.message);
      toast.error("Error while login user");
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
                <h4>Sign In</h4>
                <p>Access the CRMS panel using your email and passcode.</p>
              </div>
              <div className="form-wrap">
                <label className="col-form-label">Email Address <span className="text-danger">*</span></label>
                <div className="form-wrap-icon">
                  <input type="text" className="form-control" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                  <i className="ti ti-mail" />
                </div>
              </div>
              <div className="form-wrap">
                <label className="col-form-label">Password <span className="text-danger">*</span></label>
                <div className="pass-group">
                  <input type="password" className="pass-input form-control" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                </div>
              </div>
              <div className="form-wrap">
                <button type="submit" className="btn btn-primary" onClick={(e) => handleLogin(e)}>Sign In</button>
              </div>
              <div className="login-form">
                <h6>New on our platform?<Link to="/signup" className="hover-a"> Create an account</Link></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
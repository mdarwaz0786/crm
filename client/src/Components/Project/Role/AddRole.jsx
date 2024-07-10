import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";

const AddRole = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    customer: { access: false, create: false, read: false, update: false, delete: false },
    team: { access: false, create: false, read: false, update: false, delete: false },
    role: { access: false, create: false, read: false, update: false, delete: false },
    projectType: { access: false, create: false, read: false, update: false, delete: false },
    projectStatus: { access: false, create: false, read: false, update: false, delete: false },
    projectCayegory: { access: false, create: false, read: false, update: false, delete: false },
    projectTiming: { access: false, create: false, read: false, update: false, delete: false },
    project: { access: false, create: false, read: false, update: false, delete: false },
    user: { access: false, create: false, read: false, update: false, delete: false },
  });

  const { validToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, checked, type } = e.target;
    const [master, permission] = name.split('.');
    if (type === 'checkbox') {
      setPermissions((prevPermissions) => ({
        ...prevPermissions,
        [master]: {
          ...prevPermissions[master],
          [permission]: checked,
        },
      }));
    } else {
      setName(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Enter name");
    }
    if (!permissions) {
      return toast.error("Enter permission");
    }

    try {
      const response = await axios.post("/api/v1/role/create-role", { name, permissions }, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName("");
        setPermissions({
          customer: { access: false, create: false, read: false, update: false, delete: false },
          team: { access: false, create: false, read: false, update: false, delete: false },
          role: { access: false, create: false, read: false, update: false, delete: false },
          projectType: { access: false, create: false, read: false, update: false, delete: false },
          projectStatus: { access: false, create: false, read: false, update: false, delete: false },
          projectCayegory: { access: false, create: false, read: false, update: false, delete: false },
          projectTiming: { access: false, create: false, read: false, update: false, delete: false },
          project: { access: false, create: false, read: false, update: false, delete: false },
          user: { access: false, create: false, read: false, update: false, delete: false },
        });
        toast.success("Role created successfully");
        navigate("/role");
      }
    } catch (error) {
      console.error('Error while creating role:', error.message);
      toast.error("Error while creating role");
    }
  };

  const permissionLabels = {
    customer: "Customer",
    team: "Team Member",
    role: "Role",
    projectType: "Project Type",
    projectStatus: "Project Status",
    projectCategory: "Project Category",
    projectTiming: "Project Timing",
    project: "Projects",
    user: "Users",
  };

  console.log(permissions);

  return (
    <div className="page-wrapper custom-role" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Add Role</h3>
          <Link to="/role"><button className="btn btn-primary">Back</button></Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-form-label" htmlFor="name" style={{ fontSize: "1.1rem" }}>Name <span className="text-danger">*</span></label>
                <input type="text" style={{ fontSize: "1rem" }} className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="row">
            {
              Object.keys(permissionLabels).map((master) => (
                <div className="col-md-4 mb-3" key={master}>
                  <div className="form-group">
                    <div className="d-flex align-items-center mb-2">
                      <label className="col-form-label mr-2">{permissionLabels[master]} :</label>
                      <input
                        type="checkbox"
                        className="form-check-input ml-2"
                        id={`${master}.access`}
                        name={`${master}.access`}
                        checked={permissions[master]?.access || false}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`${master}.access`} style={{ marginLeft: '5px' }}>Access</label>
                    </div>
                    {
                      ['create', 'read', 'update', 'delete'].map((action) => (
                        <div className="form-check" key={`${master}-${action}`}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${master}.${action}`}
                            name={`${master}.${action}`}
                            checked={permissions[master]?.[action] || false}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor={`${master}.${action}`}>{action.charAt(0).toUpperCase() + action.slice(1)}</label>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
          <div className="submit-button text-end">
            <Link to="/role" className="btn btn-light sidebar-close">Cancel</Link>
            <button className="btn btn-primary" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;

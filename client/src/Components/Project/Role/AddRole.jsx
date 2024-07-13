import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from "../../../context/authContext.jsx";
// import Preloader from "../../../Preloader.jsx";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddRole = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    customer: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        email: { update: false, read: false, show: false },
        mobile: { update: false, read: false, show: false },
        address: { update: false, read: false, show: false },
      },
    },
    team: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        email: { update: false, read: false, show: false },
        mobile: { update: false, read: false, show: false },
        username: { update: false, read: false, show: false },
        password: { update: false, read: false, show: false },
        joining: { update: false, read: false, show: false },
        dob: { update: false, read: false, show: false },
        designation: { update: false, read: false, show: false },
        reportingTo: { update: false, read: false, show: false },
      },
    },
    role: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        customer: { update: false, read: false, show: false },
        team: { update: false, read: false, show: false },
        role: { update: false, read: false, show: false },
        projectType: { update: false, read: false, show: false },
        projectStatus: { update: false, read: false, show: false },
        projectCategory: { update: false, read: false, show: false },
        projectTiming: { update: false, read: false, show: false },
        project: { update: false, read: false, show: false },
        Designation: { update: false, read: false, show: false },
      },
    },
    projectType: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        description: { update: false, read: false, show: false },
      },
    },
    projectStatus: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        status: { update: false, read: false, show: false },
        description: { update: false, read: false, show: false },
      },
    },
    projectCategory: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        description: { update: false, read: false, show: false },
      },
    },
    projectTiming: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        description: { update: false, read: false, show: false },
      },
    },
    project: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        projectId: { update: false, read: false, show: false },
        type: { update: false, read: false, show: false },
        customer: { update: false, read: false, show: false },
        category: { update: false, read: false, show: false },
        timing: { update: false, read: false, show: false },
        price: { update: false, read: false, show: false },
        responsible: { update: false, read: false, show: false },
        leader: { update: false, read: false, show: false },
        start: { update: false, read: false, show: false },
        due: { update: false, read: false, show: false },
        priority: { update: false, read: false, show: false },
        status: { update: false, read: false, show: false },
        description: { update: false, read: false, show: false },
      },
    },
    Designation: {
      access: false,
      export: false,
      create: false,
      delete: false,
      fields: {
        name: { update: false, read: false, show: false },
        description: { update: false, read: false, show: false },
      },
    },
  });

  const [selectedMaster, setSelectedMaster] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const { validToken, user, isLoading } = useAuth();
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

  const handleFieldPermissionChange = (e) => {
    const { name, checked } = e.target;
    const [field, permission] = name.split('.');
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [selectedMaster]: {
        ...prevPermissions[selectedMaster],
        fields: {
          ...prevPermissions[selectedMaster]?.fields,
          [field]: {
            ...prevPermissions[selectedMaster]?.fields?.[field],
            [permission]: checked,
          },
        },
      },
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Enter name");
    }

    try {
      const response = await axios.post("/api/v1/role/create-role", { name, permissions });
      if (response?.data?.success) {
        setName("");
        setPermissions({
          customer: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              email: { update: false, read: false, show: false },
              mobile: { update: false, read: false, show: false },
              address: { update: false, read: false, show: false },
            },
          },
          team: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              email: { update: false, read: false, show: false },
              mobile: { update: false, read: false, show: false },
              username: { update: false, read: false, show: false },
              password: { update: false, read: false, show: false },
              joining: { update: false, read: false, show: false },
              dob: { update: false, read: false, show: false },
              designation: { update: false, read: false, show: false },
              reportingTo: { update: false, read: false, show: false },
            },
          },
          role: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              customer: { update: false, read: false, show: false },
              team: { update: false, read: false, show: false },
              role: { update: false, read: false, show: false },
              projectType: { update: false, read: false, show: false },
              projectStatus: { update: false, read: false, show: false },
              projectCategory: { update: false, read: false, show: false },
              projectTiming: { update: false, read: false, show: false },
              project: { update: false, read: false, show: false },
              Designation: { update: false, read: false, show: false },
            },
          },
          projectType: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              description: { update: false, read: false, show: false },
            },
          },
          projectStatus: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              status: { update: false, read: false, show: false },
              description: { update: false, read: false, show: false },
            },
          },
          projectCategory: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              description: { update: false, read: false, show: false },
            },
          },
          projectTiming: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              description: { update: false, read: false, show: false },
            },
          },
          project: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              projectId: { update: false, read: false, show: false },
              type: { update: false, read: false, show: false },
              customer: { update: false, read: false, show: false },
              category: { update: false, read: false, show: false },
              timing: { update: false, read: false, show: false },
              price: { update: false, read: false, show: false },
              responsible: { update: false, read: false, show: false },
              leader: { update: false, read: false, show: false },
              start: { update: false, read: false, show: false },
              due: { update: false, read: false, show: false },
              priority: { update: false, read: false, show: false },
              status: { update: false, read: false, show: false },
              description: { update: false, read: false, show: false },
            },
          },
          Designation: {
            access: false,
            export: false,
            create: false,
            delete: false,
            fields: {
              name: { update: false, read: false, show: false },
              description: { update: false, read: false, show: false },
            },
          },
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
    Designation: "Designation",
  };

  const openModal = (master) => {
    setSelectedMaster(master);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMaster(null);
    setModalIsOpen(false);
  };

  // if (isLoading) {
  //   return <Preloader />;
  // }

  // if (!user?.role?.permissions?.role?.create) {
  //   return <Navigate to="/role" />;
  // }

  return (
    <div className="page-wrapper custom-role" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add Role</h4>
          <Link to="/role">
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
        <form onSubmit={handleCreate}>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-form-label" htmlFor="name">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            {
              Object.keys(permissionLabels).map((master) => (
                <div className="col-md-4 mb-3" key={master}>
                  <div className="form-group">
                    <div className="d-flex align-items-center mb-2">
                      <label className="col-form-label" style={{ marginRight: "0.5rem" }}>{permissionLabels[master]} :</label>
                      <input
                        type="checkbox"
                        className="form-check-input ml-2"
                        id={`${master}.access`}
                        name={`${master}.access`}
                        checked={permissions[master]?.access || false}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`${master}.access`} style={{ marginLeft: '5px' }}>
                        Access
                      </label>
                    </div>
                    {
                      ['export', 'create', 'delete'].map((action) => (
                        <div className="form-check" key={`${master}-${action}`}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${master}.${action}`}
                            name={`${master}.${action}`}
                            checked={permissions[master]?.[action] || false}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor={`${master}.${action}`}>
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                          </label>
                        </div>
                      ))
                    }
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm ml-2"
                      onClick={() => openModal(master)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="submit-button text-end">
            <Link to="/role" className="btn btn-light sidebar-close">
              Cancel
            </Link>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>

      <Modal show={modalIsOpen} onHide={closeModal} size="lg" aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <h4>{permissionLabels[selectedMaster]} Field Permissions</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              {
                Object.entries(permissions[selectedMaster]?.fields || {}).map(([field, permission]) => (
                  <div className="col-md-6" key={field}>
                    <div className="form-group">
                      <label className="col-form-label" style={{ marginLeft: "0rem", marginBottom: "0.2rem", }}>{field.charAt(0).toUpperCase() + field.slice(1)} :</label>
                      <div className="d-flex">
                        <div className="form-check mr-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${field}.update`}
                            name={`${field}.update`}
                            checked={permission.update}
                            onChange={handleFieldPermissionChange}
                          />
                          <label className="form-check-label" htmlFor={`${field}.update`}>Update</label>
                        </div>
                        <div className="form-check mr-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${field}.read`}
                            name={`${field}.read`}
                            checked={permission.read}
                            onChange={handleFieldPermissionChange}
                          />
                          <label className="form-check-label" htmlFor={`${field}.read`}>Read Only</label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${field}.show`}
                            name={`${field}.show`}
                            checked={permission.show}
                            onChange={handleFieldPermissionChange}
                          />
                          <label className="form-check-label" htmlFor={`${field}.show`}>Show</label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddRole;

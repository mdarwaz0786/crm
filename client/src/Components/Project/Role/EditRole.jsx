/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditRole = () => {
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { team, validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    customer: {
      access: false,
      export: false,
      create: false,
      update: false,
      delete: false,
      fields: {
        name: { read: true, show: true },
        email: { read: true, show: true },
        mobile: { read: true, show: true },
        address: { read: true, show: true },
      },
    },
    team: {
      access: false,
      export: false,
      create: false,
      update: false,
      delete: false,
      fields: {
        name: { read: true, show: true },
        email: { read: true, show: true },
        mobile: { read: true, show: true },
        username: { read: true, show: true },
        password: { read: true, show: true },
        joining: { read: true, show: true },
        dob: { read: true, show: true },
        designation: { read: true, show: true },
        reportingTo: { read: true, show: true },
        role: { read: true, show: true },
      },
    },
    role: {
      access: false,
      export: false,
      create: false,
      update: false,
      delete: false,
      fields: {
        name: { read: true, show: true },
        masters: { read: true, show: true },
      },
    },
    Designation: {
      access: false,
      export: false,
      create: false,
      update: false,
      delete: false,
      fields: {
        name: { read: true, show: true },
        description: { read: true, show: true },
      },
      projectType: {
        access: false,
        export: false,
        create: false,
        update: false,
        delete: false,
        fields: {
          name: { read: true, show: true },
          description: { read: true, show: true },
        },
      },
      projectStatus: {
        access: false,
        export: false,
        create: false,
        update: false,
        delete: false,
        fields: {
          status: { read: true, show: true },
          description: { read: true, show: true },
        },
      },
      projectCategory: {
        access: false,
        export: false,
        create: false,
        update: false,
        delete: false,
        fields: {
          name: { read: true, show: true },
          description: { read: true, show: true },
        },
      },
      projectTiming: {
        access: false,
        export: false,
        create: false,
        update: false,
        delete: false,
        fields: {
          name: { read: true, show: true },
          description: { read: true, show: true },
        },
      },
      project: {
        access: false,
        export: false,
        create: false,
        update: false,
        delete: false,
        fields: {
          name: { read: true, show: true },
          projectId: { read: true, show: true },
          type: { read: true, show: true },
          customer: { read: true, show: true },
          category: { read: true, show: true },
          timing: { read: true, show: true },
          price: { read: true, show: true },
          responsible: { read: true, show: true },
          leader: { read: true, show: true },
          start: { read: true, show: true },
          due: { read: true, show: true },
          priority: { read: true, show: true },
          status: { read: true, show: true },
          description: { read: true, show: true },
        },
      },
    },
  });

  const handleChange = (e) => {
    const { name, checked, type } = e.target;

    // Prevent change if the checkbox is disabled
    if (team?.role?.permissions?.role?.fields?.masters?.read) {
      e.preventDefault();
      return;
    };

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
    };
  };

  const handleFieldPermissionChange = (e) => {
    const { name, checked } = e.target;

    // Prevent change if the checkbox is disabled
    if (team?.role?.permissions?.role?.fields?.masters?.read) {
      e.preventDefault();
      return;
    };

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

  const fetchSingleRole = async (id) => {
    try {
      const response = await axios.get(`/api/v1/role/single-role/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName(response?.data?.role?.name);
        setPermissions(response?.data?.role?.permissions);
      };
    } catch (error) {
      console.error('Error while fetching single role:', error.message);
    };
  };

  useEffect(() => {
    fetchSingleRole(id);
  }, [id]);

  // Create the update object
  const updateData = {};
  const fieldPermissions = team?.role?.permissions?.role?.fields;

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    // Conditionally include fields based on permissions
    if (fieldPermissions?.name?.show && !fieldPermissions?.name?.read) {
      updateData.name = name;
    };

    if (fieldPermissions?.masters?.show && !fieldPermissions?.masters?.read) {
      updateData.permissions = permissions;
    };

    try {
      const response = await axios.put(`/api/v1/role/update-role/${id}`, updateData, {
        headers: {
          Authorization: `${validToken}`,
        },
      });

      if (response?.data?.success) {
        setName("");
        setPermissions({
          customer: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              email: { read: true, show: true },
              mobile: { read: true, show: true },
              address: { read: true, show: true },
            },
          },
          team: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              email: { read: true, show: true },
              mobile: { read: true, show: true },
              username: { read: true, show: true },
              password: { read: true, show: true },
              joining: { read: true, show: true },
              dob: { read: true, show: true },
              designation: { read: true, show: true },
              reportingTo: { read: true, show: true },
              role: { read: true, show: true },
            },
          },
          role: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              masters: { read: true, show: true },
            },
          },
          Designation: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              description: { read: true, show: true },
            },
          },
          projectType: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              description: { read: true, show: true },
            },
          },
          projectStatus: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              status: { read: true, show: true },
              description: { read: true, show: true },
            },
          },
          projectCategory: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              description: { read: true, show: true },
            },
          },
          projectTiming: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              description: { read: true, show: true },
            },
          },
          project: {
            access: false,
            export: false,
            create: false,
            update: false,
            delete: false,
            fields: {
              name: { read: true, show: true },
              projectId: { read: true, show: true },
              type: { read: true, show: true },
              customer: { read: true, show: true },
              category: { read: true, show: true },
              timing: { read: true, show: true },
              price: { read: true, show: true },
              responsible: { read: true, show: true },
              leader: { read: true, show: true },
              start: { read: true, show: true },
              due: { read: true, show: true },
              priority: { read: true, show: true },
              status: { read: true, show: true },
              description: { read: true, show: true },
            },
          },
        });
        toast.success("Role updated successfully");
        navigate(-1);
      }
    } catch (error) {
      console.error('Error while updating role:', error.message);
      toast.error("Error while updating role");
    };
  };

  const permissionLabels = {
    customer: "Customer",
    team: "Team Member",
    role: "Role",
    designation: "Designation",
    projectType: "Project Type",
    projectStatus: "Project Status",
    projectCategory: "Project Category",
    projectTiming: "Project Timing",
    project: "Projects",
  };

  const openModal = (master) => {
    setSelectedMaster(master);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMaster(null);
    setModalIsOpen(false);
  };

  if (!team?.role?.permissions?.role?.update) {
    return <Navigate to="/" />;
  };

  return (
    <div className="page-wrapper custom-role" style={{ paddingBottom: "1rem" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit Role</h4>
          <Link to="#" onClick={() => navigate(-1)}>
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
        <form onSubmit={(e) => handleUpdate(e, id)}>
          {
            (fieldPermissions?.name?.show) ? (
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
                      readOnly={fieldPermissions?.name?.read}
                      onKeyDown={fieldPermissions?.name?.read ? (e) => e.preventDefault() : undefined}
                    />
                  </div>
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            (fieldPermissions?.masters?.show) ? (
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
                            disabled={fieldPermissions?.masters?.read}
                            onKeyDown={fieldPermissions?.masters?.read ? (e) => e.preventDefault() : undefined}
                          />
                          <label className="form-check-label" htmlFor={`${master}.access`} style={{ marginLeft: '5px' }}>
                            Access
                          </label>
                        </div>
                        {
                          ['export', 'create', 'update', 'delete'].map((action) => (
                            <div className="form-check" key={`${master}-${action}`}>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`${master}.${action}`}
                                name={`${master}.${action}`}
                                checked={permissions[master]?.[action] || false}
                                onChange={handleChange}
                                disabled={fieldPermissions?.masters?.read}
                                onKeyDown={fieldPermissions?.masters?.read ? (e) => e.preventDefault() : undefined}
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
                          Field Permission
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              null
            )
          }
          <div className="submit-button text-end">
            <Link to="#" onClick={() => navigate(-1)} className="btn btn-light sidebar-close">
              Cancel
            </Link>
            <button className="btn btn-primary" type="submit">
              Update
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
                      <label className="col-form-label" style={{ marginLeft: "0rem", marginBottom: "0.2rem" }}>{field.charAt(0).toUpperCase() + field.slice(1)} :</label>
                      <div className="d-flex">
                        <div className="form-check mr-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${field}.read`}
                            name={`${field}.read`}
                            checked={permission.read}
                            onChange={handleFieldPermissionChange}
                            disabled={fieldPermissions?.masters?.read}
                            onKeyDown={fieldPermissions?.masters?.read ? (e) => e.preventDefault() : undefined}
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
                            disabled={fieldPermissions?.masters?.read}
                            onKeyDown={fieldPermissions?.masters?.read ? (e) => e.preventDefault() : undefined}
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

export default EditRole;

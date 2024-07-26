/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-semi */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../context/authContext.jsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProjectDashboard = () => {
  const location = useLocation();
  const [project, setProject] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { validToken, team, isLoading } = useAuth();
  const fieldPermissions = team?.role?.permissions?.project?.fields;
  const [filters, setFilters] = useState({
    sort: "Descending",
    search: "",
    dateRange: "",
  });

  useEffect(() => {
    const { query } = location.state || {};
    if (query) {
      setFilters((prevFilters) => ({ ...prevFilters, search: query || "" }));
    };
  }, [location.state]);

  const fetchAllProject = async () => {
    try {
      const response = await axios.get("/api/v1/project/all-project", {
        headers: {
          Authorization: `${validToken}`,
        },
        params: {
          sort: filters.sort,
          search: filters.search,
          dateRange: filters.dateRange,
        },
      });

      if (response?.data?.success) {
        const filteredProject = response?.data?.project.filter((p) => {
          const isLeader = p?.leader?.some((l) => l?._id === team?._id);
          const isResponsible = p?.responsible?.some((r) => r?._id === team?._id);
          return isLeader || isResponsible;
        });
        setProject(filteredProject);
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  useEffect(() => {
    const formatDate = (date) => {
      if (!date) return "";
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    if (startDate && endDate) {
      setFilters((prevFilters) => ({ ...prevFilters, dateRange: `${formatDate(startDate)} - ${formatDate(endDate)}` }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, dateRange: "" }));
    };
  }, [startDate, endDate]);

  useEffect(() => {
    if (!isLoading && team) {
      fetchAllProject();
    };
  }, [filters, team, isLoading]);

  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="page-header">
                  <div className="row align-items-center ">
                    <div className="col-md-4">
                      <h3 className="page-title">Project Dashboard</h3>
                    </div>
                    <div className="col-md-8 float-end ms-auto">
                      <div className="d-flex title-head">
                        <div className="daterange-picker d-flex align-items-center justify-content-center">
                          <div className="form-sort me-2">
                            <DatePicker
                              className="form-control"
                              selected={startDate}
                              onChange={(dates) => {
                                const [start, end] = dates;
                                setStartDate(start);
                                setEndDate(end);
                              }}
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                              dateFormat="dd-MM-yyyy"
                              placeholderText="Select date range"
                            />
                          </div>
                          <div className="head-icons mb-0">
                            <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Refresh" onClick={() => window.location.reload()}><i className="ti ti-refresh-dot" /></Link>
                            <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header"><i className="ti ti-chevrons-up" /></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <div className="card">
                      <div className="card-body">
                        <div className="statistic-header">
                          <h4><i className="ti ti-grip-vertical me-1" />Recent Projects</h4>
                          <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                              <ul>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" >
                                    <i className="ti ti-calendar-check me-2" /> {filters.sort}
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item" onClick={() => setFilters((prev) => ({ ...prev, sort: "Ascending" }))} >
                                      <i className="ti ti-circle-chevron-right" /> Ascending
                                    </Link>
                                    <Link to="#" className="dropdown-item" onClick={() => setFilters((prev) => ({ ...prev, sort: "Descending" }))} >
                                      <i className="ti ti-circle-chevron-right" /> Descending
                                    </Link>
                                  </div>
                                </li>
                                <li>
                                  <Link to="/add-project" className="btn btn-primary">
                                    <i className="ti ti-square-rounded-plus me-1" />
                                    Add Project
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive custom-table">
                          <table className="table table-bordered table-striped custom-border">
                            <thead className="thead-light">
                              <tr>
                                {
                                  (fieldPermissions?.priority?.show) ? (
                                    <th>Priority</th>
                                  ) : (
                                    null
                                  )
                                }
                                {
                                  (fieldPermissions?.name?.show) ? (
                                    <th>Project Name</th>
                                  ) : (
                                    null
                                  )
                                }
                                {
                                  (fieldPermissions?.customer?.show) ? (
                                    <th>Customer</th>
                                  ) : (
                                    null
                                  )
                                }
                                {
                                  (fieldPermissions?.due?.show) ? (
                                    <th>Due Date</th>
                                  ) : (
                                    null
                                  )
                                }
                              </tr>
                            </thead>
                            <tbody>
                              {
                                project?.map((p) => (
                                  <tr key={p?._id}>
                                    {
                                      (fieldPermissions?.priority?.show) ? (
                                        <td><Link to={`edit-project/${p?._id}`}>{p?.priority}</Link></td>
                                      ) : (
                                        null
                                      )
                                    }
                                    {
                                      (fieldPermissions?.name?.show) ? (
                                        <td><Link to={`edit-project/${p?._id}`}>{p?.name}</Link></td>
                                      ) : (
                                        null
                                      )
                                    }
                                    {
                                      (fieldPermissions?.customer?.show) ? (
                                        <td><Link to={`edit-project/${p?._id}`}>{p?.customer?.name}</Link></td>
                                      ) : (
                                        null
                                      )
                                    }
                                    {
                                      (fieldPermissions?.due?.show) ? (
                                        <td><Link to={`edit-project/${p?._id}`}>{p?.due}</Link></td>
                                      ) : (
                                        null
                                      )
                                    }
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 d-flex">
                    <div className="card w-100">
                      <div className="card-body">
                        <div className="statistic-header">
                          <h4><i className="ti ti-grip-vertical me-1" />Projects By Stage</h4>
                          <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                              <ul>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" >
                                    Last 3 months
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item">
                                      Last 3 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 6 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 12 months
                                    </Link>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div id="contacts-analysis" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="card w-100">
                      <div className="card-body">
                        <div className="statistic-header">
                          <h4><i className="ti ti-grip-vertical me-1" />Projects By Stage</h4>
                          <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                              <ul>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" >
                                    Sales Pipeline
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item">
                                      Marketing Pipeline
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Sales Pipeline
                                    </Link>
                                  </div>
                                </li>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                    Last 3 months
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item">
                                      Last 3 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 6 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 12 months
                                    </Link>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div id="project-stage" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="statistic-header">
                          <h4><i className="ti ti-grip-vertical me-1" />Leads By Stage</h4>
                          <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                              <ul>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                    Marketing Pipeline
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item">
                                      Marketing Pipeline
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Sales Pipeline
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Email
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Chats
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Operational
                                    </Link>
                                  </div>
                                </li>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" >
                                    Last 3 months
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item">
                                      Last 3 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 6 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 12 months
                                    </Link>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div id="last-chart" />
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body ">
                        <div className="statistic-header">
                          <h4><i className="ti ti-grip-vertical me-1" />Won Deals Stage</h4>
                          <div className="dropdown statistic-dropdown">
                            <div className="card-select">
                              <ul>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown" >
                                    Marketing Pipeline
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item">
                                      Marketing Pipeline
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Sales Pipeline
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Email
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Chats
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Operational
                                    </Link>
                                  </div>
                                </li>
                                <li>
                                  <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                    Last 3 months
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="#" className="dropdown-item">
                                      Last 3 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 6 months
                                    </Link>
                                    <Link to="#" className="dropdown-item">
                                      Last 12 months
                                    </Link>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div id="won-chart" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}

        {/* Delete Contact */}
        <div className="modal custom-modal fade" id="delete_contact" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 m-0 justify-content-end">
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <div className="success-message text-center">
                  <div className="success-popup-icon">
                    <i className="ti ti-trash-x" />
                  </div>
                  <h3>Remove Contacts?</h3>
                  <p className="del-info">Are you sure you want to remove contact you selected.</p>
                  <div className="col-lg-12 text-center modal-btn">
                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                    <Link to="#" className="btn btn-danger">Yes, Delete it</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Contact */}

        {/* Create Contact */}
        <div className="modal custom-modal fade" id="create_contact" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 m-0 justify-content-end">
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <div className="success-message text-center">
                  <div className="success-popup-icon bg-light-blue">
                    <i className="ti ti-user-plus" />
                  </div>
                  <h3>Contact Created Successfully!!!</h3>
                  <p>View the details of contact, created</p>
                  <div className="col-lg-12 text-center modal-btn">
                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                    <Link to="#" className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Create Contact */}

        {/* Add Event Modal */}
        <div id="dwnld_report" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Download Report</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              </div>
              <div className="modal-body">
                <form action="calendar.html">
                  <div className="mb-3">
                    <label className="form-label">File Type <span className="text-danger">*</span></label>
                    <select className="select">
                      <option>Download as PDF</option>
                      <option>Download as Excel</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <h5>Filters</h5>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">File Type <span className="text-danger">*</span></label>
                    <select className="select">
                      <option>All Fields</option>
                      <option>Name</option>
                      <option>Position</option>
                      <option>Owner</option>
                      <option>Location</option>
                      <option>Phone</option>
                      <option>Date Created</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Position<span className="text-danger">*</span></label>
                    <select className="select">
                      <option>All Position</option>
                      <option>Installer</option>
                      <option>Senior Manager</option>
                      <option>Test Engineer</option>
                      <option>UI /UX Designer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Source<span className="text-danger">*</span></label>
                    <select className="select">
                      <option>All Source</option>
                      <option>Google</option>
                      <option>Campaigns </option>
                      <option>Referrals</option>
                      <option>Paid Social</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Year<span className="text-danger">*</span></label>
                    <select className="select">
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                    </select>
                  </div>
                  <div className="col-lg-12 text-end modal-btn">
                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                    <Link to="#" className="btn btn-primary">Download Now</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDashboard;
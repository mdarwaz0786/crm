/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext.jsx";
import html2pdf from "html2pdf.js";
import Preloader from "../../Preloader.jsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Project = () => {
  const [project, setProject] = useState([]);
  const [total, setTotal] = useState("");
  const [filteredTotal, setFilteredTotal] = useState("");
  const [loading, setLoading] = useState(true);
  const { validToken, team, isLoading } = useAuth();
  const [nameData, setNameData] = useState([]);
  const [name, setName] = useState("");
  const [projectIdData, setProjectIdData] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    nameFilter: [],
    projectIdFilter: [],
    sort: "Descending",
    page: 1,
    limit: 10,
    dateRange: "",
  });
  const permissions = team?.role?.permissions?.project;
  const fieldPermissions = team?.role?.permissions?.project?.fields;

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timer = useRef();

    useEffect(() => {
      if (value === "") {
        setDebouncedValue("");
        return;
      };

      timer.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer.current);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedSearchName = useDebounce(name, 500);
  const debouncedSearchProjectId = useDebounce(projectId, 500);

  useEffect(() => {
    const formatDate = (date) => {
      if (!date) return "";
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    if (startDate && endDate) {
      setFilters((prevFilters) => ({ ...prevFilters, dateRange: `${formatDate(startDate)} - ${formatDate(endDate)}`, page: 1 }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, dateRange: "", page: 1 }));
    };
  }, [startDate, endDate]);

  const fetchAllProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/project/all-project", {
        headers: {
          Authorization: `${validToken}`,
        },
        params: {
          search: filters.search,
          sort: filters.sort,
          page: filters.page,
          limit: filters.limit,
          dateRange: filters.dateRange,
          nameFilter: filters.nameFilter.map(String),
          projectIdFilter: filters.projectIdFilter.map(String),
        },
      });

      if (response?.data?.success) {
        const filteredProject = response?.data?.project?.filter((p) => {
          const isLeader = p?.leader?.some((l) => l?._id === team?._id);
          const isResponsible = p?.responsible?.some((r) => r?._id === team?._id);
          return isLeader || isResponsible;
        });
        if (team?.role?.name === "Coordinator" || team?.role?.name === "Admin") {
          setProject(response?.data?.project);
          setTotal(response?.data?.totalCount);
          setFilteredTotal(response?.data?.totalCount);
        } else {
          setProject(filteredProject);
          setTotal(response?.data?.totalCount);
          setFilteredTotal(filteredProject?.length);
        };
        setLoading(false);
      };
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    };
  };

  const fetchAllProjectName = async () => {
    try {
      const response = await axios.get("/api/v1/project/all-project", {
        headers: {
          Authorization: `${validToken}`,
        },
        params: {
          name,
        },
      });

      if (response?.data?.success) {
        const filteredProject = response?.data?.project?.filter((p) => {
          const isLeader = p?.leader?.some((l) => l?._id === team?._id);
          const isResponsible = p?.responsible?.some((r) => r?._id === team?._id);
          return isLeader || isResponsible;
        });
        if (team?.role?.name === "Coordinator" || team?.role?.name === "Admin") {
          setNameData(response?.data?.project);
        } else {
          setNameData(filteredProject);
        };
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.access) {
      fetchAllProjectName();
    };
  }, [debouncedSearchName, isLoading, team, permissions]);

  const fetchAllProjectId = async () => {
    try {
      const response = await axios.get("/api/v1/project/all-project", {
        headers: {
          Authorization: `${validToken}`,
        },
        params: {
          projectId,
        },
      });

      if (response?.data?.success) {
        const filteredProject = response?.data?.project?.filter((p) => {
          const isLeader = p?.leader?.some((l) => l?._id === team?._id);
          const isResponsible = p?.responsible?.some((r) => r?._id === team?._id);
          return isLeader || isResponsible;
        });
        if (team?.role?.name === "Coordinator" || team?.role?.name === "Admin") {
          setProjectIdData(response?.data?.project);
        } else {
          setProjectIdData(filteredProject);
        };
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.access) {
      fetchAllProjectId();
    };
  }, [debouncedSearchProjectId, isLoading, team, permissions]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter((item) => item !== value),
        page: 1,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
        page: 1,
      }));
    };
  };

  useEffect(() => {
    if (!isLoading && team && permissions?.access) {
      fetchAllProject();
    };
  }, [debouncedSearch, filters.limit, filters.page, filters.sort, filters.nameFilter, filters.projectIdFilter, filters.dateRange, isLoading, team, permissions]);

  const handleDelete = async (id) => {
    let isdelete = prompt("If you want to delete, type \"yes\".");

    if (isdelete === "yes") {
      try {
        const response = await axios.delete(`/api/v1/project/delete-project/${id}`, {
          headers: {
            Authorization: `${validToken}`,
          },
        });

        if (response?.data?.success) {
          toast.success("Project deleted successfully");
          fetchAllProject();
        };
      } catch (error) {
        console.log("Error while deleting project:", error.message);
        toast.error("Error while deleting project");
      };
    } else if (isdelete !== "") {
      alert("Type only \"yes\".");
    };
  };

  const exportProjectListAsPdf = () => {
    const element = document.querySelector("#exportProjectList");
    element.style.padding = "1.5rem";
    const options = {
      filename: "project-list.pdf",
      html2canvas: {
        useCORS: true,
      },
      jsPDF: {
        orientation: 'landscape',
      },
    };
    html2pdf().set(options).from(element).save();
  };

  if (isLoading) {
    return <Preloader />;
  };

  if (!permissions?.access) {
    return <Navigate to="/" />;
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content" id="exportProjectList">
          <div className="row">
            <div className="col-md-12">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-4">
                    <h4 className="page-title">Projects<span className="count-title">{filteredTotal}</span></h4>
                  </div>
                  <div className="col-8 text-end">
                    <div className="head-icons">
                      <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Refresh" onClick={() => window.location.reload()}>
                        <i className="ti ti-refresh-dot" />
                      </Link>
                      <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
                        <i className="ti ti-chevrons-up" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}

              <div className="card main-card">
                <div className="card-body">
                  {/* Search */}
                  <div className="search-section">
                    <div className="row">
                      <div className="col-md-5 col-sm-4">
                        <div className="form-wrap icon-form">
                          <span className="form-icon"><i className="ti ti-search" /></span>
                          <input type="text" className="form-control" placeholder="Search Project" value={filters.search} onChange={(e) => { const searchValue = e.target.value; setFilters((prev) => ({ ...prev, search: searchValue, page: 1 })) }} />
                        </div>
                      </div>
                      <div className="col-md-7 col-sm-8">
                        <div className="export-list text-sm-end">
                          <ul>
                            {
                              (permissions?.export) && (
                                <li>
                                  <div className="export-dropdwon">
                                    <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                      <i className="ti ti-package-export" />
                                      Export
                                    </Link>
                                    <div className="dropdown-menu  dropdown-menu-end">
                                      <ul>
                                        <li>
                                          <Link to="#" onClick={() => setTimeout(() => { exportProjectListAsPdf() }, 0)}>
                                            <i className="ti ti-file-type-pdf text-danger" />
                                            Export as PDF
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                              )
                            }
                            {
                              (permissions?.create) && (
                                <li>
                                  <Link to="/add-project" className="btn btn-primary">
                                    <i className="ti ti-square-rounded-plus" />
                                    Add New Project
                                  </Link>
                                </li>
                              )
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Search */}

                  {/* Filter */}
                  <div className="filter-section filter-flex">
                    <div className="sortby-list">
                      <ul>
                        <li>
                          <div className="sort-dropdown drop-down">
                            <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown"><i className="ti ti-sort-ascending-2" />{filters.sort}</Link>
                            <div className="dropdown-menu  dropdown-menu-start">
                              <ul>
                                <li>
                                  <Link to="#" onClick={() => setFilters((prev) => ({ ...prev, sort: "Ascending", page: 1 }))} >
                                    <i className="ti ti-circle-chevron-right" />
                                    Ascending
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#" onClick={() => setFilters((prev) => ({ ...prev, sort: "Descending", page: 1 }))} >
                                    <i className="ti ti-circle-chevron-right" />
                                    Descending
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li>
                          <DatePicker
                            className="form-control date-range"
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
                            isClearable
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="filter-list">
                      <ul>
                        <li>
                          <div className="form-sorts dropdown">
                            <Link to="#" data-bs-toggle="dropdown" data-bs-auto-close="false"><i className="ti ti-filter-share" />Filter</Link>
                            <div className="filter-dropdown-menu dropdown-menu dropdown-menu-xl-end">
                              <div className="filter-set-view">
                                <div className="filter-set-head">
                                  <h4><i className="ti ti-filter-share" />Filter</h4>
                                </div>
                                <div className="accordion" id="accordionExample">
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link to="#" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Project Name</Link>
                                    </div>
                                    <div className="filter-set-contents accordion-collapse collapse show" id="collapseOne" data-bs-parent="#accordionExample">
                                      <div className="filter-content-list">
                                        <div className="form-wrap icon-form">
                                          <span className="form-icon"><i className="ti ti-search" /></span>
                                          <input type="text" className="form-control" placeholder="Search Project Name" onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <ul>
                                          {
                                            nameData?.map((n) => (
                                              <li key={n?._id}>
                                                <div className="filter-checks">
                                                  <label className="checkboxs">
                                                    <input
                                                      type="checkbox"
                                                      name="nameFilter"
                                                      value={n?.name}
                                                      checked={filters.nameFilter.includes(n?.name)}
                                                      onChange={handleFilterChange}
                                                    />
                                                    <span className="checkmarks" />
                                                  </label>
                                                </div>
                                                <div className="collapse-inside-text">
                                                  <h5>{n?.name}</h5>
                                                </div>
                                              </li>
                                            ))
                                          }
                                        </ul>
                                        <div className="filter-reset-btns" style={{ marginTop: "1rem" }}>
                                          <div className="row">
                                            <div className="col-6">
                                              <Link to="#" className="btn btn-light" onClick={() => setFilters((prev) => ({ ...prev, nameFilter: [] }))}>Reset</Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion" id="accordionExample">
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link to="#" className="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Project Id</Link>
                                    </div>
                                    <div className="filter-set-contents accordion-collapse collapse" id="collapseTwo" data-bs-parent="#accordionExample">
                                      <div className="filter-content-list">
                                        <div className="form-wrap icon-form">
                                          <span className="form-icon"><i className="ti ti-search" /></span>
                                          <input type="text" className="form-control" placeholder="Search Project Id" onChange={(e) => setProjectId(e.target.value)} />
                                        </div>
                                        <ul>
                                          {
                                            projectIdData?.map((p) => (
                                              <li key={p?._id}>
                                                <div className="filter-checks">
                                                  <label className="checkboxs">
                                                    <input
                                                      type="checkbox"
                                                      name="projectIdFilter"
                                                      value={p?.projectId}
                                                      checked={filters.projectIdFilter.includes(p?.projectId)}
                                                      onChange={handleFilterChange}
                                                    />
                                                    <span className="checkmarks" />
                                                  </label>
                                                </div>
                                                <div className="collapse-inside-text">
                                                  <h5>{p?.projectId}</h5>
                                                </div>
                                              </li>
                                            ))
                                          }
                                        </ul>
                                        <div className="filter-reset-btns" style={{ marginTop: "1rem" }}>
                                          <div className="row">
                                            <div className="col-6">
                                              <Link to="#" className="btn btn-light" onClick={() => setFilters((prev) => ({ ...prev, projectIdFilter: [] }))}>Reset</Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="filter-reset-btns">
                                  <div className="row">
                                    <div className="col-6">
                                      <Link to="#" className="btn btn-light" onClick={() => setFilters((prev) => ({ ...prev, nameFilter: [], projectIdFilter: [] }))}>Reset All</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="view-icons">
                            <Link to="#" className="active"><i className="ti ti-list-tree" /></Link>
                            <Link to="#"><i className="ti ti-grid-dots" /></Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Filter */}

                  {/* Project List */}
                  <div className="table-responsive custom-table">
                    <table className="table table-bordered table-striped custom-border">
                      <thead className="thead-light">
                        <tr>
                          <th className="no-sort">
                            <label className="checkboxs"><input type="checkbox" id="select-all" /><span className="checkmarks" /></label>
                          </th>
                          <th>#</th>
                          {
                            (fieldPermissions?.projectId?.show) && (
                              <th>Project Id</th>
                            )
                          }
                          {
                            (fieldPermissions?.name?.show) && (
                              <th>Project Name</th>
                            )
                          }
                          {
                            (fieldPermissions?.customer?.show) && (
                              <th>Customer</th>
                            )
                          }
                          {
                            (fieldPermissions?.priority?.show) && (
                              <th>Priority</th>
                            )
                          }
                          {
                            (fieldPermissions?.start?.show) && (
                              <th>Start Date</th>
                            )
                          }
                          {
                            (fieldPermissions?.due?.show) && (
                              <th>Due Date</th>
                            )
                          }
                          {
                            (fieldPermissions?.type?.show) && (
                              <th>Project Type</th>
                            )
                          }
                          {
                            (fieldPermissions?.status?.show) && (
                              <th>Status</th>
                            )
                          }
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          project?.map((p, index) => (
                            <tr key={p?._id}>
                              <td>
                                <label className="checkboxs"><input type="checkbox" /><span className="checkmarks"></span></label>
                              </td>
                              <td>{(filters.page - 1) * filters.limit + index + 1}</td>
                              {
                                (fieldPermissions?.projectId?.show) && (
                                  <td>{p?.projectId}</td>
                                )
                              }
                              {
                                (fieldPermissions?.name?.show) && (
                                  <td>{p?.name}</td>
                                )
                              }
                              {
                                (fieldPermissions?.customer?.show) && (
                                  <td>{p?.customer?.name}</td>
                                )
                              }
                              {
                                (fieldPermissions?.priority?.show) && (
                                  <td>{p?.priority}</td>
                                )
                              }
                              {
                                (fieldPermissions?.start?.show) && (
                                  <td>{p?.start}</td>
                                )
                              }
                              {
                                (fieldPermissions?.due?.show) && (
                                  <td>{p?.due}</td>
                                )
                              }
                              {
                                (fieldPermissions?.type?.show) && (
                                  <td>{p?.type?.name}</td>
                                )
                              }
                              {
                                (fieldPermissions?.status?.show) && (
                                  <td>{p?.status?.status}</td>
                                )
                              }
                              <td>
                                <div className="table-action">
                                  <Link to="#" className="action-icon" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-ellipsis-v"></i>
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    {
                                      (permissions?.update) && (
                                        <Link to={`/edit-project/${p?._id}`} className="dropdown-item">
                                          <i className="ti ti-edit text-blue"></i>
                                          Update
                                        </Link>
                                      )
                                    }
                                    {
                                      permissions?.update && permissions?.delete && (
                                        <hr className="horizontal-line" />
                                      )
                                    }
                                    {
                                      (permissions?.delete) && (
                                        <Link to="#" className="dropdown-item" onClick={() => handleDelete(p?._id)}>
                                          <i className="ti ti-trash text-danger"></i>
                                          Delete
                                        </Link>
                                      )
                                    }
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4 custom-pagination">
                      <div className="datatable-length">
                        <div className="dataTables_length" id="project-list_length">
                          <label>
                            Show
                            <select name="project-list_length" value={filters.limit} onChange={(e) => setFilters((prev) => ({ ...prev, limit: e.target.value, page: 1 }))} aria-controls="project-list" className="form-select form-select-sm">
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="20">20</option>
                              <option value="25">25</option>
                              <option value={total}>All</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 custom-pagination">
                      {
                        (filteredTotal === 0) ? (
                          <span style={{ textAlign: "center", fontSize: "1rem", fontWeight: "600" }}>No Data</span>
                        ) : loading ? (
                          <h5 style={{ textAlign: "center", color: "#00918E" }}>
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </h5>
                        ) : (
                          null
                        )
                      }
                    </div>
                    <div className="col-md-4 custom-pagination">
                      <div className="datatable-paginate">
                        <div className="dataTables_paginate paging_simple_numbers" id="project-list_paginate">
                          <ul className="pagination">
                            <li className={`paginate_button page-item previous ${filters.page === 1 ? "disabled" : ""}`} id="project-list_previous">
                              <Link to="#" onClick={() => setFilters((prev) => ({ ...prev, page: filters.page - 1 }))} aria-controls="project-list" aria-disabled={filters.page === 1} role="link" data-dt-idx="previous" tabIndex="-1" className="page-link" >
                                <i className="fa fa-angle-left"></i> Prev
                              </Link>
                            </li>
                            {
                              [...Array(Math.ceil(total / filters.limit)).keys()].map((num) => (
                                <li className={`paginate_button page-item page-number ${filters.page === num + 1 ? "active" : ""}`} key={num}>
                                  <Link to="#" onClick={() => setFilters((prev) => ({ ...prev, page: num + 1 }))} aria-controls="project-list" role="link" aria-current={filters.page === num + 1} data-dt-idx={num} tabIndex="0" className="page-link">
                                    {num + 1}
                                  </Link>
                                </li>
                              ))
                            }
                            <li className="paginate_button page-item page-number-mobile active">
                              {filters.page}
                            </li>
                            <li className={`paginate_button page-item next ${filters.page === Math.ceil(total / filters.limit) ? "disabled" : ""}`} id="project-list_next">
                              <Link to="#" onClick={() => setFilters((prev) => ({ ...prev, page: filters.page + 1 }))} className="page-link" aria-controls="project-list" role="link" data-dt-idx="next" tabIndex="0">
                                Next <i className="fa fa-angle-right"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Projects List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default Project;
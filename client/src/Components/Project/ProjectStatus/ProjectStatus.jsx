/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from "../../../context/authContext.jsx";


const ProjectStatus = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  const { validToken } = useAuth();
  let i = 1;

  const fetchAllData = async () => {
    try {
      const response = await axios.get("/api/v1/projectStatus/all-projectStatus", {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      if (response?.data?.success) {
        setData(response?.data?.projectStatus);
        setTotal(response?.data?.totalCount);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/projectStatus/delete-projectStatus/${id}`, {
        headers: {
          Authorization: `${validToken}`,
        },
      });
      toast.success("Project status deleted successfully");
      fetchAllData();
    } catch (error) {
      console.log("Error while deleting project status:", error.message);
      toast.error("Error while deleting project status");
    }
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-4">
                    <h4 className="page-title">Project Status<span className="count-title">{total}</span></h4>
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
                          <input type="text" className="form-control" placeholder="Search Project Status" />
                        </div>
                      </div>
                      <div className="col-md-7 col-sm-8">
                        <div className="export-list text-sm-end">
                          <ul>
                            <li>
                              <div className="export-dropdwon">
                                <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                  <i className="ti ti-package-export" />
                                  Export
                                </Link>
                                <div className="dropdown-menu  dropdown-menu-end">
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <i className="ti ti-file-type-pdf text-danger" />
                                        Export as PDF
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <i className="ti ti-file-type-xls text-green" />
                                        Export as Excel
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <Link to="/add-project-status" className="btn btn-primary">
                                <i className="ti ti-square-rounded-plus" />
                                Add New Project Status
                              </Link>
                            </li>
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
                            <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown"><i className="ti ti-sort-ascending-2" />Sort </Link>
                            <div className="dropdown-menu  dropdown-menu-start">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <i className="ti ti-circle-chevron-right" />
                                    Ascending
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="ti ti-circle-chevron-right" />
                                    Descending
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="filter-list">
                      <ul>
                        <li>
                          <div className="form-sorts dropdown">
                            <Link to="#" data-bs-toggle="dropdown" data-bs-auto-close="false"><i className="ti ti-filter-share" />Filter</Link>
                            <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-xl-end">
                              <div className="filter-set-view">
                                <div className="filter-set-head">
                                  <h4><i className="ti ti-filter-share" />Filter</h4>
                                </div>
                                <div className="accordion" id="accordionExample">
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link to="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Project Status</Link>
                                    </div>
                                    <div className="filter-set-contents accordion-collapse collapse show" id="collapseTwo" data-bs-parent="#accordionExample">
                                      <div className="filter-content-list">
                                        <div className="form-wrap icon-form">
                                          <span className="form-icon"><i className="ti ti-search" /></span>
                                          <input type="text" className="form-control" placeholder="Search Type" />
                                        </div>
                                        <ul>
                                          {
                                            data?.map((d) => (
                                              <li key={d?._id}>
                                                <div className="filter-checks">
                                                  <label className="checkboxs">
                                                    <input type="checkbox" />
                                                    <span className="checkmarks" />
                                                  </label>
                                                </div>
                                                <div className="collapse-inside-text">
                                                  <h5>{d?.status}</h5>
                                                </div>
                                              </li>
                                            ))
                                          }
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="filter-reset-btns">
                                  <div className="row">
                                    <div className="col-6">
                                      <Link to="#" className="btn btn-light">Reset</Link>
                                    </div>
                                    <div className="col-6">
                                      <Link to="#" className="btn btn-primary">Filter</Link>
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


                  {/* Project Status List */}
                  <div className="table-responsive custom-table">
                    <table className="table table-bordered table-striped custom-border">
                      <thead className="thead-light">
                        <tr>
                          <th className="no-sort">
                            <label className="checkboxs"><input type="checkbox" id="select-all" /><span className="checkmarks" /></label>
                          </th>
                          <th>#</th>
                          <th>Status</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data?.map((d) => (
                            <tr key={d?._id}>
                              <td>
                                <label className="checkboxs"><input type="checkbox" /><span className="checkmarks"></span></label>
                              </td>
                              <td>{i++}</td>
                              <td>{d?.status}</td>
                              <td>{d?.description}</td>
                              <td>
                                <div className="table-action">
                                  <Link to="#" className="action-icon" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-ellipsis-v"></i>
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link to={`/edit-project-status/${d?._id}`} className="dropdown-item">
                                      <i className="ti ti-edit text-blue"></i>
                                      Edit
                                    </Link>
                                    <Link to="#" className="dropdown-item" onClick={() => handleDelete(d?._id)}>
                                      <i className="ti ti-trash text-danger"></i>
                                      Delete
                                    </Link>
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
                    <div className="col-md-6">
                      <div className="datatable-length">
                        <div className="dataTables_length" id="project-list_length">
                          <label>
                            Show
                            <select name="project-list_length" aria-controls="project-list" className="form-select form-select-sm">
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                            entries
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate">
                        <div className="dataTables_paginate paging_simple_numbers" id="project-list_paginate">
                          <ul className="pagination">
                            <li className="paginate_button page-item previous disabled" id="project-list_previous">
                              <Link to="#" aria-controls="project-list" aria-disabled="true" role="link" data-dt-idx="previous" tabIndex="-1"
                                className="page-link">
                                <i className="fa fa-angle-left"></i>
                                Prev
                              </Link>
                            </li>
                            <li className="paginate_button page-item active">
                              <Link to="#" aria-controls="project-list" role="link" aria-current="page" data-dt-idx="0" tabIndex="0"
                                className="page-link">
                                1
                              </Link>
                            </li>
                            <li className="paginate_button page-item ">
                              <Link to="#" aria-controls="project-list" role="link" data-dt-idx="1" tabIndex="0" className="page-link">
                                2
                              </Link>
                            </li>
                            <li className="paginate_button page-item next" id="project-list_next">
                              <Link to="#" aria-controls="project-list" role="link" data-dt-idx="next" tabIndex="0" className="page-link">
                                Next
                                <i className="fa fa-angle-right"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Project Status List */}
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

export default ProjectStatus;
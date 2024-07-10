const ProjectDashboard = () => {
  return (
    <>
      <div className="main-wrapper">
        {/* Page Wrapper */}
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
                            <i className="ti ti-calendar" />
                            <input type="text" className="form-control  date-range bookingrange" />
                          </div>
                          <div className="head-icons mb-0">
                            <a href="project-dashboard.html" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Refresh"><i className="ti ti-refresh-dot" /></a>
                            <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header"><i className="ti ti-chevrons-up" /></a>
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
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    <i className="ti ti-calendar-check me-2" />Last 7 days
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 15 days
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 30 days
                                    </a>
                                  </div>
                                </li>
                                <li>
                                  <a className="btn btn-primary add-popup" href="javascript:void(0);">
                                    <i className="ti ti-square-rounded-plus me-1" />Add Project
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive custom-table">
                          <table className="table dataTable" id="recent-project">
                            <thead className="thead-light">
                              <tr>
                                <th>Priority</th>
                                <th>Name</th>
                                <th>Client</th>
                                <th>Due Date</th>
                              </tr>
                            </thead>
                            <tbody>
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
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    Last 3 months
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 3 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 6 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 12 months
                                    </a>
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
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    Sales Pipeline
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Marketing Pipeline
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Sales Pipeline
                                    </a>
                                  </div>
                                </li>
                                <li>
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    Last 3 months
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 3 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 6 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 12 months
                                    </a>
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
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    Marketing Pipeline
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Marketing Pipeline
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Sales Pipeline
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Email
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Chats
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Operational
                                    </a>
                                  </div>
                                </li>
                                <li>
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    Last 3 months
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 3 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 6 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 12 months
                                    </a>
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
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    Marketing Pipeline
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Marketing Pipeline
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Sales Pipeline
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Email
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Chats
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Operational
                                    </a>
                                  </div>
                                </li>
                                <li>
                                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                                    Last 3 months
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 3 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 6 months
                                    </a>
                                    <a href="javascript:void(0);" className="dropdown-item">
                                      Last 12 months
                                    </a>
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
        {/* Add New Project */}
        <div className="toggle-popup">
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <h4>Add New Project</h4>
              <a href="#" className="sidebar-close toggle-btn"><i className="ti ti-x" /></a>
            </div>
            <div className="toggle-body">
              <form action="project-dashboard.html" className="toggle-height">
                <div className="pro-create">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-wrap">
                        <label className="col-form-label">Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Project ID<span className="text-danger"> *</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Project Type <span className="text-danger">*</span></label>
                        <select className="select2">
                          <option>Choose</option>
                          <option>Mobile App</option>
                          <option>Meeting</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Client <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select</option>
                          <option>NovaWave LLC</option>
                          <option>Silver Hawk</option>
                          <option>Harbor View</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Category <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select</option>
                          <option>Harbor View</option>
                          <option>LLC</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Project Timing <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select</option>
                          <option>Hourly</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                          <option>Less than 1 Month</option>
                          <option>Less than 3 months</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Price <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Amount <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Total <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Responsible Persons <span className="text-danger">*</span></label>
                        <select className="multiple-img" multiple="multiple">
                          <option data-image="assets/img/profiles/avatar-19.jpg" selected>Darlee Robertson</option>
                          <option data-image="assets/img/profiles/avatar-20.jpg">Sharon Roy</option>
                          <option data-image="assets/img/profiles/avatar-21.jpg">Vaughan</option>
                          <option data-image="assets/img/profiles/avatar-23.jpg">Jessica</option>
                          <option data-image="assets/img/profiles/avatar-16.jpg">Carol Thomas</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Team Leader  <span className="text-danger">*</span></label>
                        <select className="multiple-img" multiple="multiple">
                          <option data-image="assets/img/profiles/avatar-19.jpg">Darlee Robertson</option>
                          <option data-image="assets/img/profiles/avatar-20.jpg" selected>Sharon Roy</option>
                          <option data-image="assets/img/profiles/avatar-21.jpg">Vaughan</option>
                          <option data-image="assets/img/profiles/avatar-23.jpg">Jessica</option>
                          <option data-image="assets/img/profiles/avatar-16.jpg">Carol Thomas</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Start Date <span className="text-danger">*</span></label>
                        <div className="icon-form">
                          <span className="form-icon"><i className="ti ti-calendar-event" /></span>
                          <input type="text" className="form-control datetimepicker" defaultValue="29-02-2020" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Due Date <span className="text-danger">*</span></label>
                        <div className="icon-form">
                          <span className="form-icon"><i className="ti ti-calendar-event" /></span>
                          <input type="text" className="form-control datetimepicker" defaultValue="29-02-2020" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Priority</label>
                        <select className="select">
                          <option>Select</option>
                          <option>High</option>
                          <option>Low</option>
                          <option>Medium</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">Status</label>
                        <select className="select">
                          <option>Select</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-wrap">
                        <label className="col-form-label">Description <span className="text-danger">*</span></label>
                        <textarea className="form-control" rows={4} defaultValue={""} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-button text-end">
                  <a href="#" className="btn btn-light sidebar-close">Cancel</a>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add New Project */}
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
                    <a href="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</a>
                    <a href="contacts.html" className="btn btn-danger">Yes, Delete it</a>
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
                    <a href="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</a>
                    <a href="contact-details.html" className="btn btn-primary">View Details</a>
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
                      <option>Senior  Manager</option>
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
                    <a href="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</a>
                    <a href="#" className="btn btn-primary">Download Now</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Event Modal */}
      </div>

    </>
  );
};

export default ProjectDashboard;
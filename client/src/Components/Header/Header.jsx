/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-semi */
import { Link, useLocation } from "react-router-dom";
import usericon from "../../Assets/user-icon.png";
import { useAuth } from "../../context/authContext.jsx";
import Search from "./Search.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [total, setTotal] = useState("");
  const { team, isLoggedIn, isLoading, validToken } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const permissions = team?.role?.permissions?.project;

  useEffect(() => {
    const fetchAllProject = async () => {
      try {
        const response = await axios.get("/api/v1/project/all-project", {
          headers: {
            Authorization: `${validToken}`,
          },
        });

        if (response?.data?.success) {
          setTotal(response?.data?.totalCount);
        };
      } catch (error) {
        console.log(error.message);
      };
    };

    if (!isLoading && team && permissions?.access) {
      fetchAllProject();
    };
  }, [isLoading, team, permissions]);

  return (
    <div className="main-wrapper">
      <div className="header">
        {/* Logo */}
        <div className="header-left active">
          <Link to="/" className="logo logo-normal">
            <img src="/assets/img/logo.svg" alt="logo" />
            <img src="/assets/img/white-logo.svg" className="white-logo" alt="whitelogo" />
          </Link>

          <Link to="/" className="logo-small">
            <img src="/assets/img/logo-small.svg" alt="logo" />
          </Link>

          <Link id="toggle_btn" to="#">
            <i className="ti ti-arrow-bar-to-left" />
          </Link>
        </div>
        {/* /Logo */}

        <a id="mobile_btn" className="mobile_btn" href="#sidebar">
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </a>

        <div className="header-user">
          <ul className="nav user-menu">
            {/* Search */}
            <li className="nav-item nav-search-inputs me-auto" style={{ visibility: currentPath === "/" ? "visible" : "hidden" }}>
              <div className="top-nav-search">
                <Link to="#" className="responsive-search">
                  <i className="fa fa-search" />
                </Link>
                <div className="dropdown">
                  <div className="searchinputs">
                    <Search />
                  </div>
                </div>
              </div>
            </li>
            {/* /Search */}

            {/* Nav List */}
            <li className="nav-item nav-list">
              <ul className="nav">
                {/* <li className="dark-mode-list">
                  <Link to="#" id="dark-mode-toggle" className="dark-mode-toggle">
                    <i className="ti ti-sun light-mode active" id="lightTheme" />
                    <i className="ti ti-moon dark-mode" id="darkTheme" />
                  </Link>
                </li> */}

                <li className="nav-item dropdown">
                  <Link to="#" className="btn btn-header-list" data-bs-toggle="dropdown">
                    <i className="ti ti-layout-grid-add" />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end menus-info">
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="menu-list">
                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-violet">
                                  <i className="ti ti-user-up" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Contacts</p>
                                  <span>Add New Contact</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-green">
                                  <i className="ti ti-timeline-event-exclamation" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Pipline</p>
                                  <span>Add New Pipline</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-pink">
                                  <i className="ti ti-bounce-right" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Activities</p>
                                  <span>Add New Activity</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-info">
                                  <i className="ti ti-analyze" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Analytics</p>
                                  <span>Shows All Information</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          <li>
                            {
                              (team?.role?.permissions?.project?.create) && (
                                <Link to="/add-project">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-violet">
                                      <i className="ti ti-briefcase"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Projects</p>
                                      <span>Add New Project</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.customer?.create) && (
                                <Link to="/add-customer">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-green">
                                      <i className="ti ti-user-circle"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Customer</p>
                                      <span>Add New Customer</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.team?.create) && (
                                <Link to="/add-team-member">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-pink">
                                      <i className="ti ti-code"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Team Member</p>
                                      <span>Add New Team Member</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.role?.create) && (
                                <Link to="/add-role">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-primary">
                                      <i className="ti ti-shield-check"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Role & Permission</p>
                                      <span>Add New Role</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.designation?.create) && (
                                <Link to="/add-designation">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-danger">
                                      <i className="ti ti-id-badge"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Designation</p>
                                      <span>Add New Designation</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <ul className="menu-list">
                          <li>
                            {
                              (team?.role?.permissions?.projectType?.create) && (
                                <Link to="/add-project-type">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-purple">
                                      <i className="ti ti-apps"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Project Type</p>
                                      <span>Add New Project Type</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.projectStatus?.create) && (
                                <Link to="/add-project-status">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-success">
                                      <i className="ti ti-clipboard-list"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Project Status</p>
                                      <span>Add New Project Status</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.projectTiming?.create) && (
                                <Link to="/add-project-timing">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-secondary">
                                      <i className="ti ti-clock"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Project Timing</p>
                                      <span>Add New Project Timing</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.projectPriority?.create) && (
                                <Link to="/add-project-priority">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-tertiary">
                                      <i className="ti ti-star"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Project Priority</p>
                                      <span>Add New Project Priority</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          <li>
                            {
                              (team?.role?.permissions?.projectCategory?.create) && (
                                <Link to="/add-project-category">
                                  <div className="menu-details">
                                    <span className="menu-list-icon bg-info">
                                      <i className="ti ti-tags"></i>
                                    </span>
                                    <div className="menu-details-content">
                                      <p>Project Category</p>
                                      <span>Add New Project Category</span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            }
                          </li>

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-info">
                                  <i className="ti ti-medal" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Deals</p>
                                  <span>Add New Deals</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-secondary">
                                  <i className="ti ti-chart-arcs" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Leads</p>
                                  <span>Add New Leads</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-tertiary">
                                  <i className="ti ti-building-community" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Company</p>
                                  <span>Add New Company</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-success">
                                  <i className="ti ti-list-check" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Tasks</p>
                                  <span>Add New Task</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link to="#">
                              <div className="menu-details">
                                <span className="menu-list-icon bg-purple">
                                  <i className="ti ti-brand-campaignmonitor" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Campaign</p>
                                  <span>Add New Campaign</span>
                                </div>
                              </div>
                            </Link>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                {/* <li className="nav-item">
                  <Link to="#" className="btn btn-help">
                    <i className="ti ti-help-hexagon" />
                  </Link>
                </li> */}

                {/* <li className="nav-item">
                  <Link to="#" className="btn btn-chart-pie">
                    <i className="ti ti-chart-pie" />
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* /Nav List */}

            {/* Email */}
            <li className="nav-item nav-item-box">
              <Link to="#">
                <i className="ti ti-briefcase"></i>
                <span className="badge rounded-pill">{total}</span>
              </Link>
            </li>
            {/* /Email */}

            {/* Notifications */}
            {/* <li className="nav-item dropdown nav-item-box">
              <Link to="#" className="nav-link" data-bs-toggle="dropdown">
                <i className="ti ti-bell" />
                <span className="badge rounded-pill">13</span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end notification-dropdown">
                <div className="topnav-dropdown-header">
                  <h4 className="notification-title">Notifications</h4>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <Link to="#">
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <img src="/assets/img/profiles/avatar-02.jpg" alt="Profile" />
                            <span className="badge badge-info rounded-pill" />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">Ray Arnold left 6 comments on Isla Nublar SOC2 compliance report</p>
                            <p className="noti-time">Last Wednesday at 9:42 am</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link to="#">
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <img src="/assets/img/profiles/avatar-03.jpg" alt="profile" />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">Denise Nedry replied to Anna Srzand</p>
                            <p className="noti-sub-details">“Oh, I finished de-bugging the phones, but the systems compiling
                              for eighteen minutes, or twenty. So, some minor systems may go on and off for a while.”</p>
                            <p className="noti-time">Last Wednesday at 9:42 am</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link to="#">
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <img alt="avatar" src="/assets/img/profiles/avatar-06.jpg" />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">John Hammond attached a file to Isla Nublar SOC2 compliance report</p>
                            <div className="noti-pdf">
                              <div className="noti-pdf-icon">
                                <span><i className="ti ti-chart-pie" /></span>
                              </div>
                              <div className="noti-pdf-text">
                                <p>EY_review.pdf</p>
                                <span>2mb</span>
                              </div>
                            </div>
                            <p className="noti-time">Last Wednesday at 9:42 am</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <Link to="#" className="view-link">View all</Link>
                  <Link to="#" className="clear-link">Clear all</Link>
                </div>
              </div>
            </li> */}
            {/* /Notifications */}

            {/* Profile Dropdown */}
            <li className="nav-item dropdown has-arrow main-drop">
              <Link to="#" className="nav-link userset" data-bs-toggle="dropdown">
                <span className="user-info">
                  <span className="user-letter">
                    <img src={usericon} alt="profile" />
                  </span>
                  <span className="badge badge-success rounded-pill" />
                </span>
              </Link>
              <div className="dropdown-menu menu-drop-user">
                <div className="profilename">
                  <Link className="dropdown-item" to="/">
                    <i className="ti ti-layout-2" /> Dashboard
                  </Link>
                  {
                    isLoggedIn ? (
                      <>
                        <Link className="dropdown-item" to="#">
                          <i className="ti ti-user" /> {team?.name}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link className="dropdown-item" to="/login">
                          <i className="ti ti-user" /> Login
                        </Link>
                      </>
                    )
                  }
                  <Link className="dropdown-item" to="/logout">
                    <i className="ti ti-lock" /> Logout
                  </Link>
                </div>
              </div>
            </li>
            {/* /Profile Dropdown */}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></Link>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/">
              <i className="ti ti-layout-2" /> Dashboard
            </Link>
            {
              isLoggedIn ? (
                <>
                  <Link className="dropdown-item" to="#">
                    <i className="ti ti-user" /> {team?.name}
                  </Link>
                </>
              ) : (
                <>
                  <Link className="dropdown-item" to="/login">
                    <i className="ti ti-user" /> Login
                  </Link>
                </>
              )
            }
            <Link className="dropdown-item" to="/logout">
              <i className="ti ti-lock" /> Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </div>
  );
};

export default Header;
/* eslint-disable no-extra-semi */
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import usericon from "../../Assets/user-icon.png";
import { useState } from "react";

const Sidebar = () => {
  const { team, isLoggedIn } = useAuth();
  const [active, setActive] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = window.innerWidth <= 768;

  const handleActive = (element) => {
    setActive(element);
  };

  return (
    <div className="main-wrapper">
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="clinicdropdown">
                <Link to="#">
                  <img src={usericon} className="img-fluid" alt="Profile" />
                  <div className="user-names">
                    {
                      isLoggedIn ? (
                        <>
                          <h5>{team?.name}</h5>
                          <h6>{team?.role?.name}</h6>
                        </>
                      ) : (
                        <>
                          <h5><Link to="/login">Login</Link></h5>
                        </>
                      )
                    }
                  </div>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <h6 className="submenu-hdr">Main Menu</h6>
                <ul>
                  <li className="submenu">
                    <Link to="#" className={currentPath === "/" ? "active subdrop" : ""}>
                      <i className="ti ti-layout-2" /><span>Dashboard</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Deals Dashboard</Link></li>
                      <li><Link to="#">Leads Dashboard</Link></li>
                      <li><Link to="/" className={(active === "projectDashboard" || currentPath === "/") ? "active" : ""} id={isMobile && active === "projectDashboard" ? "mobile_btn" : ""} onClick={() => handleActive("projectDashboard")}>Project Dashboard</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#"><i className="ti ti-brand-airtable" /><span>Application</span><span className="menu-arrow" /></Link>
                    <ul>
                      <li><Link to="#">Chat</Link></li>
                      <li className="submenu submenu-two">
                        <Link to="#">Call<span className="menu-arrow inside-submenu" /></Link>
                        <ul>
                          <li><Link to="#">Video Call</Link></li>
                          <li><Link to="#">Audio Call</Link></li>
                          <li><Link to="#">Call History</Link></li>
                        </ul>
                      </li>
                      <li><Link to="#">Calendar</Link></li>
                      <li><Link to="#">Email</Link></li>
                      <li><Link to="#">To Do</Link></li>
                      <li><Link to="#">Notes</Link></li>
                      <li><Link to="#">File Manager</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="submenu">
                    <Link to="#" className={currentPath === "/customer" || currentPath === "/team-member" || currentPath === "/role" || currentPath === "/role" || currentPath === "/designation" || currentPath === "/project-type" || currentPath === "/project-status" || currentPath === "/project-category" || currentPath === "/project-timing" ? "active subdrop" : ""}>
                      <i className="ti ti-file-invoice" /><span>Masters</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      {(team?.role?.permissions?.customer?.access) ? (<li><Link to="/customer" className={active === "customer" || currentPath === "/customer" ? "active" : ""} id={isMobile && active === "customer" ? "mobile_btn" : ""} onClick={() => handleActive("customer")}>Customer</Link></li>) : (null)}
                      {(team?.role?.permissions?.team?.access) ? (<li><Link to="/team-member" className={active === "teamMember" || currentPath === "/team-member" ? "active" : ""} id={isMobile && active === "teamMember" ? "mobile_btn" : ""} onClick={() => handleActive("teamMember")}>Team Member</Link></li>) : (null)}
                      {(team?.role?.permissions?.role?.access) ? (<li><Link to="/role" className={active === "role" || currentPath === "/role" ? "active" : ""} id={isMobile && active === "role" ? "mobile_btn" : ""} onClick={() => handleActive("role")}>Role</Link></li>) : (null)}
                      {(team?.role?.permissions?.designation?.access) ? (<li><Link to="/designation" className={active === "designation" || currentPath === "/designation" ? "active" : ""} id={isMobile && active === "designation" ? "mobile_btn" : ""} onClick={() => handleActive("designation")}>Designation</Link></li>) : (null)}
                      {(team?.role?.permissions?.projectType?.access) ? (<li><Link to="/project-type" className={active === "projectType" || currentPath === "/project-type" ? "active" : ""} id={isMobile && active === "projectType" ? "mobile_btn" : ""} onClick={() => handleActive("projectType")}>Project Type</Link></li>) : (null)}
                      {(team?.role?.permissions?.projectStatus?.access) ? (<li><Link to="/project-status" className={active === "projectStatus" || currentPath === "/project-status" ? "active" : ""} id={isMobile && active === "projectStatus" ? "mobile_btn" : ""} onClick={() => handleActive("projectStatus")}>Project Status</Link></li>) : (null)}
                      {(team?.role?.permissions?.projectCategory?.access) ? (<li><Link to="/project-category" className={active === "projectCategory" || currentPath === "/project-category" ? "active" : ""} id={isMobile && active === "projectCategory" ? "mobile_btn" : ""} onClick={() => handleActive("projectCategory")}>Project Category</Link></li>) : (null)}
                      {(team?.role?.permissions?.projectTiming?.access) ? (<li><Link to="/project-timing" className={active === "projectTiming" || currentPath === "/project-timing" ? "active" : ""} id={isMobile && active === "projectTiming" ? "mobile_btn" : ""} onClick={() => handleActive("projectTiming")}>Project Timing</Link></li>) : (null)}
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">CRM</h6>
                <ul>
                  {(team?.role?.permissions?.project?.access) ? (<li><Link to="/project" className={active === "projects" || currentPath === "/project" ? "active" : ""} id={isMobile && active === "projects" ? "mobile_btn" : ""} onClick={() => handleActive("projects")}><i className="ti ti-atom-2" /><span>Projects</span></Link></li>) : (null)}
                  <li>
                    <Link to="#"><i className="ti ti-user-up" /><span>Contacts</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-building-community" /><span>Companies</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-medal" /><span>Deals</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-chart-arcs" /><span>Leads</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-timeline-event-exclamation" /><span>Pipeline</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-brand-campaignmonitor" /><span>Campaign</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-list-check" /><span>Tasks</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-file-star" /><span>Proposals</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-file-check" /><span>Contracts</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-file-report" /><span>Estimations</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-file-invoice" /><span>Invoices</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-report-money" /><span>Payments</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-chart-bar" /><span>Analytics</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-bounce-right" /><span>Activities</span></Link>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Reports</h6>
                <ul>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-file-invoice" /><span>Reports</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Lead Reports</Link></li>
                      <li><Link to="#">Deal Reports</Link></li>
                      <li><Link to="#">Contact Reports</Link></li>
                      <li><Link to="#">Company Reports</Link></li>
                      <li><Link to="#">Project Reports</Link></li>
                      <li><Link to="#">Task Reports</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">CRM Settings</h6>
                <ul>
                  <li><Link to="#"><i className="ti ti-artboard" /><span>Sources</span></Link></li>
                  <li><Link to="#"><i className="ti ti-message-exclamation" /><span>Lost Reason</span></Link>
                  </li>
                  <li><Link to="#"><i className="ti ti-steam" /><span>Contact Stage</span></Link></li>
                  <li><Link to="#"><i className="ti ti-building-factory" /><span>Industry</span></Link></li>
                  <li><Link to="#"><i className="ti ti-phone-check" /><span>Calls</span></Link></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">User Management</h6>
                <ul>
                  <li><Link to="#"><i className="ti ti-users" /><span>Manage Users</span></Link></li>
                  <li><Link to="#"><i className="ti ti-navigation-cog" /><span>Roles &amp;
                    Permissions</span></Link></li>
                  <li><Link to="#"><i className="ti ti-flag-question" /><span>Delete Request</span></Link>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Membership</h6>
                <ul>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-file-invoice" /><span>Membership</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Membership Plans</Link></li>
                      <li><Link to="#">Membership Addons</Link></li>
                      <li><Link to="#">Transactions</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Content</h6>
                <ul>
                  <li><Link to="#"><i className="ti ti-page-break" /><span>Pages</span></Link></li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-map-pin-pin" /><span>Location</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Countries</Link></li>
                      <li><Link to="#">States</Link></li>
                      <li><Link to="#">Cities</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><i className="ti ti-quote" /><span>Testimonials</span></Link></li>
                  <li><Link to="#"><i className="ti ti-question-mark" /><span>FAQ</span></Link></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Support</h6>
                <ul>
                  <li><Link to="#"><i className="ti ti-page-break" /><span>Contact Messages</span></Link>
                  </li>
                  <li><Link to="#"><i className="ti ti-ticket" /><span>Tickets</span></Link></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Settings</h6>
                <ul>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-settings-cog" /><span>General Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Profile</Link></li>
                      <li><Link to="#">Security</Link></li>
                      <li><Link to="#">Notifications</Link></li>
                      <li><Link to="#">Connected Apps</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-world-cog" /><span>Website Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Company Settings</Link></li>
                      <li><Link to="#">Localization</Link></li>
                      <li><Link to="#">Prefixes</Link></li>
                      <li><Link to="#">Preference</Link></li>
                      <li><Link to="#">Appearance</Link></li>
                      <li><Link to="#">Language</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-apps" /><span>App Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Invoice Settings</Link></li>
                      <li><Link to="#">Printers</Link></li>
                      <li><Link to="#">Custom Fields</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-device-laptop" /><span>System Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Email Settings</Link></li>
                      <li><Link to="#">SMS Gateways</Link></li>
                      <li><Link to="#">GDPR Cookies</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-moneybag" /><span>Financial Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Payment Gateways</Link></li>
                      <li><Link to="#">Bank Accounts</Link></li>
                      <li><Link to="#">Tax Rates</Link></li>
                      <li><Link to="#">Currencies</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-flag-cog" /><span>Other Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Storage</Link></li>
                      <li><Link to="#">Ban IP Address</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Pages</h6>
                <ul>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-lock-square-rounded" /><span>Authentication</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Login</Link></li>
                      <li><Link to="#">Register</Link></li>
                      <li><Link to="#">Forgot Password</Link></li>
                      <li><Link to="#">Reset Password</Link></li>
                      <li><Link to="#">Email Verification</Link></li>
                      <li><Link to="#">2 Step Verification</Link></li>
                      <li><Link to="#">Lock Screen</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-error-404" /><span>Error Pages</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">404 Error</Link></li>
                      <li><Link to="#">500 Error</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><i className="ti ti-apps" /><span>Blank Page</span></Link></li>
                  <li><Link to="#"><i className="ti ti-device-laptop" /><span>Coming Soon</span></Link></li>
                  <li><Link to="#"><i className="ti ti-moneybag" /><span>Under Maintenance</span></Link>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">UI Interface</h6>
                <ul>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-adjustments-check" /><span>Base UI</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Alerts</Link></li>
                      <li><Link to="#">Accordion</Link></li>
                      <li><Link to="#">Avatar</Link></li>
                      <li><Link to="#">Badges</Link></li>
                      <li><Link to="#">Border</Link></li>
                      <li><Link to="#">Buttons</Link></li>
                      <li><Link to="#">Button Group</Link></li>
                      <li><Link to="#">Breadcrumb</Link></li>
                      <li><Link to="#">Card</Link></li>
                      <li><Link to="#">Carousel</Link></li>
                      <li><Link to="#">Colors</Link></li>
                      <li><Link to="#">Dropdowns</Link></li>
                      <li><Link to="#">Grid</Link></li>
                      <li><Link to="#">Images</Link></li>
                      <li><Link to="#">Lightbox</Link></li>
                      <li><Link to="#">Media</Link></li>
                      <li><Link to="#">Modals</Link></li>
                      <li><Link to="#">Offcanvas</Link></li>
                      <li><Link to="#">Pagination</Link></li>
                      <li><Link to="#">Popovers</Link></li>
                      <li><Link to="#">Progress</Link></li>
                      <li><Link to="#">Placeholders</Link></li>
                      <li><Link to="#">Range Slider</Link></li>
                      <li><Link to="#">Spinner</Link></li>
                      <li><Link to="#">Sweet Alerts</Link></li>
                      <li><Link to="#">Tabs</Link></li>
                      <li><Link to="#">Toasts</Link></li>
                      <li><Link to="#">Tooltips</Link></li>
                      <li><Link to="#">Typography</Link></li>
                      <li><Link to="#">Video</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-box-align-bottom" /><span>Advanced UI</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Ribbon</Link></li>
                      <li><Link to="#">Clipboard</Link></li>
                      <li><Link to="#">Drag &amp; Drop</Link></li>
                      <li><Link to="#">Range Slider</Link></li>
                      <li><Link to="#">Rating</Link></li>
                      <li><Link to="#">Text Editor</Link></li>
                      <li><Link to="#">Counter</Link></li>
                      <li><Link to="#">Scrollbar</Link></li>
                      <li><Link to="#">Sticky Note</Link></li>
                      <li><Link to="#">Timeline</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#"><i className="ti ti-chart-donut-2" />
                      <span>Charts</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Apex Charts</Link></li>
                      <li><Link to="#">Chart C3</Link></li>
                      <li><Link to="#">Chart Js</Link></li>
                      <li><Link to="#">Morris Charts</Link></li>
                      <li><Link to="#">Flot Charts</Link></li>
                      <li><Link to="#">Peity Charts</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#"><i className="ti ti-icons" />
                      <span>Icons</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#">Fontawesome Icons</Link></li>
                      <li><Link to="#">Feather Icons</Link></li>
                      <li><Link to="#">Ionic Icons</Link></li>
                      <li><Link to="#">Material Icons</Link></li>
                      <li><Link to="#">Pe7 Icons</Link></li>
                      <li><Link to="#">Simpleline Icons</Link></li>
                      <li><Link to="#">Themify Icons</Link></li>
                      <li><Link to="#">Weather Icons</Link></li>
                      <li><Link to="#">Typicon Icons</Link></li>
                      <li><Link to="#">Flag Icons</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-forms" /><span>Forms</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li className="submenu submenu-two">
                        <Link to="#">Form Elements<span className="menu-arrow inside-submenu" /></Link>
                        <ul>
                          <li><Link to="#">Basic Inputs</Link></li>
                          <li><Link to="#">Checkbox &amp; Radios</Link></li>
                          <li><Link to="#">Input Groups</Link></li>
                          <li><Link to="#">Grid &amp; Gutters</Link></li>
                          <li><Link to="#">Form Select</Link></li>
                          <li><Link to="#">Input Masks</Link></li>
                          <li><Link to="#">File Uploads</Link></li>
                        </ul>
                      </li>
                      <li className="submenu submenu-two">
                        <Link to="#">Layouts<span className="menu-arrow inside-submenu" /></Link>
                        <ul>
                          <li><Link to="#">Horizontal Form</Link></li>
                          <li><Link to="#">Vertical Form</Link></li>
                          <li><Link to="#">Floating Labels</Link></li>
                        </ul>
                      </li>
                      <li><Link to="#">Form Validation</Link></li>
                      <li><Link to="#">Select2</Link></li>
                      <li><Link to="#">Form Wizard</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#"><i className="ti ti-table" /><span>Tables</span><span className="menu-arrow" /></Link>
                    <ul>
                      <li><Link to="#">Basic Tables</Link></li>
                      <li><Link to="#">Data Table</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Help</h6>
                <ul>
                  <li><Link to="#"><i className="ti ti-file-type-doc" /><span>Documentation</span></Link></li>
                  <li><Link to="#"><i className="ti ti-arrow-capsule" /><span>Changelog v2.0.3</span></Link>
                  </li>
                  <li className="submenu">
                    <Link to="#"><i className="ti ti-brand-databricks" /><span>Multi Level</span><span className="menu-arrow" /></Link>
                    <ul>
                      <li><Link to="#">Level 1.1</Link></li>
                      <li className="submenu submenu-two"><Link to="#">Level 1.2<span className="menu-arrow inside-submenu" /></Link>
                        <ul>
                          <li><Link to="#">Level 2.1</Link></li>
                          <li className="submenu submenu-two submenu-three"><Link to="#">Level 2.2<span className="menu-arrow inside-submenu inside-submenu-two" /></Link>
                            <ul>
                              <li><Link to="#">Level 3.1</Link></li>
                              <li><Link to="#">Level 3.2</Link></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
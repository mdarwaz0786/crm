/* eslint-disable no-extra-semi */
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import usericon from "../../Assets/user-icon.png";
import { useState } from "react";

const Sidebar = () => {
  const { team, isLoggedIn } = useAuth();
  const permissions = team?.role?.permissions;
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
                      <li><Link to="#" id={isMobile && active === "dealsDashboard" ? "mobile_btn" : ""} onClick={() => handleActive("dealsDashboard")}>Deals Dashboard</Link></li>
                      <li><Link to="#" id={isMobile && active === "leadsDashboard" ? "mobile_btn" : ""} onClick={() => handleActive("leadsDashboard")}>Leads Dashboard</Link></li>
                      <li><Link to="/" className={(active === "projectDashboard" || currentPath === "/") ? "active" : ""} id={isMobile && active === "projectDashboard" ? "mobile_btn" : ""} onClick={() => handleActive("projectDashboard")}>Project Dashboard</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#"><i className="ti ti-brand-airtable" /><span>Application</span><span className="menu-arrow" /></Link>
                    <ul>
                      <li><Link to="#" id={isMobile && active === "chat" ? "mobile_btn" : ""} onClick={() => handleActive("chat")}>Chat</Link></li>
                      <li className="submenu submenu-two">
                        <Link to="#">Call<span className="menu-arrow inside-submenu" /></Link>
                        <ul>
                          <li><Link to="#" id={isMobile && active === "videoCall" ? "mobile_btn" : ""} onClick={() => handleActive("videoCall")}>Video Call</Link></li>
                          <li><Link to="#" id={isMobile && active === "audioCall" ? "mobile_btn" : ""} onClick={() => handleActive("audioCall")}>Audio Call</Link></li>
                          <li><Link to="#" id={isMobile && active === "callHistory" ? "mobile_btn" : ""} onClick={() => handleActive("callHistory")}>Call History</Link></li>
                        </ul>
                      </li>
                      <li><Link to="#" id={isMobile && active === "calender" ? "mobile_btn" : ""} onClick={() => handleActive("calender")}>Calendar</Link></li>
                      <li><Link to="#" id={isMobile && active === "email" ? "mobile_btn" : ""} onClick={() => handleActive("email")}>Email</Link></li>
                      <li><Link to="#" id={isMobile && active === "toDo" ? "mobile_btn" : ""} onClick={() => handleActive("toDo")}>To Do</Link></li>
                      <li><Link to="#" id={isMobile && active === "notes" ? "mobile_btn" : ""} onClick={() => handleActive("notes")}>Notes</Link></li>
                      <li><Link to="#">File Manager</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="submenu">
                    <Link to="#" className={currentPath === "/customer" || currentPath === "/edit-customer/:id" || currentPath === "/team-member" || currentPath === "/role" || currentPath === "/role" || currentPath === "/designation" || currentPath === "/project-type" || currentPath === "/project-status" || currentPath === "/project-category" || currentPath === "/project-timing" ? "active subdrop" : ""}>
                      <i className="ti ti-file-invoice" /><span>Masters</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      {
                        (permissions?.customer?.access) && (
                          <li><Link to="/customer" className={active === "customer" || currentPath === "/customer" ? "active" : ""} id={isMobile && active === "customer" ? "mobile_btn" : ""} onClick={() => handleActive("customer")}>Customer</Link></li>
                        )
                      }
                      {
                        (permissions?.team?.access) && (
                          <li><Link to="/team-member" className={active === "teamMember" || currentPath === "/team-member" ? "active" : ""} id={isMobile && active === "teamMember" ? "mobile_btn" : ""} onClick={() => handleActive("teamMember")}>Team Member</Link></li>
                        )
                      }
                      {
                        (permissions?.role?.access) && (
                          <li><Link to="/role" className={active === "role" || currentPath === "/role" ? "active" : ""} id={isMobile && active === "role" ? "mobile_btn" : ""} onClick={() => handleActive("role")}>Role</Link></li>
                        )
                      }
                      {
                        (permissions?.designation?.access) && (
                          <li><Link to="/designation" className={active === "designation" || currentPath === "/designation" ? "active" : ""} id={isMobile && active === "designation" ? "mobile_btn" : ""} onClick={() => handleActive("designation")}>Designation</Link></li>
                        )
                      }
                      {
                        (permissions?.projectType?.access) && (
                          <li><Link to="/project-type" className={active === "projectType" || currentPath === "/project-type" ? "active" : ""} id={isMobile && active === "projectType" ? "mobile_btn" : ""} onClick={() => handleActive("projectType")}>Project Type</Link></li>
                        )
                      }
                      {
                        (permissions?.projectStatus?.access) && (
                          <li><Link to="/project-status" className={active === "projectStatus" || currentPath === "/project-status" ? "active" : ""} id={isMobile && active === "projectStatus" ? "mobile_btn" : ""} onClick={() => handleActive("projectStatus")}>Project Status</Link></li>
                        )
                      }
                      {
                        (permissions?.projectCategory?.access) && (
                          <li><Link to="/project-category" className={active === "projectCategory" || currentPath === "/project-category" ? "active" : ""} id={isMobile && active === "projectCategory" ? "mobile_btn" : ""} onClick={() => handleActive("projectCategory")}>Project Category</Link></li>
                        )
                      }
                      {
                        (permissions?.projectTiming?.access) && (
                          <li><Link to="/project-timing" className={active === "projectTiming" || currentPath === "/project-timing" ? "active" : ""} id={isMobile && active === "projectTiming" ? "mobile_btn" : ""} onClick={() => handleActive("projectTiming")}>Project Timing</Link></li>
                        )
                      }
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">CRM</h6>
                <ul>
                  {
                    (permissions?.project?.access) && (
                      <li><Link to="/project" className={active === "projects" || currentPath === "/project" ? "active" : ""} id={isMobile && active === "projects" ? "mobile_btn" : ""} onClick={() => handleActive("projects")}><i className="ti ti-atom-2" /><span>Projects</span></Link></li>
                    )
                  }
                  <li>
                    <Link to="#" id={isMobile && active === "contacts" ? "mobile_btn" : ""} onClick={() => handleActive("contacts")}><i className="ti ti-user-up" /><span>Contacts</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "companies" ? "mobile_btn" : ""} onClick={() => handleActive("companies")}><i className="ti ti-building-community" /><span>Companies</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "deals" ? "mobile_btn" : ""} onClick={() => handleActive("deals")}><i className="ti ti-medal" /><span>Deals</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "leads" ? "mobile_btn" : ""} onClick={() => handleActive("leads")}><i className="ti ti-chart-arcs" /><span>Leads</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "pipeline" ? "mobile_btn" : ""} onClick={() => handleActive("pipeline")}><i className="ti ti-timeline-event-exclamation" /><span>Pipeline</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "compaign" ? "mobile_btn" : ""} onClick={() => handleActive("compaign")}><i className="ti ti-brand-campaignmonitor" /><span>Campaign</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "tasks" ? "mobile_btn" : ""} onClick={() => handleActive("tasks")}><i className="ti ti-list-check" /><span>Tasks</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "proposals" ? "mobile_btn" : ""} onClick={() => handleActive("proposals")}><i className="ti ti-file-star" /><span>Proposals</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "contracts" ? "mobile_btn" : ""} onClick={() => handleActive("contracts")}><i className="ti ti-file-check" /><span>Contracts</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "estimations" ? "mobile_btn" : ""} onClick={() => handleActive("estimations")}><i className="ti ti-file-report" /><span>Estimations</span></Link>
                  </li>
                  <li>
                    <Link to="#"><i className="ti ti-file-invoice" /><span>Invoices</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "payments" ? "mobile_btn" : ""} onClick={() => handleActive("payments")}><i className="ti ti-report-money" /><span>Payments</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "analytics" ? "mobile_btn" : ""} onClick={() => handleActive("analytics")}><i className="ti ti-chart-bar" /><span>Analytics</span></Link>
                  </li>
                  <li>
                    <Link to="#" id={isMobile && active === "activities" ? "mobile_btn" : ""} onClick={() => handleActive("activities")}><i className="ti ti-bounce-right" /><span>Activities</span></Link>
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
                      <li><Link to="#" id={isMobile && active === "dealReports" ? "mobile_btn" : ""} onClick={() => handleActive("dealReports")}>Lead Reports</Link></li>
                      <li><Link to="#" id={isMobile && active === "dealReports" ? "mobile_btn" : ""} onClick={() => handleActive("dealReports")}>Deal Reports</Link></li>
                      <li><Link to="#" id={isMobile && active === "contactReports" ? "mobile_btn" : ""} onClick={() => handleActive("contactReports")}>Contact Reports</Link></li>
                      <li><Link to="#" id={isMobile && active === "companyReports" ? "mobile_btn" : ""} onClick={() => handleActive("companyReports")}>Company Reports</Link></li>
                      <li><Link to="#" id={isMobile && active === "projectReports" ? "mobile_btn" : ""} onClick={() => handleActive("projectReports")}>Project Reports</Link></li>
                      <li><Link to="#" id={isMobile && active === "tastReports" ? "mobile_btn" : ""} onClick={() => handleActive("tastReports")}>Task Reports</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">CRM Settings</h6>
                <ul>
                  <li><Link to="#" id={isMobile && active === "sources" ? "mobile_btn" : ""} onClick={() => handleActive("sources")}><i className="ti ti-artboard" /><span>Sources</span></Link></li>
                  <li><Link to="#" id={isMobile && active === "lostReason" ? "mobile_btn" : ""} onClick={() => handleActive("lostReason")}><i className="ti ti-message-exclamation" /><span>Lost Reason</span></Link></li>
                  <li><Link to="#" id={isMobile && active === "contactStage" ? "mobile_btn" : ""} onClick={() => handleActive("contactStage")}><i className="ti ti-steam" /><span>Contact Stage</span></Link></li>
                  <li><Link to="#" id={isMobile && active === "industry" ? "mobile_btn" : ""} onClick={() => handleActive("industry")}><i className="ti ti-building-factory" /><span>Industry</span></Link></li>
                  <li><Link to="#" id={isMobile && active === "calls" ? "mobile_btn" : ""} onClick={() => handleActive("calls")}><i className="ti ti-phone-check" /><span>Calls</span></Link></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">User Management</h6>
                <ul>
                  <li><Link to="#" id={isMobile && active === "manageUsers" ? "mobile_btn" : ""} onClick={() => handleActive("manageUsers")}><i className="ti ti-users" /><span>Manage Users</span></Link></li>
                  <li><Link to="#" id={isMobile && active === "rolePermissions" ? "mobile_btn" : ""} onClick={() => handleActive("rolePermissions")}><i className="ti ti-navigation-cog" /><span>Roles &amp;Permissions</span></Link></li>
                  <li><Link to="#" id={isMobile && active === "deleteRequest" ? "mobile_btn" : ""} onClick={() => handleActive("deleteRequest")}><i className="ti ti-flag-question" /><span>Delete Request</span></Link>
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
                      <li><Link to="#" id={isMobile && active === "membershipPlans" ? "mobile_btn" : ""} onClick={() => handleActive("membershipPlans")}>Membership Plans</Link></li>
                      <li><Link to="#" id={isMobile && active === "membershipAddons" ? "mobile_btn" : ""} onClick={() => handleActive("membershipAddons")}>Membership Addons</Link></li>
                      <li><Link to="#" id={isMobile && active === "transactions" ? "mobile_btn" : ""} onClick={() => handleActive("transactions")}>Transactions</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Content</h6>
                <ul>
                  <li><Link to="#" id={isMobile && active === "pages" ? "mobile_btn" : ""} onClick={() => handleActive("pages")}><i className="ti ti-page-break" /><span>Pages</span></Link></li>
                  <li className="submenu">
                    <Link to="#" >
                      <i className="ti ti-map-pin-pin" /><span>Location</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#" id={isMobile && active === "countries" ? "mobile_btn" : ""} onClick={() => handleActive("countries")}>Countries</Link></li>
                      <li><Link to="#" id={isMobile && active === "states" ? "mobile_btn" : ""} onClick={() => handleActive("states")}>States</Link></li>
                      <li><Link to="#" id={isMobile && active === "cities" ? "mobile_btn" : ""} onClick={() => handleActive("cities")}>Cities</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#" id={isMobile && active === "testimonials" ? "mobile_btn" : ""} onClick={() => handleActive("testimonials")}><i className="ti ti-quote" /><span>Testimonials</span></Link></li>
                  <li><Link to="#" id={isMobile && active === "faq" ? "mobile_btn" : ""} onClick={() => handleActive("faq")}><i className="ti ti-question-mark" /><span>FAQ</span></Link></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Support</h6>
                <ul>
                  <li><Link to="#" id={isMobile && active === "contactMessages" ? "mobile_btn" : ""} onClick={() => handleActive("contactMessages")}><i className="ti ti-page-break" /><span>Contact Messages</span></Link>
                  </li>
                  <li><Link to="#" id={isMobile && active === "tickets" ? "mobile_btn" : ""} onClick={() => handleActive("tickets")}><i className="ti ti-ticket" /><span>Tickets</span></Link></li>
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
                      <li><Link to="#" id={isMobile && active === "profile" ? "mobile_btn" : ""} onClick={() => handleActive("profile")}>Profile</Link></li>
                      <li><Link to="#" id={isMobile && active === "security" ? "mobile_btn" : ""} onClick={() => handleActive("security")}>Security</Link></li>
                      <li><Link to="#" id={isMobile && active === "notifications" ? "mobile_btn" : ""} onClick={() => handleActive("notifications")}>Notifications</Link></li>
                      <li><Link to="#" id={isMobile && active === "connectedApps" ? "mobile_btn" : ""} onClick={() => handleActive("connectedApps")}>Connected Apps</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-world-cog" /><span>Website Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#" id={isMobile && active === "companySettings" ? "mobile_btn" : ""} onClick={() => handleActive("companySettings")}>Company Settings</Link></li>
                      <li><Link to="#" id={isMobile && active === "localization" ? "mobile_btn" : ""} onClick={() => handleActive("localization")}>Localization</Link></li>
                      <li><Link to="#" id={isMobile && active === "prefixes" ? "mobile_btn" : ""} onClick={() => handleActive("prefixes")}>Prefixes</Link></li>
                      <li><Link to="#" id={isMobile && active === "preference" ? "mobile_btn" : ""} onClick={() => handleActive("preference")}>Preference</Link></li>
                      <li><Link to="#" id={isMobile && active === "appearance" ? "mobile_btn" : ""} onClick={() => handleActive("appearance")}>Appearance</Link></li>
                      <li><Link to="#" id={isMobile && active === "language" ? "mobile_btn" : ""} onClick={() => handleActive("language")}>Language</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-apps" /><span>App Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#" id={isMobile && active === "invoiceSettings" ? "mobile_btn" : ""} onClick={() => handleActive("invoiceSettings")}>Invoice Settings</Link></li>
                      <li><Link to="#" id={isMobile && active === "printers" ? "mobile_btn" : ""} onClick={() => handleActive("printers")}>Printers</Link></li>
                      <li><Link to="#" id={isMobile && active === "customFields" ? "mobile_btn" : ""} onClick={() => handleActive("customFields")}>Custom Fields</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-device-laptop" /><span>System Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#" id={isMobile && active === "emailSettings" ? "mobile_btn" : ""} onClick={() => handleActive("emailSettings")}>Email Settings</Link></li>
                      <li><Link to="#" id={isMobile && active === "smsGateways" ? "mobile_btn" : ""} onClick={() => handleActive("smsGateways")}>SMS Gateways</Link></li>
                      <li><Link to="#" id={isMobile && active === "gdprCookies" ? "mobile_btn" : ""} onClick={() => handleActive("gdprCookies")}>GDPR Cookies</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-moneybag" /><span>Financial Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#" id={isMobile && active === "paymentsGateways" ? "mobile_btn" : ""} onClick={() => handleActive("paymentGateways")}>Payment Gateways</Link></li>
                      <li><Link to="#" id={isMobile && active === "bankAccounts" ? "mobile_btn" : ""} onClick={() => handleActive("bankAccounts")}>Bank Accounts</Link></li>
                      <li><Link to="#" id={isMobile && active === "taxRates" ? "mobile_btn" : ""} onClick={() => handleActive("taxRates")}>Tax Rates</Link></li>
                      <li><Link to="#" id={isMobile && active === "currencies" ? "mobile_btn" : ""} onClick={() => handleActive("currencies")}>Currencies</Link></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-flag-cog" /><span>Other Settings</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="#" id={isMobile && active === "storage" ? "mobile_btn" : ""} onClick={() => handleActive("storage")}>Storage</Link></li>
                      <li><Link to="#" id={isMobile && active === "banIpAddress" ? "mobile_btn" : ""} onClick={() => handleActive("banIpAddress")}>Ban IP Address</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* <li>
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
              </li> */}

              {/* <li>
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
              </li> */}

              {/* <li>
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
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
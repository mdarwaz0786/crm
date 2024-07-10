import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import usericon from "../../Assets/user-icon.png";

const Sidebar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="main-wrapper">
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="clinicdropdown">
                <Link href="#">
                  <img src={usericon} className="img-fluid" alt="Profile" />
                  <div className="user-names">
                    {
                      isLoggedIn ? (
                        <>
                          <h5>{user?.name}</h5>
                          <h6>{user?.role?.name === "Admin" ? "" : user?.role?.name}</h6>
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
                    <a href="javascript:void(0);">
                      <i className="ti ti-layout-2" /><span>Dashboard</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="index.html">Deals Dashboard</a></li>
                      <li><a href="leads-dashboard.html">Leads Dashboard</a></li>
                      <li><a href="project-dashboard.html">Project Dashboard</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);"><i className="ti ti-brand-airtable" /><span>Application</span><span className="menu-arrow" /></a>
                    <ul>
                      <li><a href="chat.html">Chat</a></li>
                      <li className="submenu submenu-two">
                        <a href="javascript:void(0);">Call<span className="menu-arrow inside-submenu" /></a>
                        <ul>
                          <li><a href="video-call.html">Video Call</a></li>
                          <li><a href="audio-call.html">Audio Call</a></li>
                          <li><a href="call-history.html">Call History</a></li>
                        </ul>
                      </li>
                      <li><a href="calendar.html">Calendar</a></li>
                      <li><a href="email.html">Email</a></li>
                      <li><a href="todo.html">To Do</a></li>
                      <li><a href="notes.html">Notes</a></li>
                      <li><a href="file-manager.html">File Manager</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="submenu">
                    <Link to="#">
                      <i className="ti ti-file-invoice" /><span>Master</span><span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li><Link to="/customer">Customer</Link></li>
                      <li><Link to="/team-member">Team Member</Link></li>
                      <li><Link to="/role">Role</Link></li>
                      <li><Link to="/project-type">Project Type</Link></li>
                      <li><Link to="/project-status">Project Status</Link></li>
                      <li><Link to="/project-category">Project Category</Link></li>
                      <li><Link to="/project-timing">Project Timing</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">CRM</h6>
                <ul>
                  <li>
                    <Link to="/project"><i className="ti ti-atom-2" /><span>Projects</span></Link>
                  </li>
                  <li>
                    <Link to="/user"><i className="ti ti-user" /><span>Users</span></Link>
                  </li>
                  <li>
                    <a href="contacts.html"><i className="ti ti-user-up" /><span>Contacts</span></a>
                  </li>
                  <li>
                    <a href="companies.html"><i className="ti ti-building-community" /><span>Companies</span></a>
                  </li>
                  <li>
                    <a href="deals.html"><i className="ti ti-medal" /><span>Deals</span></a>
                  </li>
                  <li>
                    <a href="leads.html"><i className="ti ti-chart-arcs" /><span>Leads</span></a>
                  </li>
                  <li>
                    <a href="pipeline.html"><i className="ti ti-timeline-event-exclamation" /><span>Pipeline</span></a>
                  </li>
                  <li>
                    <a href="campaign.html"><i className="ti ti-brand-campaignmonitor" /><span>Campaign</span></a>
                  </li>
                  <li>
                    <a href="tasks.html"><i className="ti ti-list-check" /><span>Tasks</span></a>
                  </li>
                  <li>
                    <a href="proposals.html"><i className="ti ti-file-star" /><span>Proposals</span></a>
                  </li>
                  <li>
                    <a href="contracts.html"><i className="ti ti-file-check" /><span>Contracts</span></a>
                  </li>
                  <li>
                    <a href="estimations.html"><i className="ti ti-file-report" /><span>Estimations</span></a>
                  </li>
                  <li>
                    <a href="invoices.html"><i className="ti ti-file-invoice" /><span>Invoices</span></a>
                  </li>
                  <li>
                    <a href="payments.html"><i className="ti ti-report-money" /><span>Payments</span></a>
                  </li>
                  <li>
                    <a href="analytics.html"><i className="ti ti-chart-bar" /><span>Analytics</span></a>
                  </li>
                  <li>
                    <a href="activities.html"><i className="ti ti-bounce-right" /><span>Activities</span></a>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Reports</h6>
                <ul>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-file-invoice" /><span>Reports</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="lead-reports.html">Lead Reports</a></li>
                      <li><a href="deal-reports.html">Deal Reports</a></li>
                      <li><a href="contact-reports.html">Contact Reports</a></li>
                      <li><a href="company-reports.html">Company Reports</a></li>
                      <li><a href="project-reports.html">Project Reports</a></li>
                      <li><a href="task-reports.html">Task Reports</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">CRM Settings</h6>
                <ul>
                  <li><a href="sources.html"><i className="ti ti-artboard" /><span>Sources</span></a></li>
                  <li><a href="lost-reason.html"><i className="ti ti-message-exclamation" /><span>Lost Reason</span></a>
                  </li>
                  <li><a href="contact-stage.html"><i className="ti ti-steam" /><span>Contact Stage</span></a></li>
                  <li><a href="industry.html"><i className="ti ti-building-factory" /><span>Industry</span></a></li>
                  <li><a href="calls.html"><i className="ti ti-phone-check" /><span>Calls</span></a></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">User Management</h6>
                <ul>
                  <li><a href="manage-users.html"><i className="ti ti-users" /><span>Manage Users</span></a></li>
                  <li><a href="roles-permissions.html"><i className="ti ti-navigation-cog" /><span>Roles &amp;
                    Permissions</span></a></li>
                  <li><a href="delete-request.html"><i className="ti ti-flag-question" /><span>Delete Request</span></a>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Membership</h6>
                <ul>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-file-invoice" /><span>Membership</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="membership-plans.html">Membership Plans</a></li>
                      <li><a href="membership-addons.html">Membership Addons</a></li>
                      <li><a href="membership-transactions.html">Transactions</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Content</h6>
                <ul>
                  <li><a href="pages.html"><i className="ti ti-page-break" /><span>Pages</span></a></li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-map-pin-pin" /><span>Location</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="countries.html">Countries</a></li>
                      <li><a href="states.html">States</a></li>
                      <li><a href="cities.html">Cities</a></li>
                    </ul>
                  </li>
                  <li><a href="testimonials.html"><i className="ti ti-quote" /><span>Testimonials</span></a></li>
                  <li><a href="faq.html"><i className="ti ti-question-mark" /><span>FAQ</span></a></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Support</h6>
                <ul>
                  <li><a href="contact-messages.html"><i className="ti ti-page-break" /><span>Contact Messages</span></a>
                  </li>
                  <li><a href="tickets.html"><i className="ti ti-ticket" /><span>Tickets</span></a></li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Settings</h6>
                <ul>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-settings-cog" /><span>General Settings</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="profile.html">Profile</a></li>
                      <li><a href="security.html">Security</a></li>
                      <li><a href="notifications.html">Notifications</a></li>
                      <li><a href="connected-apps.html">Connected Apps</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-world-cog" /><span>Website Settings</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="company-settings.html">Company Settings</a></li>
                      <li><a href="localization.html">Localization</a></li>
                      <li><a href="prefixes.html">Prefixes</a></li>
                      <li><a href="preference.html">Preference</a></li>
                      <li><a href="appearance.html">Appearance</a></li>
                      <li><a href="language.html">Language</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-apps" /><span>App Settings</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="invoice-settings.html">Invoice Settings</a></li>
                      <li><a href="printers.html">Printers</a></li>
                      <li><a href="custom-fields.html">Custom Fields</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-device-laptop" /><span>System Settings</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="email-settings.html">Email Settings</a></li>
                      <li><a href="sms-gateways.html">SMS Gateways</a></li>
                      <li><a href="gdpr-cookies.html">GDPR Cookies</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-moneybag" /><span>Financial Settings</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="payment-gateways.html">Payment Gateways</a></li>
                      <li><a href="bank-accounts.html">Bank Accounts</a></li>
                      <li><a href="tax-rates.html">Tax Rates</a></li>
                      <li><a href="currencies.html">Currencies</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-flag-cog" /><span>Other Settings</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="storage.html">Storage</a></li>
                      <li><a href="ban-ip-address.html">Ban IP Address</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Pages</h6>
                <ul>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-lock-square-rounded" /><span>Authentication</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="login.html">Login</a></li>
                      <li><a href="register.html">Register</a></li>
                      <li><a href="forgot-password.html">Forgot Password</a></li>
                      <li><a href="reset-password.html">Reset Password</a></li>
                      <li><a href="email-verification.html">Email Verification</a></li>
                      <li><a href="two-step-verification.html">2 Step Verification</a></li>
                      <li><a href="lock-screen.html">Lock Screen</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-error-404" /><span>Error Pages</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="error-404.html">404 Error</a></li>
                      <li><a href="error-500.html">500 Error</a></li>
                    </ul>
                  </li>
                  <li><a href="blank-page.html"><i className="ti ti-apps" /><span>Blank Page</span></a></li>
                  <li><a href="coming-soon.html"><i className="ti ti-device-laptop" /><span>Coming Soon</span></a></li>
                  <li><a href="under-maintenance.html"><i className="ti ti-moneybag" /><span>Under Maintenance</span></a>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">UI Interface</h6>
                <ul>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-adjustments-check" /><span>Base UI</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="ui-alerts.html">Alerts</a></li>
                      <li><a href="ui-accordion.html">Accordion</a></li>
                      <li><a href="ui-avatar.html">Avatar</a></li>
                      <li><a href="ui-badges.html">Badges</a></li>
                      <li><a href="ui-borders.html">Border</a></li>
                      <li><a href="ui-buttons.html">Buttons</a></li>
                      <li><a href="ui-buttons-group.html">Button Group</a></li>
                      <li><a href="ui-breadcrumb.html">Breadcrumb</a></li>
                      <li><a href="ui-cards.html">Card</a></li>
                      <li><a href="ui-carousel.html">Carousel</a></li>
                      <li><a href="ui-colors.html">Colors</a></li>
                      <li><a href="ui-dropdowns.html">Dropdowns</a></li>
                      <li><a href="ui-grid.html">Grid</a></li>
                      <li><a href="ui-images.html">Images</a></li>
                      <li><a href="ui-lightbox.html">Lightbox</a></li>
                      <li><a href="ui-media.html">Media</a></li>
                      <li><a href="ui-modals.html">Modals</a></li>
                      <li><a href="ui-offcanvas.html">Offcanvas</a></li>
                      <li><a href="ui-pagination.html">Pagination</a></li>
                      <li><a href="ui-popovers.html">Popovers</a></li>
                      <li><a href="ui-progress.html">Progress</a></li>
                      <li><a href="ui-placeholders.html">Placeholders</a></li>
                      <li><a href="ui-rangeslider.html">Range Slider</a></li>
                      <li><a href="ui-spinner.html">Spinner</a></li>
                      <li><a href="ui-sweetalerts.html">Sweet Alerts</a></li>
                      <li><a href="ui-nav-tabs.html">Tabs</a></li>
                      <li><a href="ui-toasts.html">Toasts</a></li>
                      <li><a href="ui-tooltips.html">Tooltips</a></li>
                      <li><a href="ui-typography.html">Typography</a></li>
                      <li><a href="ui-video.html">Video</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-box-align-bottom" /><span>Advanced UI</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="ui-ribbon.html">Ribbon</a></li>
                      <li><a href="ui-clipboard.html">Clipboard</a></li>
                      <li><a href="ui-drag-drop.html">Drag &amp; Drop</a></li>
                      <li><a href="ui-rangeslider.html">Range Slider</a></li>
                      <li><a href="ui-rating.html">Rating</a></li>
                      <li><a href="ui-text-editor.html">Text Editor</a></li>
                      <li><a href="ui-counter.html">Counter</a></li>
                      <li><a href="ui-scrollbar.html">Scrollbar</a></li>
                      <li><a href="ui-stickynote.html">Sticky Note</a></li>
                      <li><a href="ui-timeline.html">Timeline</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);"><i className="ti ti-chart-donut-2" />
                      <span>Charts</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="chart-apex.html">Apex Charts</a></li>
                      <li><a href="chart-c3.html">Chart C3</a></li>
                      <li><a href="chart-js.html">Chart Js</a></li>
                      <li><a href="chart-morris.html">Morris Charts</a></li>
                      <li><a href="chart-flot.html">Flot Charts</a></li>
                      <li><a href="chart-peity.html">Peity Charts</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);"><i className="ti ti-icons" />
                      <span>Icons</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li><a href="icon-fontawesome.html">Fontawesome Icons</a></li>
                      <li><a href="icon-feather.html">Feather Icons</a></li>
                      <li><a href="icon-ionic.html">Ionic Icons</a></li>
                      <li><a href="icon-material.html">Material Icons</a></li>
                      <li><a href="icon-pe7.html">Pe7 Icons</a></li>
                      <li><a href="icon-simpleline.html">Simpleline Icons</a></li>
                      <li><a href="icon-themify.html">Themify Icons</a></li>
                      <li><a href="icon-weather.html">Weather Icons</a></li>
                      <li><a href="icon-typicon.html">Typicon Icons</a></li>
                      <li><a href="icon-flag.html">Flag Icons</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);">
                      <i className="ti ti-forms" /><span>Forms</span><span className="menu-arrow" />
                    </a>
                    <ul>
                      <li className="submenu submenu-two">
                        <a href="javascript:void(0);">Form Elements<span className="menu-arrow inside-submenu" /></a>
                        <ul>
                          <li><a href="form-basic-inputs.html">Basic Inputs</a></li>
                          <li><a href="form-checkbox-radios.html">Checkbox &amp; Radios</a></li>
                          <li><a href="form-input-groups.html">Input Groups</a></li>
                          <li><a href="form-grid-gutters.html">Grid &amp; Gutters</a></li>
                          <li><a href="form-select.html">Form Select</a></li>
                          <li><a href="form-mask.html">Input Masks</a></li>
                          <li><a href="form-fileupload.html">File Uploads</a></li>
                        </ul>
                      </li>
                      <li className="submenu submenu-two">
                        <a href="javascript:void(0);">Layouts<span className="menu-arrow inside-submenu" /></a>
                        <ul>
                          <li><a href="form-horizontal.html">Horizontal Form</a></li>
                          <li><a href="form-vertical.html">Vertical Form</a></li>
                          <li><a href="form-floating-labels.html">Floating Labels</a></li>
                        </ul>
                      </li>
                      <li><a href="form-validation.html">Form Validation</a></li>
                      <li><a href="form-select2.html">Select2</a></li>
                      <li><a href="form-wizard.html">Form Wizard</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);"><i className="ti ti-table" /><span>Tables</span><span className="menu-arrow" /></a>
                    <ul>
                      <li><a href="tables-basic.html">Basic Tables </a></li>
                      <li><a href="data-tables.html">Data Table </a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <h6 className="submenu-hdr">Help</h6>
                <ul>
                  <li><a href="javascript:void(0);"><i className="ti ti-file-type-doc" /><span>Documentation</span></a></li>
                  <li><a href="javascript:void(0);"><i className="ti ti-arrow-capsule" /><span>Changelog v2.0.3</span></a>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);"><i className="ti ti-brand-databricks" /><span>Multi Level</span><span className="menu-arrow" /></a>
                    <ul>
                      <li><a href="javascript:void(0);">Level 1.1</a></li>
                      <li className="submenu submenu-two"><a href="javascript:void(0);">Level 1.2<span className="menu-arrow inside-submenu" /></a>
                        <ul>
                          <li><a href="javascript:void(0);">Level 2.1</a></li>
                          <li className="submenu submenu-two submenu-three"><a href="javascript:void(0);">Level 2.2<span className="menu-arrow inside-submenu inside-submenu-two" /></a>
                            <ul>
                              <li><a href="javascript:void(0);">Level 3.1</a></li>
                              <li><a href="javascript:void(0);">Level 3.2</a></li>
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
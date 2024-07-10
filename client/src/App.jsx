import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Project from "./Components/Project/Project.jsx";
import ProjectType from './Components/Project/ProjectType/projectType.jsx';
import ProjectCategory from './Components/Project/ProjectCategory/ProjectCategory.jsx';
import ProjectStatus from './Components/Project/ProjectStatus/ProjectStatus.jsx';
import Customer from './Components/Project/Customer/Customer.jsx';
import TeamMember from "./Components/Project/TeamMember/TeamMember.jsx";
import AddProject from "./Components/Project/AddProject.jsx";
import EditProject from "./Components/Project/EditProject.jsx";
import AddProjectType from "./Components/Project/ProjectType/AddProjectType.jsx";
import EditProjectType from "./Components/Project/ProjectType/EditProjectType.jsx";
import AddCustomer from "./Components/Project/Customer/AddCustomer.jsx";
import EditCustomer from "./Components/Project/Customer/EditCustomer.jsx";
import AddTeamMember from "./Components/Project/TeamMember/AddTeamMember.jsx";
import EditTeamMember from "./Components/Project/TeamMember/EditTeamMember.jsx";
import AddProjectCategory from "./Components/Project/ProjectCategory/AddProjectCategory.jsx";
import EditProjectCategory from "./Components/Project/ProjectCategory/EditProjectCategory.jsx";
import AddProjectStatus from "./Components/Project/ProjectStatus/AddProjectStatus.jsx";
import EditProjectStatus from "./Components/Project/ProjectStatus/EditProjectStatus.jsx";
import ProjectTiming from "./Components/Project/ProjectTiming/ProjectTiming.jsx";
import AddProjectTiming from "./Components/Project/ProjectTiming/AddProjectTiming.jsx";
import EditProjectTiming from "./Components/Project/ProjectTiming/EditProjectTiming.jsx";
import ProjectDashboard from "./Components/Dashboard/ProjectDashboard.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Logout from "./Components/Logout/Logout.jsx";
import Role from "./Components/Project/Role/Role.jsx";
import AddRole from "./Components/Project/Role/AddRole.jsx";
import EditRole from "./Components/Project/Role/EditRole.jsx";
import User from "./Components/User/User.jsx";
import EditUser from "./Components/User/EditUser.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<ProjectDashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="edit-customer/:id" element={<EditCustomer />} />
          <Route path="project" element={<Project />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="edit-project/:id" element={<EditProject />} />
          <Route path="project-type" element={<ProjectType />} />
          <Route path="add-project-type" element={<AddProjectType />} />
          <Route path="edit-project-type/:id" element={<EditProjectType />} />
          <Route path="project-category" element={<ProjectCategory />} />
          <Route path="add-project-category" element={<AddProjectCategory />} />
          <Route path="edit-project-category/:id" element={<EditProjectCategory />} />
          <Route path="project-status" element={<ProjectStatus />} />
          <Route path="add-project-status" element={<AddProjectStatus />} />
          <Route path="edit-project-status/:id" element={<EditProjectStatus />} />
          <Route path="team-member" element={<TeamMember />} />
          <Route path="add-team-member" element={<AddTeamMember />} />
          <Route path="edit-team-member/:id" element={<EditTeamMember />} />
          <Route path="project-timing" element={<ProjectTiming />} />
          <Route path="add-project-timing" element={<AddProjectTiming />} />
          <Route path="edit-project-timing/:id" element={<EditProjectTiming />} />
          <Route path="role" element={<Role />} />
          <Route path="add-role" element={<AddRole />} />
          <Route path="edit-role/:id" element={<EditRole />} />
          <Route path="user" element={<User />} />
          <Route path="edit-user/:id" element={<EditUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default App;
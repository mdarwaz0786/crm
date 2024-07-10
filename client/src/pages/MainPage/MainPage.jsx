import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";

const MainPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Sidebar />
    </>
  );
};

export default MainPage;
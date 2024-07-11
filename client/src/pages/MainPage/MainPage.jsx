import { Navigate, Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useAuth } from "../../context/authContext.jsx";
import Preloader from "../../Preloader.jsx";

const MainPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Sidebar />
    </>
  );
};

export default MainPage;
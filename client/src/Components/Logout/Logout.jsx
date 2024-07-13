/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import { toast } from 'react-toastify';

const Logout = () => {
  const { logOutTeam } = useAuth();

  useEffect(() => {
    logOutTeam();
    toast.success("Logout successful");
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
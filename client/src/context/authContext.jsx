/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [team, setTeam] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const validToken = `Bearer ${token}`;
  let isLoggedIn = !!token;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const logOutTeam = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const loggedInTeam = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/v1/team/loggedin-team", {
        headers: {
          Authorization: validToken,
        },
      });
      setTeam(response?.data?.team);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error while fetching logged in team member:", error.message);
    };
  };

  useEffect(() => {
    loggedInTeam();
  }, []);

  return (
    <AuthContext.Provider value={{ storeToken, logOutTeam, isLoggedIn, team, isLoading, validToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
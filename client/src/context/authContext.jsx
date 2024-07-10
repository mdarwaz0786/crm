/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const validToken = `Bearer ${token}`

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const loggedInUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/v1/user/logged-in-user", {
        headers: {
          Authorization: validToken,
        },
      });
      setUser(response?.data?.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error while fetching logged in user data");
    }
  };

  useEffect(() => {
    loggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ storeToken, logOutUser, isLoggedIn, user, isLoading, validToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
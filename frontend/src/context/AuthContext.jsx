import { createContext, useContext, useEffect, useState } from "react";
import { setLogoutHandler } from "../service/apiService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("parsed user " +user);
      if (token && user) {
        login(user, token);
      }
      setIsLoading(false);
      setLogoutHandler(logout);
    } catch (error) {
        console.log(error);
    }
  }, []);
  const login = (user, token) => {
    setIsAuthenticated(true);
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.clear("token");
  };
  const value = {
    isAuthenticated,
    isLoading,
    token,
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Invalid context");
  }
  return context;
}

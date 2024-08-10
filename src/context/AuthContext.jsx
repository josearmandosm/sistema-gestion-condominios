import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      login(token);
    } else {
      logout();
    }
  }, []);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const getToken = () => {
    return token || localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const useAuth = () => useContext(AuthContext);

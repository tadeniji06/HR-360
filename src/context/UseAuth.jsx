// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "../utils/cookies";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from cookies
  useEffect(() => {
    const initializeAuth = async () => {
      // Add minimum loading time for better UX
      const startTime = Date.now();
      const minLoadingTime = 3000; 

      try {
        const userCookie = getCookie("user");
        const tokenCookie = getCookie("auth_token");

        if (userCookie && tokenCookie) {
          const parsedUser = JSON.parse(userCookie);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
        setIsAuthenticated(false);
        // Clear potentially corrupted cookies
        deleteCookie("user");
        deleteCookie("auth_token");
      }

      // Ensure minimum loading time has passed
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minLoadingTime - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (userData, token) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setCookie("user", JSON.stringify(userData), 7);
      setCookie("auth_token", token, 7);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    deleteCookie("user");
    deleteCookie("auth_token");
  };

  // Update user data
  const updateUser = (updatedUserData) => {
    try {
      setUser(updatedUserData);
      setCookie("user", JSON.stringify(updatedUserData), 7);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
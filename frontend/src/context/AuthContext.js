import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Load user data
  const loadUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/me`
      );
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Failed to load user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Login successful!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Signup
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Account created successfully!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully");
  };

  // Update profile
  const updateProfile = async (data) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
        data
      );
      if (response.data.success) {
        setUser(response.data.user);
        toast.success("Profile updated successfully!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

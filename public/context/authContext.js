'use client'
import {SessionProvider} from 'next-auth/react'
import { getCurrentUser, logout } from "@/api/auth";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, handleLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider}


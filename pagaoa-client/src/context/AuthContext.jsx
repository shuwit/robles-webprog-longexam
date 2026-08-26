import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userInfo")) || null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(readUser);

  const login = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  const value = useMemo(
    () => ({ userInfo, login, logout }),
    [userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

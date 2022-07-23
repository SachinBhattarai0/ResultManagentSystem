import React, { useState, useContext, createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { postRequest } from "../utils/postRequest";

const UserInfoContext = createContext();
const DEFAULT_STATE = {
  id: null,
  username: null,
  isPending: false,
  isLoggedIn: false,
};
const UserInfoProvider = ({ children }) => {
  const [userState, setUserState] = useState(DEFAULT_STATE);

  const handleLogin = async (username, password) => {
    if (!username || !password) return;

    setUserState({ ...userState, isPending: true });
    let res = await postRequest("user/sign-in/", { username, password });
    res = await res.json();

    if (res.error) return console.error(res.error);
    localStorage.setItem("jwtToken", res.jwtToken);

    setUserState({
      ...userState,
      username: res.username,
      id: res.userId,
      isLoggedIn: true,
      role: res.role,
    });
    <Navigate to="/assignments/" replace />;
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    <Navigate to="/auth/signIn/" replace />;
    setUserState(DEFAULT_STATE);
  };

  useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      setUserState({ ...userState, isPending: true });
      let res = await postRequest("user/verify/", { jwtToken: token });
      if (res.status !== 200) return localStorage.removeItem("jwtToken");

      res = await res.json();
      setUserState({
        ...userState,
        id: res._id,
        isPending: false,
        role: res.role,
        isLoggedIn: true,
      });
      <Navigate to="/assignments/" replace />;
    };

    isAuth();
  }, []);
  return (
    <UserInfoContext.Provider value={{ userState, handleLogin, handleLogout }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);

export default UserInfoProvider;

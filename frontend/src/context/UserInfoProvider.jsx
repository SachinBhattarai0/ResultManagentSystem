import React, { useState, useContext, createContext, useEffect } from "react";
import { postRequest } from "../utils/api";

const UserInfoContext = createContext();
const DEFAULT_STATE = {
  id: null,
  username: null,
  isPending: false,
  isAuthenticated: false,
};
const UserInfoProvider = ({ children }) => {
  const [userState, setUserState] = useState(DEFAULT_STATE);
  console.log(userState);

  const handleLogin = () => {};
  const handleLogout = () => {};

  useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      setUserState({ ...userState, isPending: true });
      let res = await postRequest("user/verify/", { jwtToken: token });
      if (res.status !== 200) return localStorage.removeItem("jwtToken");

      res = await res.json();
      return setUserState({
        ...userState,
        id: res._id,
        username: res.username,
        isPending: false,
        role: res.role,
        isAuthenticated: true,
      });
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

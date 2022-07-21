import React, { useState, useContext, createContext } from "react";

const NavInfoContext = createContext();

const NavInfoProvider = ({ children }) => {
  const [NavState, setNavState] = useState({
    navOpen: true,
    title: "Assigned Result",
  });

  const toggleNavState = () =>
    setNavState({ ...NavState, navOpen: !NavState.navOpen });

  return (
    <NavInfoContext.Provider value={{ NavState, toggleNavState, setNavState }}>
      {children}
    </NavInfoContext.Provider>
  );
};

export const useNavInfo = () => useContext(NavInfoContext);

export default NavInfoProvider;

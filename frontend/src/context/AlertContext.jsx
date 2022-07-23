import React, { useState, useContext, createContext } from "react";
import Alert from "../components/Alert/Alert";
import { DANGER } from "../constants/messgeConstants";

const AlertContext = createContext();
const defaultState = {
  type: DANGER,
  message: "",
};
const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState(defaultState);

  const updateAlert = (message, type = DANGER) => {
    setAlertState({ type, message });
    setTimeout(() => setAlertState(defaultState), 3000);
  };

  return (
    <AlertContext.Provider value={{ alertState, updateAlert }}>
      {children}
      <Alert />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertProvider;

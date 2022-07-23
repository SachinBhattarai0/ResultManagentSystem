import React from "react";

const button = ({ children, full = false, sm = false, ...rest }) => {
  return (
    <div className={full ? "flex flex-col" : ""}>
      <button
        className={`bg-bluish text-white hover:bg-blue-500 ${
          sm ? "bg-dark-blue px-2 py-1 rounded" : "py-3 px-8 rounded-lg"
        }`}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default button;

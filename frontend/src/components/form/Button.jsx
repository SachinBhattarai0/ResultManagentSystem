import React from "react";

const button = ({ children, full = false, sm = false }) => {
  return (
    <div className={full ? "flex flex-col" : ""}>
      <button
        className={`bg-bluish text-white ${
          sm ? "bg-dark-blue px-2 py-1 rounded" : "py-3 px-8 rounded-lg"
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default button;

import React from "react";

const Spinner = () => {
  return (
    <div className="h-5 w-5 rounded-full animate-spin bg-gradient-to-br from-white m-auto">
      <div className="h-1/2 w-1/2 rounded-full bg-slate-500 top-1/2 left-1/2 translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default Spinner;

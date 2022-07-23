import React from "react";

const Th = ({ children, ...rest }) => {
  return (
    <th className="p-2 border border-b-2 border-slate-300" {...rest}>
      {children}
    </th>
  );
};

export default Th;

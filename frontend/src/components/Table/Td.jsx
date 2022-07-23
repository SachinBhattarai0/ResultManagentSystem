import React from "react";

const Td = ({ children, ...rest }) => {
  return (
    <td className="p-2 border border-slate-300 text-center" {...rest}>
      {children}
    </td>
  );
};

export default Td;

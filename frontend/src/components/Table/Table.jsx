import React from "react";

const Table = ({ children }) => {
  return (
    <table border="1" className="flex-1 bg-white rounded-md w-full">
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;

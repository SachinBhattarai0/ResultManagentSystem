import React from "react";

const form = ({children,action="",classes}) => {
  return (
    <form
      action={action}
      className={`space-y-3 rounded-2xl max-w-sm shadow-2xl px-8 py-12 ${classes}`}
    >
      {children}
    </form>
  );
};

export default form;

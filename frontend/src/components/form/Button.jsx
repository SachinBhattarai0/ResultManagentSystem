import React from "react";

const button = React.forwardRef(({ children, extraClass, ...rest }, ref) => {
  return (
    <button
      className={`bg-bluish text-white hover:bg-blue-500 rounded py-3 my-2 px-8 transition ${extraClass}`}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
});

export default button;

import React from "react";

const Select = ({ defaultVal, name, options = [], ...rest }) => {
  return (
    <div>
      <select
        name={name}
        className="p-2 ml-1 outline-none border border-gray-400 rounded-md focus:border-bluish w-full"
        {...rest}
      >
        <option value="" defaultValue>
          {defaultVal}
        </option>

        {options.map((item, i) => (
          <option key={i} value={Object.values(item)[0]}>
            {Object.values(item)[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

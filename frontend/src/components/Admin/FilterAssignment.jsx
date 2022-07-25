import React from "react";
import Select from "../form/Select";
import Button from "../form/Button";

const FilterAssignment = () => {
  return (
    <div className="bg-white m-4 rounded flex flex-col p-4">
      <h1 className="text-xl">Filter Assignments:</h1>
      <form className="py-4 space-y-2">
        <Select
          defaultVal="Select Exam"
          options={[{ value: "val", label: "value" }]}
        />
        <Select
          defaultVal="Select Class:"
          options={[{ value: "val", label: "value" }]}
        />
        <Select
          defaultVal="Select To:"
          options={[{ value: "val", label: "value" }]}
        />
        <Button
          extraClass="bg-dark-blue"
          style={{ padding: ".33rem .75rem", width: "100%" }}
        >
          Filter
        </Button>
      </form>
      <hr />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sed
        officia quidem eveniet vero modi debitis a, nemo odio obcaecati dolore
        saepe quis quae accusantium! Dicta voluptate velit maxime perspiciatis!
      </div>
    </div>
  );
};

export default FilterAssignment;

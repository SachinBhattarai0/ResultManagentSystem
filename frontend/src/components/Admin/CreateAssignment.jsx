import React from "react";
import Select from "../form/Select";
import Button from "../form/Button";

const AddAssignment = () => {
  return (
    <div className="bg-white m-4 rounded flex flex-col p-4">
      <h1 className="text-xl">Create Assignments:</h1>
      <form className="py-4 space-y-2">
        <Select
          defaultVal="Select Exam"
          options={[{ value: "val", label: "value" }]}
        />
        <Select
          defaultVal="Select Class"
          options={[{ value: "val", label: "value" }]}
        />
        <Select
          defaultVal="Select To"
          options={[{ value: "val", label: "value" }]}
        />
        <Button
          extraClass="bg-dark-blue"
          style={{ padding: ".33rem .75rem", width: "100%" }}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default AddAssignment;

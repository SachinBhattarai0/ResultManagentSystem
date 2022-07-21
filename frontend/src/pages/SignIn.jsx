import React from "react";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import FormTitle from "../components/form/FormTitle";

const SignIn = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form>
        <FormTitle>RMS LOGIN</FormTitle>
        <Input name="username" label="Username" />
        <Input name="password" label="Password" type="password" />

        <Button full>SignIn</Button>
      </Form>
    </div>
  );
};

export default SignIn;

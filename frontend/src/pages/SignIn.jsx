import React from "react";
import Input from "../container/form/Input";
import Button from "../container/form/Button";
import Form from "../container/form/Form";
import FormTitle from "../container/form/FormTitle";

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

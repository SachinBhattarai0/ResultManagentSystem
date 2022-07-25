import React, { useEffect, useState } from "react";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import FormTitle from "../components/form/FormTitle";
import { useUserInfo } from "../context/UserInfoProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { TEACHER } from "../constants/userConstants";

const SignIn = () => {
  const navigate = useNavigate();
  const { userState: user, handleLogin } = useUserInfo();
  const [userInfoState, setUserInfoState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userInfoState;

  const changeHander = ({ target }) => {
    setUserInfoState({ ...userInfoState, [target.name]: target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  useEffect(() => {
    if (user.isLoggedIn && user.role === TEACHER)
      return navigate("/assignments/", { replace: true });
    else if (user.isLoggedIn) return navigate("/admin/", { replace: true });
  }, [user]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form onSubmit={submitHandler}>
        <FormTitle>RMS LOGIN</FormTitle>
        <Input
          name="username"
          label="Username"
          value={username}
          onChange={changeHander}
          autoFocus
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={changeHander}
        />

        <Button style={{ pointerEvents: user.isPending ? "none" : "all" }}>
          {user.isPending ? <Spinner /> : "SignIn"}
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;

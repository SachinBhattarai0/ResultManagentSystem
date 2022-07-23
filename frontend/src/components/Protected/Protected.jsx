import { Navigate } from "react-router-dom";
import { useUserInfo } from "../../context/UserInfoProvider";

const Protected = ({ allowedRoles, _element }) => {
  const { userState } = useUserInfo();
  console.log(userState);

  if (!userState.isLoggedIn) return <Navigate to="/auth/signIn/" />;

  if (!allowedRoles.includes(userState.role))
    return <Navigate replace to="/not-found/" />;

  return _element;
};

export default Protected;

import { Navigate } from "react-router-dom";
import { useUserInfo } from "../../context/UserInfoProvider";

const Protected = ({ allowedRoles, el }) => {
  const { userState: user } = useUserInfo();

  if (!user.isLoggedIn) return <Navigate to="/auth/signIn/" />;

  if (!allowedRoles.includes(user.role))
    return <Navigate replace to="/not-found/" />;

  return el;
};

export default Protected;

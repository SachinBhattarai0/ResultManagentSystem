import { Navigate } from "react-router-dom";
import { SCHOOL_ADMIN, SUPERUSER } from "../../constants/userConstants";
import { useUserInfo } from "../../context/UserInfoProvider";

const Protected = ({ allowedRoles, el }) => {
  const { userState: user } = useUserInfo();

  if (!user.isLoggedIn) return <Navigate to="/auth/signIn/" />;
  if (user.role === SUPERUSER || user.role === SCHOOL_ADMIN)
    return <Navigate to="/admin/" />;
  if (!allowedRoles.includes(user.role))
    return <Navigate replace to="/not-found/" />;

  return el;
};

export default Protected;

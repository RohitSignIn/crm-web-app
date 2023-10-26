import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { Outlet } from "react-router";

export default function AuthRoutes() {
  const authUser = useSelector((state) => state.auth);

  if (authUser.isLoggedIn) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Navigate to='/signin' />;
      </>
    );
  }
}

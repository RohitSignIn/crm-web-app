import { Navigate, Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";

import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Home from "../pages/dashboard/Home";
import TicketBoard from "../pages/dashboard/TicketBoard";
import AllUsers from "../components/AllUsers";
import Error from "../pages/Error";

import { useSelector } from "react-redux";
import RaiseTicket from "../pages/dashboard/RaiseTicket";

export default function MainRoutes() {
  const authUser = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        exact
        path='/signin'
        element={!authUser?.isLoggedIn ? <Signin /> : <Navigate to='/' />}
      />
      <Route
        exact
        path='/signup'
        element={!authUser?.isLoggedIn ? <Signup /> : <Navigate to='/' />}
      />

      {/* Protected Routes  */}
      <Route path='/' element={<AuthRoutes />}>
        {/* // Home Page  */}
        <Route exact path='/' element={<Home />} />

        {/* Tickets Page -- TicketBoard  */}
        <Route path='/tickets/:status' element={<TicketBoard />} />

        {/* All Users Page */}
        <Route path='/all-users' element={<AllUsers />} />

        <Route exact path='/raise-ticket' element={<RaiseTicket />} />
      </Route>

      <Route path='*' element={<Error />} />
    </Routes>
  );
}

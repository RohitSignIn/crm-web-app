import { FcMenu } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/slices/AuthSlice";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { fetchAssignedTickets } from "../redux/slices/TicketSlice";

function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AuthUser = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    navigate("/signin");
  }

  useEffect(() => {
    if (AuthUser.isLoggedIn && AuthUser.token) {
      dispatch(fetchAssignedTickets());
    }
  }, [AuthUser]);

  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex'>
        <div className='h-screen bg-primary sticky top-0 py-[1.05rem] px-[0.6rem]'>
          <label htmlFor='my-drawer' className='drawer-button cursor-pointer'>
            <FcMenu className='text-[2rem] fill-secondary' />
          </label>
        </div>

        {/* Page Content Start  */}
        <div className='w-full'>
          <Header handleLogout={handleLogout} />
          <div className='flex flex-col items-center mt-6'>{children}</div>
        </div>
        {/* Page Content End  */}
      </div>
      <div className='drawer-side z-20'>
        <label htmlFor='my-drawer' className='drawer-overlay'></label>
        <ul className='menu p-4 w-80 h-screen bg-base-200 text-base-content'>
          {/* Sidebar content here */}
          <Sidebar handleLogout={handleLogout} />
        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;

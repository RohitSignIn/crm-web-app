import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header({ handleLogout }) {
  const authUser = useSelector((state) => state.auth);

  return (
    <div className='w-full navbar bg-base-100 stickty top-0 border-b-2 border-primary'>
      <div className='flex-1'>
        <Link to={"/"} className='btn btn-ghost normal-case text-xl'>
          Jumble
        </Link>
      </div>
      <div className='flex-none gap-2'>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <Link className='justify-between'>{authUser.user}</Link>
            </li>
            <li>
              <Link onClick={handleLogout} className='text-error'>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

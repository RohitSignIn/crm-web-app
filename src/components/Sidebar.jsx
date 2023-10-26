import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar({ handleLogout }) {
  const authUser = useSelector((state) => state.auth);

  const nav = {
    customer: [
      { label: authUser.user, path: "/profile" },
      { label: "Tickets", path: "/" },
      { label: "Raise a Ticket", path: "/raise-ticket" },
    ],

    engineer: [
      { label: authUser.user, path: "/profile" },
      { label: "Tickets", path: "/" },
      { label: "Raise a Ticket", path: "/raise-ticket" },
    ],

    admin: [
      { label: authUser.user, path: "/profile" },
      { label: "Tickets", path: "/" },
      { label: "Users", path: "/all-users" },
    ],
  };

  return (
    <div className='h-screen flex flex-col justify-between'>
      <div>
        {authUser &&
          nav[[authUser.role]].map((elem) => {
            return (
              <li key={elem.label}>
                <Link to={elem.path}>{elem.label}</Link>
              </li>
            );
          })}
      </div>

      <div className='mb-2'>
        <button
          onClick={handleLogout}
          className='btn btn-error w-full text-white'
        >
          Logout
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

import api from "../config/axiosInstance";

import DashboardLayout from "../layout/DashboardLayout";
import DataTableComp from "./datatable/DataTableComp";

export default function AllUsers() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState("");

  async function fetchAllUsers() {
    const res = await api.get("/users");
    if (res?.data?.result.length) setUsers(res?.data?.result);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    {
      name: "Username",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
    },
    {
      name: "Client Name",
      selector: (row) => row.clientName,
      sortable: true,
      reorder: true,
    },
  ];

  function handleRowClick(row, event) {
    setUser(row);
    document.getElementById("my_modal_1").showModal();
  }

  function handleUserChange(e) {
    const update = e.target.value;
    const name = e.target.name;
    setUser({ ...user, [name]: update });
  }

  async function submitUserUpdate() {
    try {
      let data = {
        userId: user._id,
        updates: {
          userType: user.userType,
          userStatus: user.userStatus,
          name: user.name,
          email: user.email,
          clientName: user.clientName,
        },
      };
      const res = await api.patch("user/updateUser", data);
      if (res?.data?.result) {
        document.getElementById("my_modal_1").close();
        setUser("");
        fetchAllUsers();
      }
    } catch (err) {
      console.log("Error Occured:", err);
    }
  }

  return (
    <>
      {/* Pupulating user in Data Table */}
      <DashboardLayout>
        <div>
          {users && (
            <DataTableComp
              columns={columns}
              data={users}
              handleRowClick={handleRowClick}
            />
          )}
        </div>
      </DashboardLayout>

      {/* Form Modal PopUp on click of any row (user) */}

      <dialog id='my_modal_1' className='modal'>
        {user && (
          <div className='modal-box min-h-[500px] border-primary border-2'>
            <div className='flex flex-col items-center'>
              <h3 className='font-bold text-lg'>Edit!</h3>
              <div className='min-w-[320px] my-2'>
                <label className='block my-2 self-start' htmlFor='username'>
                  Username
                </label>
                <input
                  type='text'
                  name='name'
                  id='username'
                  placeholder='Type Username'
                  value={user.name}
                  className='w-full input input-bordered max-w-xs'
                  onChange={handleUserChange}
                />
              </div>
              <div className='min-w-[320px] my-2'>
                <label className='block my-2 self-start' htmlFor='email'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Type Email'
                  value={user.email}
                  className='w-full input input-bordered max-w-xs'
                  onChange={handleUserChange}
                />
              </div>
              <div className='min-w-[320px] my-2'>
                <label className='block my-2 self-start' htmlFor='clientName'>
                  Client Name
                </label>
                <input
                  type='text'
                  name='clientName'
                  id='clientName'
                  placeholder='Type Client Name'
                  value={user.clientName}
                  className='w-full input input-bordered max-w-xs'
                  onChange={handleUserChange}
                />
              </div>
              <div className='modal-action'>
                <button onClick={submitUserUpdate} className='btn'>
                  Update
                </button>
                <form method='dialog'>
                  {/* if there is a button in form, it will close the modal */}
                  <button className='btn'>Close</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

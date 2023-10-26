import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../redux/slices/TicketSlice";

function RaiseTicket() {
  const dispatch = useDispatch();

  let clientName = useSelector((state) => state.auth.data);
  clientName = JSON.parse(clientName).clientName;
  const [data, setData] = React.useState({
    title: "",
    description: "",
    ticketPriority: 4,
    status: "open",
    assignedTo: "rohit@gmail.com",
    clientName,
  });

  function handleInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleTicketSubmit() {
    dispatch(createTicket(data));
    setData({
      title: "",
      description: "",
      ticketPriority: 4,
      status: "open",
      assignedTo: "rohit@gmail.com",
      clientName,
    });
  }

  return (
    <>
      <DashboardLayout>
        <div className='border-primary border-2'>
          <h3 className='bg-primary text-[2rem] text-center'>Raise a Ticket</h3>
          <div className='px-6 min-w-[400px]'>
            <div className='form-control my-2'>
              <label className='label'>
                <span className='label-text'>Title of your query</span>
              </label>
              <label className='input-group'>
                <span>Query</span>
                <input
                  name='title'
                  type='text'
                  value={data.title}
                  onChange={handleInputChange}
                  placeholder='Enter your query'
                  className='input input-bordered w-full'
                />
              </label>
            </div>

            <div className='form-control my-2'>
              <label className='label'>
                <span className='label-text'>Describe your query</span>
              </label>
              <textarea
                name='description'
                rows={4}
                value={data.description}
                onChange={handleInputChange}
                className='textarea textarea-bordered w-full'
                placeholder='Describe your query'
              ></textarea>
            </div>

            <button
              onClick={handleTicketSubmit}
              className='btn float-right mt-4 mb-6 w-full'
            >
              Submit
            </button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default RaiseTicket;

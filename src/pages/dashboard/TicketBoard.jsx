import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import DashboardLayout from "../../layout/DashboardLayout";
import TicketsCon from "../../components/tickets/TicketsCon";
import TicketsTheme from "../../components/tickets/TicketsTheme";
import { useEffect, useState } from "react";

import DataTableComp from "../../components/datatable/DataTableComp";
import {
  fetchAssignedTickets,
  updateTicket,
} from "../../redux/slices/TicketSlice";

export default function TicketBoard() {
  const userType = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  let { status } = useParams();

  // In chrome having a problem sometimes that on first refresh params become capitalize, thus making first letter small case
  status = status.charAt(0).toLowerCase() + status.slice(1);
  const ticketsTheme = TicketsTheme();

  const tickets = useSelector((state) =>
    state.tickets.ticketList.filter((t) => t.status === status)
  );

  // const [tickets, setTickets] = useState(ticketsData);
  const [ticket, setTicket] = useState("");

  function handleRowClick(row, event) {
    setTicket(row);
    document.getElementById("my_modal_1").showModal();
  }

  function handleTicketChange(e) {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  }

  async function submitTicketUpdate() {
    dispatch(updateTicket(ticket));
    document.getElementById("my_modal_1").close();
  }

  // console.log(tickets);

  const columns = [
    // {
    //   name: "Ticket Id",
    //   selector: (row) => row._id,
    //   sortable: true,
    // },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      reorder: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
    },
    {
      name: "Reporter",
      selector: (row) => row.clientName,
      sortable: true,
      reorder: true,
    },
    {
      name: "Priority",
      selector: (row) => row.ticketPriority,
      sortable: true,
      reorder: true,
    },
    {
      name: "Assignee",
      selector: (row) => row.assignee,
      sortable: true,
      reorder: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      reorder: true,
    },
  ];

  return (
    <DashboardLayout>
      <TicketsCon />
      <div className={`my-6`}>
        <DataTableComp
          columns={columns}
          data={tickets}
          handleRowClick={handleRowClick}
        />
      </div>

      {/* Form Modal PopUp on click of any row (user) */}

      <dialog id='my_modal_1' className='modal'>
        {ticket && (
          <div className='modal-box border-primary border-2 min-h-[500px] h-[80vh]'>
            <div className='flex flex-col items-center'>
              <h3 className='font-bold text-lg'>Edit!</h3>

              <div>
                <label className='block my-2 self-start' htmlFor='title'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Enter Title'
                  value={ticket.title}
                  className='w-full min-w-[320px] input input-bordered'
                  onChange={handleTicketChange}
                />
              </div>

              <div>
                <label className='block my-2 self-start' htmlFor='description'>
                  Description
                </label>
                <textarea
                  name='description'
                  id='description'
                  placeholder='Enter Description'
                  className='textarea textarea-bordered textarea-lg min-w-[320px] p-4'
                  onChange={handleTicketChange}
                >
                  {ticket.description}
                </textarea>
              </div>

              <div>
                <label
                  className='block my-2 self-start'
                  htmlFor='ticketPriority'
                >
                  Priority
                </label>
                <input
                  type='number'
                  min={1}
                  max={10}
                  name='ticketPriority'
                  id='ticketPriority'
                  value={ticket.ticketPriority}
                  className='w-full input input-bordered min-w-[320px]'
                  onChange={handleTicketChange}
                />
              </div>

              <div>
                <label className='block my-2 self-start' htmlFor='status'>
                  Status
                </label>
                <select
                  name='status'
                  className='select select-bordered w-full min-w-[320px]'
                  value={ticket.status}
                  onChange={handleTicketChange}
                >
                  <option value={"open"}>Open</option>
                  <option value={"inProgress"}>In Progress</option>
                  <option value={"resolved"}>Resolved</option>
                  <option value={"onHold"}>On Hold</option>
                  <option value={"cancelled"}>Cancelled</option>
                </select>
              </div>

              <div className='modal-action'>
                <button onClick={submitTicketUpdate} className='btn'>
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
    </DashboardLayout>
  );
}

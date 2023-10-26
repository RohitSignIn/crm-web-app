import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  ticketList: [],
  ticketCatg: {
    open: 0,
    inProgress: 0,
    resolved: 0,
    onHold: 0,
    cancelled: 0,
  },
};

const userType = {
  engineer: "getMyAssignedTickets/",
  admin: "ticket/",
  customer: "getMyCreatedTickets/",
};

// ---- Fetched All Assigned Tickets - Depends on UserType ---
export const fetchAssignedTickets = createAsyncThunk(
  "fetchAssignedTickets",
  async () => {
    try {
      if (!localStorage.getItem("isLoggedIn")) return;
      const user = localStorage.getItem("role");
      const toastId = toast.loading("Loading...");
      const response = await api.get(userType[[user]]);
      {
        if (response.status === 200 || response.status === 201) {
          toast.success("Tickets Fetched successfully", {
            id: toastId,
          });
          return response?.data?.result;
        }

        toast.error("Something went wrong, while fetching tickets", {
          id: toastId,
        });
        return false;
      }
    } catch (err) {
      console.log("error: " + err);
    }
  }
);
// ---- Fetched All Assigned Tickets END - Depends on UserType ---

// UPDATE Ticket THUNK START
export const updateTicket = createAsyncThunk("updateTicket", async (ticket) => {
  try {
    const toastId = toast.loading("Loading...");
    const response = await api.patch(`ticket/${ticket._id}`, ticket);
    console.log(response);
    {
      if (response.status === 200 || response.status === 201) {
        toast.success("Ticket updated successfully", {
          id: toastId,
        });
        return response?.data?.result;
      }
      toast.error("Something went wrong, while updating the ticket", {
        id: toastId,
      });
      return false;
    }
  } catch (err) {
    console.log("Printing error: " + err);
  }
});
// UPDATE Ticket THUNK ENDs

// CREATE Ticket THUNK START
export const createTicket = createAsyncThunk("createTicket", async (ticket) => {
  try {
    const toastId = toast.loading("Loading...");
    const response = await api.post("ticket", ticket);
    {
      if (response.status === 200 || response.status === 201) {
        toast.success("Ticket added successfully", {
          id: toastId,
        });
        return response?.data;
      }
      toast.error("Something went wrong, while adding the ticket", {
        id: toastId,
      });
      return false;
    }
  } catch (err) {
    console.log("Printing error: " + err);
  }
});
// CREATE Ticket THUNK ENDs

const TicketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    resetTickets: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssignedTickets.fulfilled, (state, action) => {
      if (!action?.payload) return;
      state.ticketList = action.payload;

      // Setting all to 0 first so in every render the for each give corect value not additional value
      state.ticketCatg = {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0,
      };

      state.ticketList.forEach((ticket) => {
        state.ticketCatg[ticket.status] += 1;
      });
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      if (action.payload) {
        const updatedTicket = action.payload;
        state.ticketList = state.ticketList.map((ticket) => {
          if (ticket._id === updatedTicket._id) {
            if (ticket.status != updatedTicket.status) {
              state.ticketCatg[[updatedTicket.status]] += 1;
              state.ticketCatg[[ticket.status]] -= 1;
            }
            return updatedTicket;
          }
          return ticket;
        });
      }
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      if (action.payload) {
        state.ticketList = [action.payload, ...state.ticketList];
        state.ticketCatg["open"] += 1;
      }
    });
  },
});

export const { resetTickets } = TicketSlice.actions;
export default TicketSlice.reducer;

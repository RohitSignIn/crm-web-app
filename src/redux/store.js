import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/AuthSlice";
import TicketSlice from "./slices/TicketSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    tickets: TicketSlice,
  },
  devTools: true,
});

export default store;

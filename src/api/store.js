import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./reducers/employeeSlice";

const store = configureStore({
  reducer: {
    employee: employeeSlice,
  },
  devTools: import.meta.env.DEV,
});

export default store;

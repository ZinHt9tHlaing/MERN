import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducer/counterReducer";
import authSlice from "./reducer/authReducer";

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export default store;

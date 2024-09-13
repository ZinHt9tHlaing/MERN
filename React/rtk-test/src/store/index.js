import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./reducer/todo";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;

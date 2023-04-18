import { configureStore } from "@reduxjs/toolkit";
import assessmentReducer from "./assessmentSlice";

export default configureStore({
  reducer: {
    assessment: assessmentReducer,
  },
});

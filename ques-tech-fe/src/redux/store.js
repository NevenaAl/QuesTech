import { configureStore } from "@reduxjs/toolkit";
import assessmentReducer from "./assessmentSlice";
import resultsReducer from "./resultsSlice";

export default configureStore({
  reducer: {
    assessment: assessmentReducer,
    results: resultsReducer,
  },
});

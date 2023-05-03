import { createSlice } from "@reduxjs/toolkit";
export const assessmentSlice = createSlice({
  name: "assessmentData",
  initialState: {
    assessmentData: undefined,
  },
  reducers: {
    setAssessmentData: (state, action) => {
      state.assessmentData = action.payload;
    },
  },
});

export const { setAssessmentData } = assessmentSlice.actions;

export default assessmentSlice.reducer;

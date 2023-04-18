import { createSlice } from "@reduxjs/toolkit";
export const assessmentSlice = createSlice({
  name: "assessmentData",
  initialState: {
    type: "",
    title: "",
    description: "",
    questions: [],
  },
  reducers: {
    setAssessmentData: (state, action) => {
      state.title = action.payload.title;
    },
  },
});

export const { setAssessmentData } = assessmentSlice.actions;

export default assessmentSlice.reducer;

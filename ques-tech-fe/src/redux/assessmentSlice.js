import { createSlice } from "@reduxjs/toolkit";
export const assessmentSlice = createSlice({
  name: "assessmentData",
  initialState: {
    assessmentData: {
      // questions: [],
      // assessmentDetails: {},
    },
  },
  reducers: {
    setAssessmentData: (state, action) => {
      state.assessmentData = action.payload;
      // state.assessmentData.questions =
      //   action.payload.assessment_details.questions;
      // state.assessmentData.assessmentDetails =
      //   action.payload.assessment_details;
      // delete state.assessmentData["assessment_details"];
      // delete state.assessmentData.assessmentDetails["questions"];
    },
  },
});

export const { setAssessmentData } = assessmentSlice.actions;

export default assessmentSlice.reducer;

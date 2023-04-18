import { createSlice } from "@reduxjs/toolkit";
export const resultsSlice = createSlice({
  name: "results",
  initialState: {
    answers: [],
    hasPassed: false,
    points: 0,
    fullName: "",
    age: 0,
    email: "",
  },
  reducers: {
    setAnwser: (state, { payload }) => {
      if (payload.questionId) {
        state[payload.questionId] = payload.answer;
      } else {
        let tempArray = [...state.answers];
        tempArray[payload.questionIndex] = payload.answer;
        state.answers = tempArray;
      }
      console.log(state.answers, state.fullName);
    },
    setMultipleChoiceAnwser: (state, { payload }) => {
      let tempArray = [...state.answers];

      if (payload.checked) {
        if (!tempArray[payload.questionIndex]) {
          tempArray[payload.questionIndex] = [];
        }
        tempArray[payload.questionIndex] = [
          ...tempArray[payload.questionIndex],
          payload.answer,
        ];
      } else {
        tempArray[payload.questionIndex] = tempArray[
          payload.questionIndex
        ].filter((answer) => answer !== payload.answer);
      }
      state.answers = tempArray;
    },
  },
});

export const { setAnwser, setMultipleChoiceAnwser } = resultsSlice.actions;

export default resultsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
export const resultsSlice = createSlice({
  name: "results",
  initialState: {
    answers: [],
    correctAnswers: [],
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
    setCorrectAnswers: (state, { payload }) => {
      const tempArray = [];
      payload.questions.forEach((question, index) => {
        if (question.answers.length > 0) {
          question.answers.forEach((answer) => {
            if (answer.is_correct) {
              if (tempArray[index]) {
                Array.isArray(tempArray[index])
                  ? (tempArray[index] = [...tempArray[index], answer.text])
                  : (tempArray[index] = [tempArray[index], answer.text]);
              } else {
                tempArray[index] = answer.text;
              }
            }
          });
        } else {
          tempArray[index] = undefined;
        }
      });
      state.correctAnswers = tempArray;
    },
  },
});

export const { setAnwser, setMultipleChoiceAnwser, setCorrectAnswers } =
  resultsSlice.actions;

export default resultsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { PASS_CRITERIA_UNIT } from "../utils/constants";
import {
  calculateNumOfCorrectAnswers,
  calculatePoints,
} from "../utils/assessmentUtil";
export const resultsSlice = createSlice({
  name: "results",
  initialState: {
    answers: [],
    correctAnswers: [],
    hasPassed: false,
    score: 0,
    passCriteria: 0,
    passCriteriaUnit: "",
    surveyScoring: [],
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
    setPassCriteria: (state, { payload }) => {
      const { assessmentDetails } = payload;
      if (assessmentDetails.percentage_required) {
        state.passCriteria = assessmentDetails.percentage_required;
        state.passCriteriaUnit = PASS_CRITERIA_UNIT.PERCENTAGE;
      } else if (assessmentDetails.points_required) {
        state.passCriteria = assessmentDetails.points_required;
        state.passCriteriaUnit = PASS_CRITERIA_UNIT.POINTS;
      } else {
        state.passCriteria = assessmentDetails.num_of_correct_answers_required;
        state.passCriteriaUnit = PASS_CRITERIA_UNIT.NUM_OF_CORRECT_ANSWERS;
      }
    },
    setSurveyScoring: (state, { payload }) => {
      state.surveyScoring = payload;
    },
    calculateQuizResults: (state, { payload }) => {
      const numOfCorrectAnswers = calculateNumOfCorrectAnswers(
        state.answers,
        state.correctAnswers
      );
      if (state.passCriteriaUnit === PASS_CRITERIA_UNIT.PERCENTAGE) {
        state.score = (numOfCorrectAnswers / state.answers.length) * 100;
      } else if (state.passCriteriaUnit === PASS_CRITERIA_UNIT.POINTS) {
        state.score = calculatePoints(
          state.answers,
          state.correctAnswers,
          payload.questions
        );
      } else if (
        state.passCriteriaUnit === PASS_CRITERIA_UNIT.NUM_OF_CORRECT_ANSWERS
      ) {
        state.score = numOfCorrectAnswers;
      }
      if (state.score >= state.passCriteria) {
        state.hasPassed = true;
      }
    },
    calculateScoredSurveyResults: (state, { payload }) => {
      let score = 0;
      payload.questions.forEach((question, index) => {
        question.answers.forEach((answer) => {
          if (answer.text === state.answers[index]) {
            score += answer.points;
            return;
          }
        });
      });

      state.score = score;
    },
  },
});

export const {
  setAnwser,
  setMultipleChoiceAnwser,
  setCorrectAnswers,
  setPassCriteria,
  setSurveyScoring,
  calculateQuizResults,
  calculateScoredSurveyResults,
} = resultsSlice.actions;

export default resultsSlice.reducer;

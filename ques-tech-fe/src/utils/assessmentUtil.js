import { personalInfoQuestions } from "./constants";

export const setAssessmentDataToLocalStorage = (assessmentData) => {
  localStorage.setItem("assessmentData", JSON.stringify(assessmentData));
};

export const getAssessmentDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("assessmentData"));
};

export const validateRequiredQuestions = (answers, questions, results) => {
  let answersValid = questions.every((question, index) => {
    if (question.required) {
      return answers[index] !== undefined;
    }
    return true;
  });
  if (results) {
    answersValid =
      answersValid &&
      personalInfoQuestions.every((question, index) => {
        if (question.required) {
          return results[question.id];
        }
        return true;
      });
  }
  return answersValid;
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const getFormattedTime = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
};

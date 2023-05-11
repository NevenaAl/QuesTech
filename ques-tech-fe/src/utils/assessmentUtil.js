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

export const getFormattedTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
};

export const calculateNumOfCorrectAnswers = (answers, correctAnswers) => {
  let count = 0;
  answers.forEach((answer, index) => {
    if (
      answer === correctAnswers[index] ||
      compareAnswers(answer, correctAnswers[index]) ||
      parseFloat(answer) === parseFloat(correctAnswers[index])
    ) {
      count++;
    }
  });
  return count;
};

export const calculatePoints = (answers, correctAnswers, questions) => {
  let points = 0;
  answers.forEach((answer, index) => {
    if (
      answer === correctAnswers[index] ||
      compareAnswers(answer, correctAnswers[index]) ||
      parseFloat(answer) ===
        parseFloat(
          typeof correctAnswers[index] === "string" && correctAnswers[index]
        )
    ) {
      points += questions[index].positive_points;
    } else if (questions[index].accept_partial_answer) {
      points += getPartialPoints(
        answer,
        correctAnswers[index],
        questions[index].positive_points
      );
    } else {
      points -= questions[index].negative_points;
    }
  });
  console.log(points);
  return points;
};

const compareAnswers = (answers, correctAnswers) => {
  if (Array.isArray(answers) && Array.isArray(correctAnswers)) {
    const answerSorted = answers.slice().sort();
    const isCorrect =
      correctAnswers.length === answers.length &&
      correctAnswers
        .slice()
        .sort()
        .every((value, index) => {
          return value === answerSorted[index];
        });
    return isCorrect;
  }
  return false;
};

const getPartialPoints = (answers, correctAnswers, points) => {
  let score = 0;
  if (Array.isArray(correctAnswers)) {
    const pointsPerQuestion = points / correctAnswers.length;
    correctAnswers.forEach((correctAnswer, index) => {
      if (
        answers === correctAnswer ||
        answers.find((answer) => answer === correctAnswer)
      ) {
        score += pointsPerQuestion;
      }
    });
  }
  return score;
};

export const getScoredSurveyResult = (surveyScoring, score) => {
  return surveyScoring.find(
    (scoring) => score >= scoring.start && score < scoring.end
  ).result;
};

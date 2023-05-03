export const setAssessmentDataToLocalStorage = (assessmentData) => {
  localStorage.setItem("assessmentData", JSON.stringify(assessmentData));
};

export const getAssessmentDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("assessmentData"));
};

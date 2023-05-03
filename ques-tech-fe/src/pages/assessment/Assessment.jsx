import { useDispatch, useSelector } from "react-redux";
import Quiz from "../../components/quiz/Quiz";
import Survey from "../../components/survey/Survey";
import { useEffect } from "react";
import { setAssessmentData } from "../../redux/assessmentSlice";
import { getAssessmentDataFromLocalStorage } from "../../utils/assessmentUtil";
import { CircularProgress } from "@mui/material";

const Assessment = () => {
  const dispatch = useDispatch();

  const assessmentData = useSelector(
    (state) => state.assessment.assessmentData
  );

  useEffect(() => {
    if (!assessmentData) {
      dispatch(setAssessmentData(getAssessmentDataFromLocalStorage()));
    }
  }, [assessmentData]);

  return assessmentData ? (
    assessmentData.type === "quiz" ? (
      <Quiz questions={assessmentData.questions}></Quiz>
    ) : (
      <Survey
        askForPersonalInfo={assessmentData.ask_for_personal_info}
        questions={assessmentData.questions}
      />
    )
  ) : (
    <CircularProgress />
  );
};

export default Assessment;

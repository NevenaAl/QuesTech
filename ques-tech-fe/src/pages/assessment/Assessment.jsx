import { useDispatch, useSelector } from "react-redux";
import Quiz from "../../components/quiz/Quiz";
import Survey from "../../components/survey/Survey";
import { useEffect } from "react";
import { setAssessmentData } from "../../redux/assessmentSlice";
import { getAssessmentDataFromLocalStorage } from "../../utils/assessmentUtil";
import { Box, CircularProgress, Typography } from "@mui/material";
import { setCorrectAnswers } from "../../redux/resultsSlice";

const Assessment = () => {
  const dispatch = useDispatch();

  const assessmentData = useSelector(
    (state) => state.assessment.assessmentData
  );

  useEffect(() => {
    if (!assessmentData) {
      const assessmentData = getAssessmentDataFromLocalStorage();
      dispatch(setAssessmentData(assessmentData));
      if (assessmentData.type === "quiz") {
        dispatch(setCorrectAnswers({ questions: assessmentData.questions }));
      }
    }
  }, [assessmentData, dispatch]);

  // TODO add can skip to end option

  return assessmentData ? (
    assessmentData.type === "quiz" ? (
      <Quiz
        title={assessmentData.title}
        description={assessmentData.description}
        askForPersonalInfo={assessmentData.ask_for_personal_info}
        questions={assessmentData.questions}
        completionTime={assessmentData.assessment_details.completion_time}
        canSkipToEnd={assessmentData.assessment_details.can_skip_to_end}
      ></Quiz>
    ) : (
      <>
        <Typography
          textAlign={"center"}
          fontSize={20}
          fontWeight={500}
          marginTop={"10px"}
        >
          {assessmentData.title}
        </Typography>
        <Typography
          textAlign={"center"}
          marginTop={"30px"}
          fontStyle={"italic"}
          style={{ opacity: 0.6 }}
        >
          {assessmentData.description}
        </Typography>
        <Survey
          askForPersonalInfo={assessmentData.ask_for_personal_info}
          questions={assessmentData.questions}
        />
      </>
    )
  ) : (
    <CircularProgress />
  );
};

export default Assessment;

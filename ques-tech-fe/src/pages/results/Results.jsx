import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Results.module.css";
import QuizResults from "../../components/quiz-results/QuizResults";
import { getScoredSurveyResult } from "../../utils/assessmentUtil";

const Results = () => {
  const navigate = useNavigate();
  const results = useSelector((state) => state.results);
  const assessmentData = useSelector(
    (state) => state.assessment.assessmentData
  );
  //TODO ispisati imas toliko od toliko you passed ili nisi
  // ako je passcriteria 0 onda nema passed samo score
  //implementirati scored survey results logiku
  useEffect(() => {
    if (!assessmentData) navigate("/");
  }, [assessmentData]);

  return assessmentData ? (
    <Box className={styles.results_wrapper}>
      {assessmentData.type === "quiz" ? (
        <QuizResults
          passCriteria={results.passCriteria}
          passCriteriaUnit={results.passCriteriaUnit}
          hasPassed={results.hasPassed}
          score={results.score}
        />
      ) : (
        <Typography>
          Thank you for taking this {assessmentData.type.replace("_", " ")}!
        </Typography>
      )}
      {assessmentData.type === "scored_survey" && (
        <Typography>
          Your survey result is:{" "}
          {getScoredSurveyResult(
            assessmentData.assessment_details.scoring,
            results.score
          )}
        </Typography>
      )}
    </Box>
  ) : (
    <CircularProgress></CircularProgress>
  );
};

export default Results;

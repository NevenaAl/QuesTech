import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <Box>
      {assessmentData.type === "quiz" ? (
        <>
          {results.hasPassed ? (
            <Typography>Congratulations! You passed the quiz!</Typography>
          ) : (
            <Typography>Sorry, you did not pass the quiz.</Typography>
          )}
          <Typography>Your score is {results.score}</Typography>
        </>
      ) : (
        <Typography>
          Thank you for taking this {assessmentData.type}.
        </Typography>
      )}
    </Box>
  ) : (
    <CircularProgress></CircularProgress>
  );
};

export default Results;

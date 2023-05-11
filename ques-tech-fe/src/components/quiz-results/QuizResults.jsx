import { Typography } from "@mui/material";

const QuizResults = ({ passCriteria, passCriteriaUnit, hasPassed, score }) => {
  return passCriteria ? (
    <>
      {hasPassed ? (
        <Typography marginBottom="30px" variant="h4">
          Congratulations! You passed the quiz!
        </Typography>
      ) : (
        <Typography marginBottom="30px" variant="h5">
          Sorry, you did not pass the quiz.
        </Typography>
      )}
      <Typography>
        Your score is {score} {passCriteriaUnit} (required score for passing is{" "}
        {passCriteria} {passCriteriaUnit}).
      </Typography>
    </>
  ) : (
    <Typography>
      Thank you for taking this quiz. You answered {score} question(s)
      correctly.
    </Typography>
  );
};

export default QuizResults;

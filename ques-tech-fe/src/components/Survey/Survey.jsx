import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Question from "../question/Question";
import styles from "./Survey.module.css";
import { personalInfoQuestions } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Alert, Snackbar, Typography } from "@mui/material";
import { validateRequiredQuestions } from "../../utils/assessmentUtil";

const Survey = ({ askForPersonalInfo, questions }) => {
  const answers = useSelector((state) => state.results.answers);
  const results = useSelector((state) => state.results);
  const [error, setError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const surveyValid = validateRequiredQuestions(
      answers,
      questions,
      askForPersonalInfo && results
    );
    if (surveyValid) {
      navigate("/assessment-results");
    } else {
      setAlertOpen(true);
      setError(true);
    }
  };

  return (
    <Box className={styles.survey_wrapper}>
      {askForPersonalInfo &&
        personalInfoQuestions.map((question, index) => (
          <Box key={index}>
            <Question
              questionId={question.id}
              question={question}
              error={error && question.required && !results[question.id]}
            />
            <hr style={{ opacity: 0.5 }}></hr>
          </Box>
        ))}
      {questions.map((question, index) => (
        <Box key={index}>
          <Question
            questionIndex={index}
            question={question}
            error={error && question.required && answers[index] === undefined}
          />
          <hr style={{ opacity: 0.5 }}></hr>
        </Box>
      ))}
      <Box className={styles.button_wrapper}>
        <Button
          style={{ float: "right" }}
          variant="contained"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please answer all required questions.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Survey;

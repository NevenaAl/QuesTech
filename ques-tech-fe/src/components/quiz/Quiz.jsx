import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";

import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import Question from "../question/Question";
import styles from "./Quiz.module.css";
import { useNavigate } from "react-router-dom";
import { personalInfoQuestions } from "../../utils/constants";
import { Alert, Snackbar, Typography } from "@mui/material";
import {
  getFormattedTime,
  validateRequiredQuestions,
} from "../../utils/assessmentUtil";
import { useSelector } from "react-redux";

const Quiz = ({
  title,
  description,
  questions,
  askForPersonalInfo,
  completionTime,
}) => {
  const answers = useSelector((state) => state.results.answers);
  const results = useSelector((state) => state.results);
  const [error, setError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const maxSteps = questions?.length;

  const handleNext = () => {
    if (activeQuestion === maxSteps - 1) {
      navigate("/assessment-results");
    } else {
      setActiveQuestion((prevactiveQuestion) => prevactiveQuestion + 1);
    }
  };

  const handleBack = () => {
    setActiveQuestion((prevactiveQuestion) => prevactiveQuestion - 1);
  };

  const handleStart = () => {
    const quizValid = validateRequiredQuestions(
      answers,
      [],
      askForPersonalInfo && results
    );
    if (quizValid) {
      setShowIntroduction(false);
    } else {
      setAlertOpen(true);
      setError(true);
    }
  };

  return (
    <Box
      className={
        (showIntroduction ? "" : styles.quiz_stepper_wrapper) +
        " " +
        styles.quiz_wrapper
      }
    >
      {showIntroduction ? (
        <>
          <Typography
            textAlign={"center"}
            fontSize={20}
            fontWeight={500}
            margin={"10px 0px"}
          >
            {title}
          </Typography>
          {description !== "" ? (
            <Typography
              textAlign={"center"}
              marginTop={"30px"}
              fontStyle={"italic"}
              style={{ opacity: 0.6 }}
            >
              {description}
            </Typography>
          ) : null}
          {completionTime ? (
            <Typography textAlign={"center"} marginTop={"30px"}>
              * You will have <b>{getFormattedTime(completionTime)}</b> to
              finish this quiz. *
            </Typography>
          ) : null}
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
          <Box className={styles.button_wrapper}>
            <Button
              size="small"
              onClick={handleStart}
              style={{ float: "right" }}
              variant="contained"
            >
              Start Quiz
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
        </>
      ) : (
        <>
          <Question
            question={questions[activeQuestion]}
            questionIndex={activeQuestion}
          />
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeQuestion}
            style={{ background: "transparent" }}
            nextButton={
              <Button size="small" onClick={handleNext}>
                {activeQuestion === maxSteps - 1 ? "Submit" : "Next"}
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeQuestion === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </>
      )}
    </Box>
  );
};

export default Quiz;

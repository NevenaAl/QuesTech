import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";

import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import Question from "../question/Question";
import styles from "./Quiz.module.css";
import { useNavigate } from "react-router-dom";
import { personalInfoQuestions } from "../../utils/constants";
import { Alert, Snackbar, Tooltip, Typography } from "@mui/material";
import {
  getFormattedTime,
  validateRequiredQuestions,
} from "../../utils/assessmentUtil";
import { useDispatch, useSelector } from "react-redux";
import { calculateQuizResults } from "../../redux/resultsSlice";

const Quiz = ({
  title,
  description,
  questions,
  askForPersonalInfo,
  completionTime,
  canSkipToEnd,
}) => {
  const answers = useSelector((state) => state.results.answers);
  const results = useSelector((state) => state.results);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const maxSteps = questions?.length;

  const [error, setError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [formattedTime, setFormattedTime] = useState(
    getFormattedTime(completionTime)
  );
  const [remainingSeconds, setRemainingSeconds] = useState(completionTime);

  useEffect(() => {
    let timer;
    if (quizStarted) {
      if (!timer && remainingSeconds > 0) {
        timer = setTimeout(countDown, 1000);
      }
    }
    if (remainingSeconds === 0) {
      handleFinish();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [quizStarted, remainingSeconds]);

  const countDown = () => {
    let seconds = remainingSeconds - 1;
    setRemainingSeconds((prevState) => prevState - 1);
    setFormattedTime(getFormattedTime(seconds));
  };

  const handleNext = () => {
    if (activeQuestion === maxSteps - 1) {
      handleFinish();
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
      setQuizStarted(true);
    } else {
      setAlertOpen(true);
      setError(true);
    }
  };

  const handleFinish = () => {
    dispatch(calculateQuizResults({ questions }));
    navigate("/assessment-results");
  };

  return (
    <Box
      className={
        (quizStarted ? styles.quiz_stepper_wrapper : "") +
        " " +
        styles.quiz_wrapper
      }
    >
      {!quizStarted ? (
        <>
          <Typography
            textAlign={"center"}
            fontSize={20}
            fontWeight={500}
            margin={"10px 0px"}
          >
            {title}
          </Typography>
          {description !== "" && (
            <Typography
              textAlign={"center"}
              marginTop={"30px"}
              fontStyle={"italic"}
              style={{ opacity: 0.6 }}
            >
              {description}
            </Typography>
          )}
          {completionTime && (
            <Typography textAlign={"center"} marginTop={"30px"}>
              * You will have <b>{formattedTime}</b> to finish this quiz. *
            </Typography>
          )}
          {results.passCriteria && (
            <>
              <Typography textAlign={"center"} marginTop={"30px"}>
                Required score for passing this quiz is{" "}
                <b>
                  {" "}
                  {results.passCriteria} {results.passCriteriaUnit}
                </b>
                .
              </Typography>
              <Typography textAlign={"center"} fontSize={12}>
                *each question can have different number of points
              </Typography>
            </>
          )}
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
          {completionTime && (
            <Typography
              textAlign={"center"}
              fontSize={20}
              style={{ position: "absolute", right: 30, top: 20 }}
            >
              <b>{formattedTime}</b>
            </Typography>
          )}
          {canSkipToEnd && (
            <Tooltip
              placement="top-start"
              title="Skip all the questions and proceed to results."
            >
              <Button
                variant="contained"
                style={{ position: "absolute", right: 30, bottom: 30 }}
                onClick={handleFinish}
              >
                Finish Quiz
              </Button>
            </Tooltip>
          )}
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

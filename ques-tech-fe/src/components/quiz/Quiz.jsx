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

const Quiz = ({ questions }) => {
  const theme = useTheme();
  const navigate = useNavigate();

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

  return (
    <Box className={styles.quiz_wrapper}>
      <Question question={questions[activeQuestion]} />
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeQuestion}
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
    </Box>
  );
};

export default Quiz;

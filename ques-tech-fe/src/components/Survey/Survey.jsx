import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Question from "../question/Question";
import styles from "./Survey.module.css";
import { personalInfoQuestions } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Survey = ({ askForPersonalInfo, questions }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/assessment-results");
  };
  return (
    <Box className={styles.survey_wrapper}>
      {/* //TODO render this in quiz somehow */}
      {askForPersonalInfo &&
        personalInfoQuestions.map((question, index) => (
          <Box key={index}>
            <Question questionId={question.id} question={question} />
            <hr style={{ opacity: 0.5 }}></hr>
          </Box>
        ))}
      {questions.map((question, index) => (
        <Box key={index}>
          <Question questionIndex={index} question={question} />
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
    </Box>
  );
};

export default Survey;

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import { useState } from "react";
import Question from "../question/Question";
import styles from "./Survey.module.css";

const Survey = ({ questions }) => {
  return (
    <Box className={styles.survey_wrapper}>
      {questions.map((question, index) => (
        <Box key={index}>
          <Question question={question} />
          <hr style={{ opacity: 0.5 }}></hr>
        </Box>
      ))}
      <Box className={styles.button_wrapper}>
        <Button style={{ float: "right" }} variant="contained">
          SUBMIT
        </Button>
      </Box>
    </Box>
  );
};

export default Survey;

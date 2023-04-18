import { FormGroup, Input, Button, Typography, Alert } from "@mui/material";
import styles from "./Welcome.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAssessmentData } from "../../redux/assessmentSlice";
import { useDispatch } from "react-redux";
import { loadAssessment } from "../../services/assessmentService";

const Welcome = () => {
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;
      if (["qt"].includes(fileName.slice(fileName.lastIndexOf(".") + 1))) {
        setFileName(fileName);
        setFileError(false);
        loadAssessment(fileName)
          .then((resp) => {
            dispatch(setAssessmentData(resp.data));
          })
          .catch((err) => {});
      } else {
        setFileName("");
        setFileError(true);
      }
    }
  };

  const navigateToAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className={styles.welcome_page_wrapper}>
      <Typography marginBottom="30px" variant="h3">
        Welcome to QuesTech
      </Typography>
      <Typography marginBottom="20px">
        To get started, choose a file from your computer and start an
        assessment!
      </Typography>

      <form style={{ marginBottom: "40px" }}>
        <FormGroup row>
          <div style={{ marginRight: "15px" }}>
            <Button
              size="small"
              color="info"
              variant="contained"
              component="label"
            >
              <span>Browse&hellip;</span>
              <input
                type="file"
                className={styles.file_input}
                accept=".qt"
                hidden
                onChange={handleFileUpload}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
            </Button>
          </div>
          <Input
            type="text"
            className="form-control"
            value={fileName}
            readOnly
          />
        </FormGroup>
      </form>
      {fileError && (
        <Alert style={{ marginBottom: "30px" }} severity="error">
          Please select only .qt files.
        </Alert>
      )}
      <Button
        onClick={navigateToAssessment}
        size="medium"
        color="success"
        variant="contained"
      >
        START
      </Button>
    </div>
  );
};

export default Welcome;

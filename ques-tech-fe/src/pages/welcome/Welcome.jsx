import {
  Button,
  Typography,
  Alert,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import styles from "./Welcome.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAssessmentData } from "../../redux/assessmentSlice";
import { useDispatch } from "react-redux";
import { loadAssessment } from "../../services/assessmentService";

const Welcome = () => {
  const [selectedExample, setSelectedExample] = useState("");
  const [path, setPath] = useState("");
  const [examples, setExamples] = useState([]);
  const [fileError, setFileError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const importAll = (r) => {
    return r.keys().map(r);
  };

  useEffect(() => {
    const filenames = importAll(
      require.context("../../../../examples", false, /\.(qt)$/)
    ).map((fileName) => {
      const temp = fileName.slice(fileName.lastIndexOf("/") + 1).split(".");
      return [temp[0], temp[2]].join(".");
    });
    setExamples(filenames);
  }, []);

  useEffect(() => {
    setPath(selectedExample);
  }, [selectedExample]);

  const navigateToAssessment = () => {
    //TODO
    // loadAssessment(path)
    //   .then((resp) => {
    //     dispatch(setAssessmentData(resp.data));
    //     navigate("/assessment");
    //   })
    //   .catch((err) => {
    //     setFileError(true);
    //   });
    navigate("/assessment");
  };

  return (
    <div className={styles.welcome_page_wrapper}>
      <Typography marginBottom="30px" variant="h3">
        Welcome to QuesTech
      </Typography>
      <Typography marginBottom="20px">
        To get started, choose an example file or enter a path to your own
        assessment!
      </Typography>
      <div className={styles.file_inputs}>
        <FormControl
          style={{ width: "250px", marginRight: 20, background: "white" }}
        >
          <InputLabel id="select-label">Select assessment</InputLabel>
          <Select
            labelId="select-label"
            value={selectedExample}
            label="Select assessment"
            onChange={(e) => setSelectedExample(e.target.value)}
          >
            {examples.map((example) => (
              <MenuItem key={example} value={example}>
                {example}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          style={{ background: "white", width: "300px" }}
          placeholder="Enter path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        ></TextField>
      </div>
      {fileError && (
        <Alert style={{ marginBottom: "30px" }} severity="error">
          There's been an error loading assessment file. Please check your path.
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

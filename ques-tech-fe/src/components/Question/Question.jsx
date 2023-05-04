import Box from "@mui/material/Box";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Paper,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Rating,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setAnwser, setMultipleChoiceAnwser } from "../../redux/resultsSlice";

const Question = ({ questionId, questionIndex, question, error }) => {
  const dispatch = useDispatch();

  const onAnswerChange = (e) => {
    questionId
      ? dispatch(setAnwser({ questionId, answer: e.target.value }))
      : dispatch(setAnwser({ questionIndex, answer: e.target.value }));
  };

  return (
    <Box>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          color: error ? "red" : "black",
          background: "transparent",
        }}
      >
        <Typography fontWeight={error ? 400 : 450}>
          {question.text} {question.required && "*"}
        </Typography>
      </Paper>
      <Box sx={{ width: "100%", p: 2 }}>
        {question.type === "multiple_choice" && (
          <FormGroup
            onChange={(e) => {
              dispatch(
                setMultipleChoiceAnwser({
                  questionIndex,
                  answer: e.target.value,
                  checked: e.target.checked,
                })
              );
            }}
          >
            {question.answers.map((answer, index) => {
              return (
                <FormControlLabel
                  key={index}
                  style={{ width: "100%" }}
                  value={answer.text}
                  control={<Checkbox />}
                  label={
                    <Typography
                      style={{ wordWrap: "break-word", width: "100%" }}
                    >
                      {answer.text}
                    </Typography>
                  }
                />
              );
            })}
          </FormGroup>
        )}
        {question.type === "single_choice" && (
          <FormControl>
            <RadioGroup onChange={onAnswerChange}>
              <FormGroup>
                {question.answers.map((answer, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      style={{ width: "100%" }}
                      value={answer.text}
                      control={<Radio />}
                      label={
                        <Typography
                          style={{ wordWrap: "break-word", width: "100%" }}
                        >
                          {answer.text}
                        </Typography>
                      }
                    />
                  );
                })}
              </FormGroup>
            </RadioGroup>
          </FormControl>
        )}
        {question.type === "number" && (
          <TextField
            onChange={onAnswerChange}
            type="number"
            style={{ background: "white" }}
          />
        )}
        {/* TODO maybe add another type for one line words which has correct answer */}
        {question.type === "open_ended" && (
          <TextareaAutosize
            onChange={onAnswerChange}
            minRows={10}
            style={{ width: "90%", background: "white" }}
          />
        )}
        {question.type === "true_false" && (
          <FormControl>
            <RadioGroup onChange={onAnswerChange} name="radio-buttons-group">
              <FormGroup>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label={question.subtype === "yes/no" ? "Yes" : "True"}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={question.subtype === "yes/no" ? "No" : "False"}
                />
              </FormGroup>
            </RadioGroup>
          </FormControl>
        )}
        {question.type === "opinion_scale" && (
          <FormControl>
            <RadioGroup onChange={onAnswerChange} row name="opinion_scale">
              {question.scale.scale_options
                ? question.scale.scale_options.map((scale_option, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={scale_option.value}
                        control={<Radio />}
                        label={scale_option.label}
                        labelPlacement="bottom"
                      />
                    );
                  })
                : (function (scales, start, end) {
                    for (let i = start; i <= end; i++) {
                      const label =
                        i === question.scale.scale_start
                          ? question.scale.scale_start_label
                          : i === question.scale.scale_end
                          ? question.scale.scale_end_label
                          : "";
                      scales.push(
                        <FormControlLabel
                          key={i}
                          value={i}
                          control={<Radio />}
                          label={label ?? ""}
                          labelPlacement="bottom"
                        />
                      );
                    }
                    return scales;
                  })([], question.scale.scale_start, question.scale.scale_end)}
            </RadioGroup>
          </FormControl>
        )}
        {question.type === "rating" && (
          <Rating
            name="simple-controlled"
            precision={0.5}
            max={question.maxRate}
            onChange={onAnswerChange}
            size="large"
          />
        )}
      </Box>
    </Box>
  );
};

export default Question;

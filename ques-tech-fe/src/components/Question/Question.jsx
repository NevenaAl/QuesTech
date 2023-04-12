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

const Question = ({ question }) => {
  return (
    <>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{question.text}</Typography>
      </Paper>
      <Box sx={{ minHeight: 250, width: "100%", p: 2 }}>
        {question.type === "multiple_choice" && (
          <FormGroup>
            {question.answers.map((answer) => {
              return (
                <FormControlLabel
                  style={{ width: "100%" }}
                  value={answer}
                  control={<Checkbox />}
                  label={
                    <Typography
                      style={{ wordWrap: "break-word", width: "100%" }}
                    >
                      {answer}
                    </Typography>
                  }
                />
              );
            })}
          </FormGroup>
        )}
        {question.type === "single_choice" && (
          <FormControl>
            <RadioGroup name="radio-buttons-group">
              <FormGroup>
                {question.answers.map((answer) => {
                  return (
                    <FormControlLabel
                      style={{ width: "100%" }}
                      value={answer}
                      control={<Radio />}
                      label={
                        <Typography
                          style={{ wordWrap: "break-word", width: "100%" }}
                        >
                          {answer}
                        </Typography>
                      }
                    />
                  );
                })}
              </FormGroup>
            </RadioGroup>
          </FormControl>
        )}
        {question.type === "number" && <TextField type="number" />}
        {question.type === "open_ended" && (
          <TextareaAutosize minRows={10} style={{ width: "90%" }} />
        )}
        {question.type === "true_false" && (
          <FormControl>
            <RadioGroup name="radio-buttons-group">
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
        {question.type === "opinion_scale" && <div></div>}
        {question.type === "rating" && (
          <Rating
            name="simple-controlled"
            // value={value}
            precision={0.5}
            max={question.maxRate}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />
        )}
      </Box>
    </>
  );
};

export default Question;

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
    <Box>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
        }}
      >
        <Typography fontWeight={450}>
          {question.text} {question.required && "*"}
        </Typography>
      </Paper>
      <Box sx={{ width: "100%", p: 2 }}>
        {question.type === "multiple_choice" && (
          <FormGroup>
            {question.answers.map((answer, index) => {
              return (
                <FormControlLabel
                  key={index}
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
                {question.answers.map((answer, index) => {
                  return (
                    <FormControlLabel
                      key={index}
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
        {question.type === "opinion_scale" && (
          <FormControl>
            <RadioGroup row name="opinion_scale">
              {question.scale_options
                ? question.scale_options.map((scale_option, index) => {
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
                        i === question.scale_start
                          ? question.scale_start_label
                          : i === question.scale_end
                          ? question.scale_end_label
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
                  })([], question.scale_start, question.scale_end)}
            </RadioGroup>
          </FormControl>
        )}
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
    </Box>
  );
};

export default Question;

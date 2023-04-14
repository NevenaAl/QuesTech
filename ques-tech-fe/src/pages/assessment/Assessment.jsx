import Quiz from "../../components/quiz/Quiz";
import Survey from "../../components/survey/Survey";
import styles from "./Assessment.module.css";
const steps = [
  {
    text: "Select campaign settings",
    type: "multiple_choice",
    answers: ["daaa", "ne", "mozda"],
  },
  {
    text: "Create an ad group",
    type: "number",
    answer: 5,
  },
  {
    text: "Create an ad group",
    type: "open_ended",
    required: true,
  },
  {
    text: "Create an ad group",
    type: "single_choice",
    answers: ["da", "ne", "mozda"],
  },
  {
    text: "Create an ad group",
    type: "true_false",
    subtype: "yes/no",
  },
  {
    text: "Create an ad group",
    type: "rating",
    maxRate: 10,
  },
  {
    text: "Create an ad group",
    type: "opinion_scale",
    scale_start: 0,
    scale_end: 5,
    scale_end_label: "Very much",
    scale_start_label: "Not at all",
  },
  {
    text: "Create an ad group",
    type: "opinion_scale",
    scale_options: [
      { value: 0, label: "a lot" },
      { value: 1, label: "so so" },
      { value: 2, label: "not" },
      { value: 3, label: "not at all" },
      { value: 5, label: "neever" },
    ],
  },
];
const Assessment = () => {
  return (
    // <Quiz questions={steps}></Quiz>
    <Survey questions={steps} />
  );
};

export default Assessment;

import Quiz from "../../components/quiz/Quiz";
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
];
const Assessment = () => {
  return (
    <div className={styles.assessment_wrapper}>
      <Quiz questions={steps}></Quiz>
    </div>
  );
};

export default Assessment;

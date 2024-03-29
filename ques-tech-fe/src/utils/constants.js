export const personalInfoQuestions = [
  {
    text: "Enter your full name.",
    type: "open_ended",
    required: true,
    id: "fullName",
  },
  {
    text: "Enter your age.",
    type: "number",
    id: "age",
  },
  {
    text: "Enter your email address.",
    type: "open_ended",
    required: true,
    id: "email",
  },
];

export const PASS_CRITERIA_UNIT = {
  POINTS: "points",
  PERCENTAGE: "%",
  NUM_OF_CORRECT_ANSWERS: "correct answers",
};

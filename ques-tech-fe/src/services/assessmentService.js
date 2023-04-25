import axios from "axios";

export const loadAssessment = async (assessmentFile) => {
  return await axios.get(`assessment`, {
    params: { assessment_file: assessmentFile },
  });
};

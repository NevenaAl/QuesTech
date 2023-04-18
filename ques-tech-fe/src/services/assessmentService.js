import axios from "axios";
// let BASE_URL = "https://fakestoreapi.com";

export const loadAssessment = async (path) => {
  //TODO
  return await axios.get(`getAssessment/?path=${path}`);
};

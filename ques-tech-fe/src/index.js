import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Quiz from "./components/quiz/Quiz";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>
);

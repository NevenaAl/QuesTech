import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Welcome from "./pages/welcome/Welcome";
import Assessment from "./pages/assessment/Assessment";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Axios from "axios";
import Results from "./pages/results/Results";

Axios.defaults.baseURL = "http://127.0.0.1:8000";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "assessment",
    element: <Assessment />,
  },
  {
    path: "assessment-results",
    element: <Results />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

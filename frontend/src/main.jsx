import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LeetCodeSubmissionGraph from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <LeetCodeSubmissionGraph />
     */}
    <LeetCodeSubmissionGraph username="Aniket_Kumar_OP" />
  </StrictMode>
);

import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import LeetCodeSubmissionGraph from "./components/LeetCodeSubmissionGraph";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");

  return (
    <div className="app">
      <h1>LeetCode Heatmap</h1>
      <UsernameForm onSubmit={setUsername} />
      <LeetCodeSubmissionGraph username={username} />
    </div>
  );
}

export default App;

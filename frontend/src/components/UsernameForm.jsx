import { useState } from "react";
import "./Form.css";

function UsernameForm({ onSubmit }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <form className="username-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your LeetCode username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="username-input"
      />
      <button type="submit" className="username-btn">
        Show Heatmap
      </button>
    </form>
  );
}

export default UsernameForm;

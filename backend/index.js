const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(cors());

app.get("/api/submissions/:username", async (req, res) => {
  const username = req.params.username;

  const query = `
    query getUserProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          submissionCalendar
        }
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { username, year: new Date().getFullYear() },
    }),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});

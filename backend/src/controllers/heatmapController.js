const heatmapController = {
  FetchHeatmap :async (req, res) => {
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
}
}

module.exports = heatmapController;

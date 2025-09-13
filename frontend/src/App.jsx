import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./App.css";

function LeetCodeSubmissionGraph({ username }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/submissions/Aniket_Kumar_OP`)
      .then((res) => res.json())
      .then((json) => {
        const parsed = JSON.parse(
          json.data.matchedUser.userCalendar.submissionCalendar
        );
        const formatted = Object.keys(parsed).map((timestamp) => ({
          date: new Date(parseInt(timestamp) * 1000).toISOString().slice(0, 10),
          count: parsed[timestamp],
        }));
        setData(formatted);
      });
  }, []);
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  return (
    <div>
      <h3>{username}'s LeetCode Submissions</h3>
      <CalendarHeatmap
        // startDate={new Date(new Date().getFullYear(), 0, 1)}
        // endDate={new Date()}
        startDate={sixMonthsAgo}
        endDate={today}
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        // classForValue={(value) => {
        //   if (!value) return "color-empty";
        //   if (value.count >= 5) return "color-github-4";
        //   if (value.count >= 3) return "color-github-3";
        //   if (value.count >= 1) return "color-github-2";
        //   return "color-github-1";
        // }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": value?.date
              ? `${value.date}: ${value.count} submissions`
              : "No submissions",
          };
        }}
      />
    </div>
  );
}

export default LeetCodeSubmissionGraph;

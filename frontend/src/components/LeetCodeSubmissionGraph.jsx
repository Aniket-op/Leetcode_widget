import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Graph.css";

function LeetCodeSubmissionGraph({ username }) {
  const [data, setData] = useState([]);
  const [range, setRange] = useState("6m"); // default 6 months
  const [customRange, setCustomRange] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:3000/api/submissions/${username}`)
      .then((res) => res.json())
      .then((json) => {
        const parsed = JSON.parse(
          json.data.matchedUser.userCalendar.submissionCalendar
        );
        const formatted = Object.keys(parsed).map((timestamp) => ({
          date: new Date(parseInt(timestamp) * 1000)
            .toISOString()
            .slice(0, 10),
          count: parsed[timestamp],
        }));
        setData(formatted);
      });
  }, [username]);

  // --- Date range logic ---
  const today = new Date();
  let startDate = new Date();

  if (range === "3m") {
    startDate.setMonth(today.getMonth() - 3);
  } else if (range === "6m") {
    startDate.setMonth(today.getMonth() - 6);
  } else if (range === "12m") {
    startDate.setFullYear(today.getFullYear() - 1);
  } else if (range === "custom" && customRange.start && customRange.end) {
    startDate = new Date(customRange.start);
    today.setTime(new Date(customRange.end).getTime());
  } else {
    startDate.setMonth(today.getMonth() - 6); // default
  }

  if (!username) return null;

  return (
    <div className="graph-container">
      <h3>{username}'s LeetCode Submissions</h3>

      {/* Range selector */}
      <div className="range-selector">
        <label>Show data for: </label>
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="12m">Last 12 Months</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {range === "custom" && (
        <div className="custom-date-inputs">
          <input
            type="date"
            value={customRange.start}
            onChange={(e) =>
              setCustomRange({ ...customRange, start: e.target.value })
            }
          />
          <input
            type="date"
            value={customRange.end}
            onChange={(e) =>
              setCustomRange({ ...customRange, end: e.target.value })
            }
          />
        </div>
      )}

      {/* Heatmap */}
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
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

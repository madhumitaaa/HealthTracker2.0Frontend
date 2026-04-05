import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { aiAPI } from "../api/ai.api";
import Loader from "../components/common/Loader";
import ErrorBanner from "../components/common/ErrorBanner";
import "../styles/dailyRoutine.css";

export default function DailyRoutine() {
  const { accessToken } = useAuth();

  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const hasFetched = useRef(false);

  // ✅ IMAGE MAP (YOUR URLs)
  const imageMap = {
    sleep:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNbnppeojxyIb2h7AWf3bGr4sgLSRdT0F1g&s",

    exercise:
      "data:image/jpeg;base64,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",

    study:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh-CiPxOpHb9Hm-4A5lF86OgH3IZ1z2JYgOA&s",

    food:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyNlGIOVxG-bPUdiEuUCfyl7SoGyRcAnh4Xg&s",

    morning:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh-CiPxOpHb9Hm-4A5lF86OgH3IZ1z2JYgOA&s",

    evening:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNbnppeojxyIb2h7AWf3bGr4sgLSRdT0F1g&s",

    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjhhYQthZ7Qju6c_oFzvh_DWZHL_sy5ZDr2g&s",
  };

  // ✅ SMART IMAGE MATCHING
  const getImageByType = (type = "", title = "") => {
    const text = (type + " " + title).toLowerCase();

    if (text.includes("sleep") || text.includes("rest"))
      return imageMap.sleep;

    if (
      text.includes("exercise") ||
      text.includes("workout") ||
      text.includes("gym")
    )
      return imageMap.exercise;

    if (
      text.includes("study") ||
      text.includes("focus") ||
      text.includes("coding")
    )
      return imageMap.study;

    if (text.includes("food") || text.includes("meal"))
      return imageMap.food;

    if (text.includes("morning"))
      return imageMap.morning;

    if (text.includes("evening") || text.includes("night"))
      return imageMap.evening;

    return imageMap.default;
  };

  // ✅ FETCH ROUTINE
  const fetchRoutine = async () => {
    if (!accessToken) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await aiAPI.getDailyRoutine();
      const data = res.data;

      if (data?.mode === "async") {
        setRoutine(null);
        setError("Routine is being generated. Try again shortly.");
        return;
      }

      const routineData =
        data?.routine || data?.data?.routine || data?.data || null;

      if (!routineData) {
        setError("No routine data received");
        return;
      }

      setRoutine(routineData);
      setCooldown(15);
    } catch (err) {
      if (err.response?.status === 429) {
        setError("Too many requests. Wait before retrying.");
        setCooldown(15);
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch routine"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ COOLDOWN TIMER
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // ✅ TOGGLE TASK
  const toggleTask = (blockIdx, taskIdx) => {
    const updated = [...routine.schedule];
    updated[blockIdx].tasks[taskIdx].done =
      !updated[blockIdx].tasks[taskIdx].done;

    setRoutine({ ...routine, schedule: updated });
  };

  return (
    <div className="page-container">
      <h1>Daily Routine</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={fetchRoutine}
          disabled={loading || cooldown > 0}
          className="generate-btn"
        >
          {loading
            ? "Generating..."
            : cooldown > 0
            ? `Wait ${cooldown}s`
            : "Generate Routine"}
        </button>
      </div>

      {error && (
        <ErrorBanner message={error} onClose={() => setError("")} />
      )}

      {loading && <Loader />}

      {!routine && !loading && (
        <p style={{ textAlign: "center" }}>
          Click "Generate Routine" to begin
        </p>
      )}

      {routine && (
        <>
          <section className="summary">
            <h2 className="subtitle">Daily Targets</h2>
            <div className="summary-grid">
              <div>🚶 Steps: {routine.summary?.steps}</div>
              <div>💧 Water: {routine.summary?.water} L</div>
              <div>😴 Sleep: {routine.summary?.sleep} hrs</div>
              <div>🔥 Calories: {routine.summary?.calories}</div>
            </div>
          </section>

          <section>
            <h2>Full Day Plan</h2>

            {routine.schedule.map((block, idx) => (
              <div key={idx} className="routine-card">
                <div className="routine-image">
                  <img
                    src={getImageByType(block.type, block.title)}
                    alt={block.title}
                    onError={(e) => {
                      e.target.src = imageMap.default;
                    }}
                  />
                </div>

                <div className="routine-content">
                  <div className="routine-header">
                    <span className="time">{block.time}</span>
                    <h3>{block.title}</h3>
                  </div>

                  {block.tasks && (
                    <ul className="task-list">
                      {block.tasks.map((task, i) => (
                        <li key={i} className="task-item">
                          <input
                            type="checkbox"
                            checked={task.done || false}
                            onChange={() => toggleTask(idx, i)}
                          />
                          <span className={task.done ? "done" : ""}>
                            {task.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {block.type?.toLowerCase().includes("exercise") && (
  <div className="exercise-section">
    <div>
      <h4>🏠 Home</h4>
      <ul>
        {block.options?.home?.map((ex, i) => (
          <li key={i}>{ex}</li>
        ))}
      </ul>
    </div>

    <div>
      <h4>🏋️ Gym</h4>
      <ul>
        {block.options?.gym?.map((ex, i) => (
          <li key={i}>{ex}</li>
        ))}
      </ul>
    </div>
  </div>
)}
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
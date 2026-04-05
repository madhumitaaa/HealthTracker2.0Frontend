import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { aiAPI } from "../api/ai.api";
import Loader from "../components/common/Loader";
import ErrorBanner from "../components/common/ErrorBanner";
import "../styles/NightReview.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#4caf50", "#f44336"];

export default function NightReview() {
  const { accessToken } = useAuth();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accessToken) return;

    let isMounted = true; // ✅ Prevent state updates if component unmounts

   const fetchReview = async () => {
  setLoading(true);
  setError("");

  try {
    const res = await aiAPI.getNightReview(); // res = res.data from API

    if (res.status !== "success") {
      throw new Error(res.message || "Failed to fetch night review");
    }

    if (isMounted) {
      const safeReview = {
        summary: res.summary || {},
        charts: res.charts || { pie: [], bar: [] },
        aiReview: res.aiReview || "No AI review available",
        completionRate: res.completionRate || 0,
        score: res.score || 0
      };
      console.log("Night review processed:", safeReview);
      setReview(safeReview);
    }

  } catch (err) {
    console.error("Night review error:", err);
    setError(err.response?.data?.message || err.message || "Failed to fetch night review");
  } finally {
    if (isMounted) setLoading(false);
  }
};

    fetchReview();

    return () => {
      isMounted = false; // cleanup
    };
  }, [accessToken]);

  if (loading) return <Loader />;
  if (error) return <ErrorBanner message={error} onClose={() => setError("")} />;
  if (!review) return <p>No night review available.</p>;

  return (
    <div className="night-review-container">
      <h1 className="title">🌙 Night Review</h1>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
       {Object.entries(review.summary || {}).map(([key, val]) => (
  <div className="card" key={key}>
    <h3>{key.toUpperCase()}</h3>
    <p>{val?.actual || 0} / {val?.planned || 0}</p>
  </div>
))}
        <div className="card highlight">
          <h3>Completion</h3>
          <p>{review.completionRate}%</p>
        </div>

        <div className="card highlight">
          <h3>Score</h3>
          <p>{review.score}</p>
        </div>
      </div>

      {/* AI REVIEW */}
      <div className="ai-card">
  <h2>AI Analysis</h2>
  <pre style={{ whiteSpace: 'pre-wrap' }}>{review.aiReview}</pre>
</div>

      {/* CHARTS */}
      <div className="charts">
        <div className="chart-card">
          <h3>Goal Completion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={review.charts?.pie || []} dataKey="value" nameKey="name">
  {(review.charts?.pie || []).map((entry, i) => (
    <Cell key={i} fill={COLORS[i % COLORS.length]} />
  ))}
</Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Planned vs Actual</h3>
          <ResponsiveContainer width="100%" height={300}>
           <BarChart data={review.charts?.bar || []}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="metric" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="planned" fill="#1e3a8a" />
  <Bar dataKey="actual" fill="#22c55e" />
</BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { entriesAPI } from '../api/entries.api';
import Loader from '../components/common/Loader';
import ErrorBanner from '../components/common/ErrorBanner';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {

  const { accessToken, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔥 QUOTES STATE (MOVE HERE)
  const quotes = [
    "😴 8 hours of sleep? Or 8 hours of scrolling?",
    "🚶‍♀️ Steps don’t count if it’s only to the fridge.",
    "💧 Water > Coffee. Yes, I said it.",
    "🏃 Your future self is begging you to move!",
    "🍔 One cheat meal is fine. 10 is a lifestyle.",
    "🧠 Mental health check: Have you gone outside today?",
    "😅 Oops! What are you doing buddy? Fix your schedule!",
    "🔥 You vs You. Start winning today.",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  // 🔥 QUOTE EFFECT (MOVE HERE)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 API EFFECT
  useEffect(() => {
    if (authLoading) return;
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await entriesAPI.getDashboardSummary();

        if (res?.status === 'success') {
          setSummary(res.data || {});
        } else {
          throw new Error(res?.message || 'Invalid response');
        }
      } catch (err) {
        setError(err?.message || 'Failed to fetch dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [accessToken, authLoading]);
if (loading) return <Loader />;

const stats = [
  { label: 'Calories', value: summary?.calories ?? 0, unit: 'kcal' },
  { label: 'Sleep', value: summary?.sleep ?? 0, unit: 'hrs' },
  { label: 'Steps', value: summary?.steps ?? 0, unit: 'steps' },
  { label: 'Heart Rate', value: summary?.heartRate ?? 0, unit: 'bpm' },
  { label: 'Mood', value: summary?.mood ?? 'Neutral', unit: '' },
  { label: 'Water Intake', value: summary?.waterIntake ?? 0, unit: 'cups' },
];

const chartData = [
  { name: "Calories", value: summary?.calories ?? 0 },
  { name: "Sleep", value: (summary?.sleep ?? 0) * 100 },
  { name: "Steps", value: (summary?.steps ?? 0) / 10 },
  { name: "Heart", value: summary?.heartRate ?? 0 },
  { name: "Water", value: (summary?.waterIntake ?? 0) * 50 },
];

return (
  <>
    <h1 className="dashboard-welcome">
      Welcome to your HealthTracker!
    </h1>

    <div className="dashboard-container">
    
    {/* LEFT PANEL */}
    <div className="report-content">
      <h1 className="page-title">Today's Summary</h1>
      <ErrorBanner message={error} onClose={() => setError('')} />

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-value">{stat.value}</h2>
            {stat.unit && <span className="stat-unit">{stat.unit}</span>}
          </div>
        ))}
      </div>

      <div className="chart-section">
        <h2 className="chart-title">Today's Analytics</h2>

       <ResponsiveContainer width="100%" height={300}>
  <BarChart 
    data={chartData}
    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
  >
    <XAxis 
      dataKey="name" 
      stroke="#0f2c4d"
      tick={{ fill: "#0f2c4d", fontSize: 12 }}
    />
    
    <YAxis 
      stroke="#0f2c4d"
      tick={{ fill: "#0f2c4d", fontSize: 12 }}
    />

    <Tooltip 
      contentStyle={{
        backgroundColor: "#ffffff",
        border: "1px solid #cce0f2",
        borderRadius: "8px",
        color: "#0f2c4d"
      }}
    />

    <Bar 
      dataKey="value" 
      fill="#0f2c4d"        // 🔥 dark navy blue bars
      radius={[6, 6, 0, 0]}
      barSize={18}          // slightly thinner bars
    />
  </BarChart>
</ResponsiveContainer>
      </div>
    </div>

    {/* RIGHT PANEL */}
    <div className="dashboard-right">
      <div className="health-quote">
        <h2>"Healthy habits, happy life."</h2>
        <p>Track your progress, stay motivated, and grow.</p>
      </div>
    </div>

    {/* INTERACTIVE QUOTE */}
    <div className="interactive-quote">
      <p>{quotes[currentQuote]}</p>

      <button
        className="chat-btn"
        onClick={() => navigate("/ai-chat")}
      >
        💬 Chat & Fix My Routine
      </button>
    </div>

  </div>
    </>
);
}
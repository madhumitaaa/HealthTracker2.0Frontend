// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { entriesAPI } from '../api/entries.api';
import Loader from '../components/common/Loader';
import ErrorBanner from '../components/common/ErrorBanner';


export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await entriesAPI.getDashboardSummary();
        setSummary(res.data.data); // ✅ FIX
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <Loader />;

  const stats = [
    { label: 'Calories', value: summary?.calories || 0, unit: 'kcal', icon: '🍽️' },
    { label: 'Sleep', value: summary?.sleep || 0, unit: 'hrs', icon: '😴' },
    { label: 'Steps', value: summary?.steps || 0, unit: 'steps', icon: '👟' },
    { label: 'Heart Rate', value: summary?.heartRate || 0, unit: 'bpm', icon: '❤️' },
    { label: 'Mood', value: summary?.mood || 'neutral', unit: '', icon: '😊' },
    { label: 'Water Intake', value: summary?.waterIntake || 0, unit: 'cups', icon: '💧' },
  ];

return (
  <div className="dashboard-container">

    {/* LEFT SIDE */}
    <div className="report-content">

      <h1 className="texttitle">Today's Summary</h1>

      <ErrorBanner message={error} onClose={() => setError('')} />

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">

            <div className="stat-card-icon">
  <span className="emoji">{stat.icon}</span>
</div>

            <p className="stat-label">{stat.label}</p>

            <h2 className="stat-value">{stat.value}</h2>

            {stat.unit && <span className="stat-unit">{stat.unit}</span>}

          </div>
        ))}
      </div>

    </div>


    {/* RIGHT SIDE IMAGE PANEL */}
    <div className="dashboard-right">

      <div className="health-quote">
        <h2>"Small daily habits create lifelong health."</h2>
        <p>Track your sleep, mood and wellness every day.</p>
      </div>

    </div>

  </div>
  
);
  
}
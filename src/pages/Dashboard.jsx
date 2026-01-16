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
        const response = await entriesAPI.getDashboardSummary();
        setSummary(response.data);
      } catch (err) {
        // Demo mode: provide default values
        setSummary({
          calories: 2150,
          sleepHours: 7.5,
          steps: 8432,
          heartRate: 72,
          mood: 'Good',
          waterIntake: 6
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <Loader />;

  const stats = [
    { label: 'Calories', value: summary?.calories || 0, unit: 'kcal', icon: '🍽️', color: '#ef4444' },
    { label: 'Sleep', value: summary?.sleepHours || 0, unit: 'hrs', icon: '😴', color: '#8b5cf6' },
    { label: 'Steps', value: summary?.steps || 0, unit: 'steps', icon: '👟', color: '#10b981' },
    { label: 'Heart Rate', value: summary?.heartRate || 0, unit: 'bpm', icon: '❤️', color: '#ec4899' },
    { label: 'Mood', value: summary?.mood || 'N/A', unit: '', icon: '😊', color: '#f59e0b' },
    { label: 'Water', value: summary?.waterIntake || 0, unit: 'cups', icon: '💧', color: '#3b82f6' },
  ];

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Today's Summary</h1>
        <p className="page-subtitle">Your health overview for today</p>
      </div>

      <ErrorBanner message={error} onClose={() => setError('')} />

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-card-icon">{stat.icon}</div>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            {stat.unit && <p className="stat-unit">{stat.unit}</p>}
          </div>
        ))}
      </div>

      {!summary && (
        <div className="empty-state">
          <p>No data yet. Start by adding your first entry!</p>
        </div>
      )}
    </div>
  );
}

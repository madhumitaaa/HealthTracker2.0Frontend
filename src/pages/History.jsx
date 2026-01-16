import { useState, useEffect } from 'react';
import { entriesAPI } from '../api/entries.api';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorBanner from '../components/common/ErrorBanner';

export default function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await entriesAPI.getAll();
        setEntries(response.data);
      } catch (err) {
        // Demo mode: provide sample data
        const demoEntries = [
          {
            id: '1',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            calories: 2150,
            sleepHours: 7.5,
            steps: 8432,
            heartRate: 72,
            mood: 'Good',
            waterIntake: 6,
            symptoms: ['Fatigue'],
            notes: 'Felt energetic today'
          },
          {
            id: '2',
            date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
            calories: 2300,
            sleepHours: 6.5,
            steps: 9200,
            heartRate: 68,
            mood: 'Excellent',
            waterIntake: 8,
            symptoms: [],
            notes: 'Great day!'
          }
        ];
        setEntries(demoEntries);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      await entriesAPI.delete(id);
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      // Demo mode: just remove it from state
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete entry';
      if (err.message?.includes('ERR_NETWORK') || err.message?.includes('Failed to fetch') || err.code === 'ERR_NETWORK') {
        // Backend not running, demo mode
        setEntries(prev => prev.filter(e => e.id !== id));
      } else {
        setError(errorMessage);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <h1>Entry History</h1>
      <p className="page-subtitle">View and manage your past entries</p>

      <ErrorBanner message={error} onClose={() => setError('')} />

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>No entries yet. Start tracking your health!</p>
        </div>
      ) : (
        <div className="entries-list">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-item">
              <div
                className="entry-header"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                <div className="entry-date">
                  <strong>{new Date(entry.date).toLocaleDateString()}</strong>
                  <span className="entry-mood">{entry.mood}</span>
                </div>
                <div className="entry-quick-stats">
                  🍽️ {entry.calories} kcal | 😴 {entry.sleepHours} hrs | 👟 {entry.steps} steps
                </div>
              </div>

              {expandedId === entry.id && (
                <div className="entry-details">
                  <div className="detail-row">
                    <span>❤️ Heart Rate:</span>
                    <span>{entry.heartRate} bpm</span>
                  </div>
                  <div className="detail-row">
                    <span>💧 Water Intake:</span>
                    <span>{entry.waterIntake} cups</span>
                  </div>
                  {entry.symptoms && entry.symptoms.length > 0 && (
                    <div className="detail-row">
                      <span>🏥 Symptoms:</span>
                      <span>{entry.symptoms.join(', ')}</span>
                    </div>
                  )}
                  {entry.notes && (
                    <div className="detail-row">
                      <span>📝 Notes:</span>
                      <span>{entry.notes}</span>
                    </div>
                  )}

                  <div className="entry-actions">
                    <Button variant="secondary" onClick={() => {}}>
                      ✏️ Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(entry.id)}>
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

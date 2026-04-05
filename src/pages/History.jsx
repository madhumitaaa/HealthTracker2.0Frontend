
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { entriesAPI } from '../api/entries.api';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorBanner from '../components/common/ErrorBanner';
import '../styles/history.css';

export default function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {

        const res = await entriesAPI.getAll();

        // ✅ FIX: backend wraps response
        setEntries(res.data || []);

      } catch (err) {

        setError(err.message || 'Failed to fetch entries');

      } finally {

        setLoading(false);

      }
    };

    fetchEntries();
  }, []);

  const handleDelete = async (_id) => {

    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {

      await entriesAPI.delete(_id);

      setEntries(prev => prev.filter(e => e._id !== _id));

    } catch (err) {

     setError(err.message || 'Failed to delete entry');

    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">

      <h1>Entry History</h1>
      <p className="page-subtitle">View and manage past entries</p>

      <ErrorBanner message={error} onClose={() => setError('')} />

      {entries.length === 0 ? (
        <div className="empty-state">
          No entries yet. Start tracking your health!
        </div>
      ) : (
        <div className="entries-list">

          {entries.map(entry => (

            <div key={entry._id} className="entry-item">

              <div
                className="entry-header"
                onClick={() =>
                  setExpandedId(
                    expandedId === entry._id ? null : entry._id
                  )
                }
              >

                <div className="entry-date">
                  <strong>{new Date(entry.date).toLocaleDateString()}</strong>
                  <span className="entry-mood">{entry.mood}</span>
                </div>

                <div className="entry-quick-stats">
                  🍽️ {entry.calories || 0} kcal | 😴 {entry.sleep || 0} hrs | 👟 {entry.steps || 0} steps
                </div>

              </div>

              {expandedId === entry._id && (

                <div className="entry-details">

                  <div>❤️ Heart Rate: {entry.heartRate || 0} bpm</div>
                  <div>💧 Water Intake: {entry.waterIntake || 0} cups</div>

                  {entry.symptoms?.length > 0 && (
                    <div>🏥 Symptoms: {entry.symptoms.join(', ')}</div>
                  )}

                  {entry.notes && (
                    <div>📝 Notes: {entry.notes}</div>
                  )}

                  <div className="entry-actions">

                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/add-entry/${entry._id}`)}
                    >
                      ✏️ Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(entry._id)}
                    >
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

